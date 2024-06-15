
import React, { useState, useEffect } from "react";
import axios from "axios";

import API_URL from "../../config/config";
import Cookies from "js-cookie";
import { Dialog } from "@mui/material";
// import { isImage, isSizeExceeded } from "../security/CheckingFile";
import { ReactSortable } from "react-sortablejs";
import AlertDialog from "./AlertDialog";

const EditChapterDialog = ({ open, onClose, selectedChapter }) => {
    const [chapter, setChapter] = useState(selectedChapter)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [imageList, setImageList] = useState([]);
    const [previewImages, setPreviewImages] = useState([])
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        
        setChapter(selectedChapter);
        getChapterDetail(selectedChapter.id)
    }, [selectedChapter]);
    useEffect(()=>{
        setPreviewImages([])
        setSelectedFiles([])
    },[open])

    const getChapterDetail = async (chapterId) => {
        try {
            const response = await axios.get(
                `${API_URL}/chapter_images/${chapterId}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("access_token"),
                    },
                }
            );
            setImageList(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        const fetchInitialFiles = async () => {
            if (imageList.length > 0) {
                const files = await Promise.all(imageList.map(async (image, index) => {
                    const filename = image.link.split('/').pop();
                    return await urlToFile(image.link, filename, 'image/jpeg');
                }));
                setSelectedFiles(files);
                const initialPreviews = files.map(file => URL.createObjectURL(file));
                setPreviewImages(initialPreviews);
            }
        };
        fetchInitialFiles();
    }, [imageList]);


    const handleImageChange = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
            setSelectedFiles((prevFiles) => prevFiles.concat(files));
            setPreviewImages((prevImages) => prevImages.concat(fileArray))
            Array.from(files).map(file => URL.revokeObjectURL(file));
        }
    };
    const urlToFile = async (url, filename, mimeType) => {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        return new File([buffer], filename, { type: mimeType });
    };
    const handleOrderChange = (newList) => {
        const newFiles = newList.map(item => selectedFiles[item.id])
        setSelectedFiles(newFiles)
        setPreviewImages(newList.map(i => i.url))
    }
    const handleRemoveImage = (index) => {
        const newPreviewImages = previewImages.filter((_, i) => i !== index);
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        setPreviewImages(newPreviewImages);
        setSelectedFiles(newSelectedFiles);
    };
    const handleEditChapter = () => {
        if (chapter.ordinalNumber === "" || chapter.name === "") {
            window.alert("Vui lòng nhập đầy đủ các mục");
        } else {
            if (chapter.ordinalNumber < 0) {
                window.alert("Số chương không được nhỏ hơn 0");
            } else {
                editChapter();
                changeOrderImage(chapter.id, selectedFiles)

                onClose();
            }
        }
    };
    const editChapter = async () => {
        try {
            const response = await axios.put(
                `${API_URL}/user/chapters`,
                {
                    chapterId: chapter.id,
                    newChapterName: chapter.name,
                    newOrdinalNumber: chapter.ordinalNumber,
                },
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("access_token"),
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            console.log(response.data);

            setAlertMessage("Cập nhật thông tin chương thành công.");
            setAlertDialogOpen(true);
        } catch (error) {
            console.log(error);
            setAlertMessage("Cập nhật thông tin chương thất bại.");
            setAlertDialogOpen(true);
        }
    };
    const changeOrderImage = async (chapterId, newList) => {
        const formData = new FormData();
        formData.append('chapterId', chapterId);
        newList.forEach((file) => {
            formData.append('newList', file);
        });
        console.log(newList)
        try {
            const response = await axios.post(
                `${API_URL}/user/changeOrderNumber`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: "Bearer " + Cookies.get("access_token"),
                    },
                },
            );
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AlertDialog
                open={alertDialogOpen}
                onClose={() => setAlertDialogOpen(false)}
                message={alertMessage}
            />
            <Dialog open={open}>
                <div className="add-dialog">
                    <h3>Chỉnh sửa chương truyện</h3>
                    <h4> Số chương</h4>
                    <input
                        type="number"
                        name="ordinalNumber"
                        placeholder="Số chương"
                        defaultValue={selectedChapter.ordinalNumber}
                        value={chapter.ordinalNumber}
                        min={1}
                        onChange={(e) =>
                            ["e", "E", "+", "-"].includes(e.key)
                                ? e.preventDefault()
                                : setChapter({
                                    ...chapter,
                                    ordinalNumber: e.target.value,
                                })
                        }
                    />
                    <h4 style={{ marginTop: "10px" }}> Tên chương</h4>
                    <input
                        type="text"
                        name="name"
                        placeholder="Tên chương"
                        defaultValue={chapter.name}
                        value={chapter.name}
                        onChange={(e) =>
                            setChapter({ ...chapter, name: e.target.value })
                        }
                    />
                    <div>
                        <a>Thêm ảnh</a>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>

                    {previewImages &&
                        <ReactSortable
                            list={previewImages.map((url, index) => ({ id: index, url }))}
                            setList={(newList) => handleOrderChange(newList)}
                            animation={200}
                        >
                            {previewImages.map((item, index) => (
                                <div>

                                    <button onClick={() => handleRemoveImage(index)}>Bỏ hình</button>
                                    <img key={index} src={item} alt="aaa" />
                                </div>
                            ))}
                        </ReactSortable>
                    }
                    <div>
                        <button onClick={handleEditChapter}>Xác nhận</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export default EditChapterDialog
