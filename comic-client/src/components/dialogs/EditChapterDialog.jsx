
import React, { useState, useEffect } from "react";
import axios from "axios";

import API_URL from "../../config/config";
import { PY_API_URL } from "../../config/config";
import Cookies from "js-cookie";
// import { isImage, isSizeExceeded } from "../security/CheckingFile";
import { ReactSortable } from "react-sortablejs";
import AlertDialog from "./AlertDialog";
import { Dialog, Button } from '@mui/material';
import toast from "react-hot-toast";

const EditChapterDialog = ({ open, onClose, selectedChapter, setChapterList }) => {
    const [chapter, setChapter] = useState(selectedChapter)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [isAccept, setIsAccept] = useState(true)
    const [imageList, setImageList] = useState([]);
    const [previewImages, setPreviewImages] = useState([])
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {

        setChapter(selectedChapter);
        getChapterDetail(selectedChapter.id)
    }, [selectedChapter]);
    useEffect(() => {
        setPreviewImages([])
        setSelectedFiles([])
        setIsAccept(true)
    }, [open])

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
    const handleCheckingImage = async (image) => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            const response = await axios.post(
                `${PY_API_URL}/checking_image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            
            return response.data;
        } catch (error) {
            console.log(error);
            setAlertMessage("Kiểm tra ảnh thất bại, đã có lỗi xảy ra");
            setAlertDialogOpen(true);
        }
    };
    const handleAzureCheckingImage = async (image) => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            const response = await axios.post(
                `${PY_API_URL}/azure_checking_image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            setAlertMessage("Kiểm tra ảnh thất bại, đã có lỗi xảy ra");
            setAlertDialogOpen(true);
        }
    };
    const handleRemoveImage = (index) => {
        const newPreviewImages = previewImages.filter((_, i) => i !== index);
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        setPreviewImages(newPreviewImages);
        setSelectedFiles(newSelectedFiles);
    };
    const handleEditChapter = async () => {
        if (chapter.ordinalNumber === "" || chapter.name === "") {
            toast("Vui lòng nhập đầy đủ các mục!", {
                icon: '🛈',
                position: "top-right",
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            })
        } else {
            if (chapter.ordinalNumber < 0) {
                toast.error("Số chương không được nhỏ hơn 0", { position: "top-right" });
            } else {
                const toastId=toast.loading("Hệ thống đang kiểm tra ảnh!")
                const results = [];
                for (const file of selectedFiles) {
                    const result = await handleCheckingImage(file);
                    if (!result.SFW) {
                        results.push(result);
                    }
                }
                if (results.length === 0) {
                    const azure_results = [];
                    for (const file of selectedFiles) {
                        const azure_result = await handleAzureCheckingImage(file);
                        if (!azure_result.SFW) {
                            azure_results.push(azure_result);
                        }
                    }
                    if (azure_results.length === 0) {
                        editChapter();
                        changeOrderImage(chapter.id, selectedFiles, true)
                        toast.success("Cập nhật chương thành công",{id:toastId})
                        onClose();
                    }
                    else {
                        let listFile = "";
                        azure_results.forEach((azure_result) => {
                            listFile = listFile + azure_result.filename + ", ";
                        });

                        toast.error(`Nội dung của bạn không được duyệt do chứa các file hình ảnh nhạy cảm sau: ${listFile}, vui lòng chỉnh sửa hoặc gửi yêu cầu duyệt lại đến Admin`,{id:toastId})
                        setIsAccept(false)
                    }
                }
                else {
                    let listFile = "";
                    results.forEach((result) => {
                        listFile = listFile + result.filename + ", ";
                    });

                    toast.error(`Nội dung của bạn không được duyệt do chứa các file hình ảnh nhạy cảm sau: ${listFile}, vui lòng chỉnh sửa hoặc gửi yêu cầu duyệt lại đến Admin`,{id:toastId})
                    setIsAccept(false)
                }
            }
        }
    };
    const handleEditChapterIfHaveSensetive = async () => {
        if (chapter.ordinalNumber === "" || chapter.name === "") {
            toast("Vui lòng nhập đầy đủ các mục!", {
                icon: '🛈',
                position: "top-right",
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            })
        } else {
            if (chapter.ordinalNumber < 0) {
                toast.error("Số chương không được nhỏ hơn 0", { position: "top-right" });
            } else {
                const toastId=toast.loading("Hệ thống đang tiến hành kiểm tra ảnh!")
                const results = [];
                for (const file of selectedFiles) {
                    const result = await handleCheckingImage(file);
                    if (!result.SFW) {
                        results.push(result);
                    }
                }
                if (results.length === 0) {
                    const azure_results = [];
                    for (const file of selectedFiles) {
                        const azure_result = await handleAzureCheckingImage(file);
                        if (!azure_result.SFW) {
                            azure_results.push(azure_result);
                        }
                    }
                    if (azure_results.length === 0) {
                        editChapter();
                        changeOrderImage(chapter.id, selectedFiles, true)
                        toast.success("Cập nhật chương thành công",{id:toastId})
                        onClose();
                    }
                    else {
                        editChapter()
                        changeOrderImage(chapter.id, selectedFiles, false)
                        setIsAccept(true)
                        toast.success("Đã gửi yêu cầu duyệt lại",{id:toastId})
                        onClose();
                    }
                }
                else {
                    editChapter()
                    changeOrderImage(chapter.id, selectedFiles, false)
                    setIsAccept(true)
                    toast.success("Đã gửi yêu cầu duyệt lại",{id:toastId})
                    onClose();
                }
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
            return response.data.data;
        } catch (error) {
            console.log(error);
            setAlertMessage("Cập nhật thông tin chương thất bại.");
            setAlertDialogOpen(true);
        }
    };
    const changeOrderImage = async (chapterId, newList, isAccept) => {
        const formData = new FormData();
        formData.append('chapterId', chapterId);
        formData.append('isAccept', isAccept);
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
            if (response.data.status) {
                setChapterList(response.data.data, true)
            }
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
                    <h4> Số thứ tự của chương trong truyện</h4>
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
                        <h6>Thêm ảnh</h6>
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

                                    <Button variant="contained" color="warning" onClick={() => handleRemoveImage(index)}>Bỏ hình</Button>
                                    <img key={index} src={item} alt="aaa" />
                                </div>
                            ))}
                        </ReactSortable>
                    }
                    <div>
                        {isAccept && <Button  variant="contained" color="success"onClick={handleEditChapter}>Xác nhận</Button>}
                        {!isAccept && <Button variant="contained" color="success" onClick={handleEditChapterIfHaveSensetive}>Yêu cầu duyệt lại</Button>}

                        <Button variant="contained" color="error" onClick={onClose}>Hủy</Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export default EditChapterDialog
