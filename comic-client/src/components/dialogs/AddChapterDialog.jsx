
import React, { useState, useEffect } from "react";
import axios from "axios";

import API_URL from "../../config/config";
import Cookies from "js-cookie";
import { Dialog } from "@mui/material";
import { isImage, isSizeExceeded } from "../../security/CheckingFile";
import { ReactSortable } from "react-sortablejs";
import AlertDialog from "./AlertDialog";

const AddChapterDialog = ({ open, onClose, comicId }) => {
    const [newChapterName, setNewChapterName] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        setNewChapterName("");
        setSelectedFiles([]);
        setPreviewImages([]);
    }, [open]);
    const handleImageChange = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
            setSelectedFiles((prevFiles) => prevFiles.concat(files));
            setPreviewImages((prevImages) => prevImages.concat(fileArray))
            Array.from(files).map(file => URL.revokeObjectURL(file));
        }
    };
    const handleRemoveImage = (index) => {
        const newRenderImages = previewImages.filter((_, i) => i !== index);
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        setPreviewImages(newRenderImages)
        setSelectedFiles(newSelectedFiles);
    };
    const addChapter = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/user/chapters`,
                {
                    chapterName: newChapterName,
                    comicId: comicId,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Bearer " + Cookies.get("access_token"),
                    },
                }
            );
            // console.log(response.data);
            setAlertMessage("Tạo chương thành công, đang upload ảnh.");
            setAlertDialogOpen(true);
            return response.data.data.id;
        } catch (error) {
            // console.log(error);
            setAlertMessage("Tạo chương thất bại.");
            setAlertDialogOpen(true);
            return -1;
        }
    };
    const uploadChapterImg = async (formData) => {
        try {
            const response = await axios.post(
                `${API_URL}/user/chapterimg-upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + Cookies.get("access_token"),
                    },
                }
            );
            console.log(response.data);
        } catch (error) { }
    };
    const handleAddChapter = async () => {
        if (newChapterName !== "" && selectedFiles.length > 0) {
            var checkfile = 1;
            for (let i = 0; i < selectedFiles.length; i++) {
                if (
                    isImage(selectedFiles[i]) === 0 ||
                    isSizeExceeded(selectedFiles[i]) === 1
                ) {
                    checkfile = 0;
                    break;
                }
            }
            if (checkfile === 1) {
                const newChapterId = await addChapter();
                // Khai báo một hàm bọc để chờ đợi việc uploadChapterImg hoàn thành
                const uploadFilesSequentially = async () => {
                    for (let index = 0; index < selectedFiles.length; index++) {
                        const formData = new FormData();
                        formData.append("chapterId", newChapterId);
                        formData.append("file", selectedFiles[index]);

                        // Gọi uploadChapterImg trong Promise để chờ đợi kết quả
                        await new Promise((resolve, reject) => {
                            uploadChapterImg(formData)
                                .then(() => {
                                    resolve(); // Đánh dấu Promise thành công
                                })
                                .catch((error) => {
                                    reject(error); // Đánh dấu Promise thất bại và truyền lỗi (nếu có)
                                });
                        });
                    }
                };

                // Gọi hàm uploadFilesSequentially để bắt đầu quá trình upload
                if (newChapterId !== -1) {
                    uploadFilesSequentially()
                        .then(() => {
                            // Khi tất cả các file đã được upload thành công
                            setAlertMessage("Upload ảnh thành công.");
                            setAlertDialogOpen(true);
                            // Thực hiện vòng lặp kế tiếp hoặc các công việc tiếp theo ở đây
                        })
                        .catch((error) => {
                            // Xử lý lỗi nếu có
                            setAlertMessage(
                                "Upload ảnh thất bại. Đảm bảo rằng tất cả các ảnh được chọn có dung lượng dưới 1Mb."
                            );
                            setAlertDialogOpen(true);
                            console.error("Đã xảy ra lỗi trong quá trình upload:", error);
                        });
                }
                onClose()
            } else {
                window.alert("Có file không phải ảnh hoặc vượt quá 1Mb");
            }
        } else {
            window.alert("Vui lòng nhập đầy đủ các mục");
        }
        // window.location.reload();
    };
    const handleOrderChange = (newList) => {
        const newFiles = newList.map(item => selectedFiles[item.id])
        setSelectedFiles(newFiles)
        setPreviewImages(newList.map(i => i.url))
    }
    return (
        <>
            <AlertDialog
                open={alertDialogOpen}
                onClose={() => setAlertDialogOpen(false)}
                message={alertMessage}
            />
            <Dialog open={open}>
                <div className="add-dialog">
                    <h3>Thêm chương mới</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Tên chương"
                        value={newChapterName}
                        onChange={(e) => setNewChapterName(e.target.value)}
                    />
                    <div>
                        <a>Chọn ảnh cho chương truyện</a>
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
                        <button onClick={handleAddChapter}>Thêm</button>
                        <button onClick={onClose}>Hủy</button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export default AddChapterDialog
