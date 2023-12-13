import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import AppContext from "../context/AppContext";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import { Dialog } from "@mui/material";
import AlertDialog from "./dialogs/AlertDialog";
import { isImage, isSizeExceeded } from "../security/CheckingFile";

const ChapterManage = () => {
  const { comicId } = useParams();
  const [chaptersList, setChapterList] = useState([]);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getChapters = async () => {
    try {
      const response = await axios.get(`${API_URL}/chapters/${comicId}`);
      setChapterList(response.data.data);
      //   console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChapters();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 10;

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(chaptersList.length / chaptersPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentchapters = chaptersList.slice(
    indexOfFirstChapter,
    indexOfLastChapter
  );

  //
  //Thêm chương
  //
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newChapterName, setNewChapterName] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleAddClick = () => {
    setShowAddDialog(true);
  };

  const handleImageChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
    }
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
    } catch (error) {}
  };

  const handleAddChapter = async () => {
    if (newChapterName !== "" && selectedFiles.length > 0) {
      // console.log(newChapterName);
      // console.log(selectedFiles);
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

        // console.log("new chapter id:", newChapterId);
        // console.log("Chapter id", newChapterId);
        const sortedFiles = selectedFiles.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }

          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        console.log(sortedFiles);
        // Khai báo một hàm bọc để chờ đợi việc uploadChapterImg hoàn thành
        const uploadFilesSequentially = async () => {
          for (let index = 0; index < sortedFiles.length; index++) {
            const formData = new FormData();
            formData.append("chapterId", newChapterId);
            formData.append("file", sortedFiles[index]);

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
        setShowAddDialog(false);
      } else {
        window.alert("Có file không phải ảnh hoặc vượt quá 1Mb");
      }
    } else {
      window.alert("Vui lòng nhập đầy đủ các mục");
    }
    // window.location.reload();
  };

  const handleCancelAdd = () => {
    setShowAddDialog(false);
  };

  //
  //Xóa chương
  //
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState({
    id: "",
    name: "",
    ordinalNumber: "",
  });

  const deleteChapter = async (chapterId) => {
    try {
      const response = await axios.delete(`${API_URL}/user/chapters`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: { chapterId: chapterId },
      });
      // console.log(response.data);
      setAlertMessage("Xóa chương thành công.");
      setAlertDialogOpen(true);
    } catch (error) {
      console.log(error);
      setAlertMessage("Xóa chương thất bại.");
      setAlertDialogOpen(true);
    }
  };

  const handleDeleteClick = (chapterId, chapterName, ordinalNumber) => {
    // const shouldDelete = window.confirm(
    //   "Bạn có chắc chắn muốn xóa chương này?"
    // );

    // if (shouldDelete) {
    //   console.log(chapterId);
    //   deleteChapter(chapterId);
    //   //   window.location.reload();
    // }

    setChapterToDelete({
      id: chapterId,
      name: chapterName,
      ordinalNumber: ordinalNumber,
    });
    setConfirmDeleteDialogOpen(true);
  };

  //
  //
  // Sửa chương

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState({
    id: null,
    name: "",
    ordinalNumber: "",
  });

  const handleEditClick = (id, name, ordinalNumber) => {
    setSelectedChapter({
      id: id,
      name: name,
      ordinalNumber: ordinalNumber,
    });
    setShowEditDialog(true);
  };

  const editChapter = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/user/chapters`,
        {
          chapterId: selectedChapter.id,
          newChapterName: selectedChapter.name,
          newOrdinalNumber: selectedChapter.ordinalNumber,
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log(response.data);
      setAlertMessage("Cập nhật thông tin chương thành công.");
      setAlertDialogOpen(true);
    } catch (error) {
      // console.log(error);
      setAlertMessage("Cập nhật thông tin chương thất bại.");
      setAlertDialogOpen(true);
    }
  };

  const handleEditChapter = () => {
    if (selectedChapter.ordinalNumber === "" || selectedChapter.name === "") {
      window.alert("Vui lòng nhập đầy đủ các mục");
    } else {
      if (selectedChapter.ordinalNumber < 0) {
        window.alert("Số chương không được nhỏ hơn 0");
      } else{
        editChapter();
        setShowEditDialog(false);
      }
    }
  };

  return (
    <div className="comic-list-container">
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
        <button>Tìm kiếm</button>
      </div>

      <div className="add-button">
        <button className="add" onClick={handleAddClick}>
          Thêm chương mới
        </button>
      </div>

      <ConfirmDialog
        open={confirmDeleteDialogOpen}
        onClose={() => setConfirmDeleteDialogOpen(false)}
        onAccept={() => deleteChapter(chapterToDelete.id)}
        message={
          "Bạn thật sự muốn xóa chương " +
          String(chapterToDelete.ordinalNumber) +
          ": " +
          chapterToDelete.name
        }
        title="Xóa chương"
      />
      <AlertDialog
        open={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        message={alertMessage}
      />

      <Dialog open={showAddDialog}>
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
            <a>Chọn ảnh đại điện cho truyện</a>
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          <div>
            <button onClick={handleAddChapter}>Thêm</button>
            <button onClick={handleCancelAdd}>Hủy</button>
          </div>
        </div>
      </Dialog>

      <Dialog open={showEditDialog}>
        <div className="add-dialog">
          <h3>Chỉnh sửa truyện</h3>
          <h4> Số chương</h4>
          <input
            type="number"
            name="ordinalNumber"
            placeholder="Số chương"
            defaultValue={selectedChapter.ordinalNumber}
            value={selectedChapter.ordinalNumber}
            min={1}
            onChange={(e) =>
              setSelectedChapter({
                ...selectedChapter,
                ordinalNumber: e.target.value,
              })
            }
          />
          <h4 style={{ marginTop: "10px" }}> Tên chương</h4>
          <input
            type="text"
            name="name"
            placeholder="Tên truyện"
            defaultValue={selectedChapter.name}
            value={selectedChapter.name}
            onChange={(e) =>
              setSelectedChapter({ ...selectedChapter, name: e.target.value })
            }
          />
          <div>
            <button onClick={handleEditChapter}>Xác nhận</button>
            <button onClick={() => setShowEditDialog(false)}>Hủy</button>
          </div>
        </div>
      </Dialog>

      <table>
        <thead>
          <tr>
            <th>Số thứ tự</th>
            <th></th>
            <th>Tên chương</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {currentchapters.map((chapter, index) => (
          <tbody>
            <tr className="table-row" key={index}>
              <td>{chapter.ordinalNumber}</td>
              <td></td>
              <td>
                <Link to={`/chapter/${chapter.id}`}>{chapter.chapterName}</Link>
              </td>
              <td></td>
              <td>
                <button
                  className="edit"
                  onClick={() =>
                    handleEditClick(
                      chapter.id,
                      chapter.chapterName,
                      chapter.ordinalNumber
                    )
                  }
                >
                  Sửa
                </button>
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() =>
                    handleDeleteClick(
                      chapter.id,
                      chapter.chapterName,
                      chapter.ordinalNumber
                    )
                  }
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            id={number}
            onClick={handleClick}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChapterManage;
