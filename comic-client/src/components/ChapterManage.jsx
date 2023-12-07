import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import AppContext from "../context/AppContext";

const ChapterManage = () => {
  const { comicId } = useParams();
  const [chaptersList, setChapterList] = useState([]);

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
      //   console.log(response.data);
      return response.data.data.id;
    } catch (error) {
      console.log(error);
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
    // console.log(newChapterName);
    // console.log(selectedFiles);
    const newChapterId = await addChapter();
    console.log("Chapter id", newChapterId);
    for (let index = 0; index < selectedFiles.length; index++) {
      const formData = new FormData();
      formData.append("chapterId", newChapterId);
      formData.append("file", selectedFiles[index]);
      //   console.log(formData);
      uploadChapterImg(formData);
    }
    setShowAddDialog(false);
    // window.location.reload();
  };

  const handleCancelAdd = () => {
    setShowAddDialog(false);
  };

  //
  //Xóa chương
  //

  const deleteChapter = async (chapterId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/user/chapters`,
        {
            headers: {
                "Authorization": "Bearer " + Cookies.get("access_token"),
                "Content-Type": "application/x-www-form-urlencoded"
    
              }, data: { chapterId: chapterId },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (chapterId) => {
    const shouldDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa chương này?"
    );

    if (shouldDelete) {
      console.log(chapterId);
      deleteChapter(chapterId);
      //   window.location.reload();
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

      {showAddDialog && (
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
      )}

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
                  className="delete"
                  onClick={() => handleDeleteClick(chapter.id)}
                >
                  Xóa
                </button>
              </td>
              <td></td>
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
