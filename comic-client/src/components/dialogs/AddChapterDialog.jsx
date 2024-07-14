import React, { useState, useEffect } from "react";
import axios from "axios";

import API_URL from "../../config/config";
import { PY_API_URL } from "../../config/config";
import Cookies from "js-cookie";
import { isImage, isSizeExceeded } from "../../security/CheckingFile";
import { ReactSortable } from "react-sortablejs";
import AlertDialog from "./AlertDialog";
import ConfirmDialog from "./ConfirmDialog";
import toast from "react-hot-toast";
import { Dialog, TextField, Button } from '@mui/material';


const AddChapterDialog = ({ open, onClose, comicId, setChapterList }) => {
    const [newChapterName, setNewChapterName] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isAccept, setIsAccept] = useState(true)
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmTitle, setConfirmTitle] = useState("Xác nhận");
    const [confirmButton, setConfirmButton] = useState("Xác nhận");

    useEffect(() => {
        setNewChapterName("");
        setSelectedFiles([]);
        setPreviewImages([]);
        setIsAccept(true);
    }, [open]);
    const handleImageChange = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const fileArray = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setSelectedFiles((prevFiles) => prevFiles.concat(files));
            setPreviewImages((prevImages) => prevImages.concat(fileArray));
            Array.from(files).map((file) => URL.revokeObjectURL(file));
        }
    };
    const handleRemoveImage = (index) => {
        const newRenderImages = previewImages.filter((_, i) => i !== index);
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        setPreviewImages(newRenderImages);
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
            setChapterList(response.data.data, false)
            return response.data.data.id;
        } catch (error) {
            // console.log(error);
            setAlertMessage("Tạo chương thất bại.");
            setAlertDialogOpen(true);
            return -1;
        }
    };
    const addChapterNotAccept = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/user/addChapterNotAccept`,
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
           
            setChapterList(response.data.data, false)
            return response.data.data.id;
        } catch (error) {
            // console.log(error);
            toast.error("Đã có lỗi xảy ra")
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
            console.log(response.data);
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
                                    toast.success("Upload ảnh thành công!",{id:toastId});
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
                        onClose();
                    }
                    else {
                        setIsAccept(false)
                        var listFile = "";
                        azure_results.forEach((azure_result) => {
                            listFile = listFile + azure_result.filename + ", ";
                        });

                        toast.error(`Nội dung của bạn không được duyệt do chứa các file hình ảnh nhạy cảm sau: ${listFile}, vui lòng thực hiện chỉnh sửa hoặc yêu cầu admin duyệt lại!`,{id:toastId})
                    }
                } else {
                    setIsAccept(false)
                    var listFile = "";
                    results.forEach((result) => {
                        listFile = listFile + result.filename + ", ";
                    });

                    toast.error(`Nội dung của bạn không được duyệt do chứa các file hình ảnh nhạy cảm sau: ${listFile}, vui lòng thực hiện chỉnh sửa hoặc yêu cầu admin duyệt lại!`,{id:toastId})
                }

            } else {
                toast.error("Có file không phải ảnh hoặc vượt quá 1Mb", {
                    position: "top-right",
                });
            }
        } else {
            toast("Vui lòng nhập đầy đủ các mục!", {
                icon: "🛈",
                position: "top-right",
                style: {
                    border: "1px solid #713200",
                    padding: "16px",
                    color: "#713200",
                },
            });
        }
    };
    const handleAddChapterNotAccept = async () => {
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
                const toastId=toast.loading("Hệ thống đang thực hiện kiểm tra ảnh!")
                const results = [];
                for (const file of selectedFiles) {
                    const result = await handleCheckingImage(file);
                    if (!result.SFW) {
                        results.push(result);
                        console.log(results);
                    }
                }
                const azure_results = [];
                for (const file of selectedFiles) {
                    const azure_result = await handleAzureCheckingImage(file);
                    if (!azure_result.SFW) {
                        azure_results.push(azure_result);
                    }
                }
                let newChapterId = "";
                if (results.length === 0 && azure_results.length == 0) {
                    newChapterId = await addChapter();
                    toast.success("Thêm chương mới thành công",{id:toastId})
                }
                else {
                    newChapterId = await addChapterNotAccept();
                    toast.success("Đã gửi yêu cầu duyệt cho admin",{id:toastId});
                }
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

                        })
                        .catch((error) => {
                            // Xử lý lỗi nếu có

                            console.error("Đã xảy ra lỗi trong quá trình upload:", error);
                        });
                }
                onClose();


            } else {
                toast.error("Có file không phải ảnh hoặc vượt quá 1Mb", {
                    position: "top-right",
                });
            }
        } else {
            toast("Vui lòng nhập đầy đủ các mục!", {
                icon: "🛈",
                position: "top-right",
                style: {
                    border: "1px solid #713200",
                    padding: "16px",
                    color: "#713200",
                },
            });
        }
    };
    const handleOrderChange = (newList) => {
        const newFiles = newList.map((item) => selectedFiles[item.id]);
        setSelectedFiles(newFiles);
        setPreviewImages(newList.map((i) => i.url));
    };
    return (
        <>
            <AlertDialog
                open={alertDialogOpen}
                onClose={() => setAlertDialogOpen(false)}
                message={alertMessage}
            />
            <ConfirmDialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onAccept={() => handleAddChapterNotAccept()}
                message={confirmMessage}
                title={confirmTitle}
                buttonText={confirmButton}
            />
            <Dialog open={open}>
                <div className="add-dialog">
                    <h3>Thêm chương mới</h3>
                    <TextField
                        label="Tên chương"
                        value={newChapterName}
                        onChange={(e) => setNewChapterName(e.target.value)}
                        fullWidth
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
                    {previewImages && (
                        <ReactSortable
                            list={previewImages.map((url, index) => ({ id: index, url }))}
                            setList={(newList) => handleOrderChange(newList)}
                            animation={200}
                        >
                            {previewImages.map((item, index) => (
                                <div>
                                    <Button variant="contained" color="warning" sx={{textTransform:"initial"}} onClick={() => handleRemoveImage(index)}>
                                        Bỏ hình
                                    </Button>
                                    <img key={index} src={item} alt="aaa" />
                                </div>
                            ))}
                        </ReactSortable>
                    )}

                    <div>
                        {isAccept && <Button variant="contained" color="success" onClick={handleAddChapter}>Thêm</Button>}
                        {!isAccept && <Button variant="contained" color="success" onClick={handleAddChapterNotAccept}>Yêu cầu duyệt lại</Button>}

                        <Button variant="contained" color="error" onClick={onClose}>Hủy</Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};
export default AddChapterDialog;
