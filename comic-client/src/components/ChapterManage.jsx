import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import AlertDialog from "./dialogs/AlertDialog";

import EditChapterDialog from "./dialogs/EditChapterDialog";
import AddChapterDialog from "./dialogs/AddChapterDialog";
import { Button,  Pagination } from '@mui/material';
import toast from "react-hot-toast";

const ChapterManage = () => {
  const { comicId } = useParams();
  const [chaptersList, setChapterList] = useState([]);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const updateChapterList = (updatedChapter,isEdit) => {
    if(isEdit){
    setChapterList((prevChapters) => 
      prevChapters.map(chapter => chapter.id === updatedChapter.id ? updatedChapter : chapter)
    );
  }
    else{
     setChapterList((prevChapters)=>[...prevChapters,updatedChapter])
    }
  }

  useEffect(() => {
    const getChapters = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/chapters/${comicId}`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        });
        setChapterList(response.data.data)
  
      } catch (error) {
        console.log(error);
      }
    };
    getChapters();
  }, [comicId]);

  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 10;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageNumbers = Math.ceil(chaptersList.length / chaptersPerPage);

  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentchapters = chaptersList.slice(indexOfFirstChapter, indexOfLastChapter);

  //
  //Thêm chương
  //
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddClick = () => {
    setShowAddDialog(true);
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
      await axios.delete(`${API_URL}/user/chapters`, {
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
    // getChapterDetail(id)
    setShowEditDialog(true);
  };
  const handleCancelEdit = () => {
    setShowEditDialog(false)
  }
  const publicChapter = async (chapterId) => {
    try {
      const response = await axios.post(`${API_URL}/user/publicChapter`, {
        chapterId: chapterId
      },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },

        });
      if (response.data.status) {
        setChapterList(prevList => prevList.map(chapter =>
          chapter.id === chapterId ? { ...chapter, open: !chapter.open } : chapter
        ));
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comic-list-container">
       <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
         
        />
       <Button variant="outlined" >Tìm kiếm</Button>
      </div>

      <div className="add-button">
      <Button variant="contained" color="primary" onClick={handleAddClick}>
          Thêm chương mới
        </Button>
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
      <AddChapterDialog open={showAddDialog} onClose={handleCancelAdd} comicId={comicId} setChapterList={updateChapterList}/>

      <EditChapterDialog open={showEditDialog} onClose={handleCancelEdit} selectedChapter={selectedChapter} setChapterList={updateChapterList} />

      <table>
        <thead>
          <tr>
            <th>Số thứ tự</th>
            <th></th>
            <th>Tên chương</th>
            <th></th>
            <th>Trạng thái</th>
            <th></th>
            <th>Công khai</th>
            <th></th>
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
                {chapter.accepted?"Đã được duyệt":"Đang chờ duyệt"}
              </td>
              <td></td>
              {chapter.open ?
                <td><img style={{height:40,width:40}} onClick={() => publicChapter(chapter.id)} src="https://cdn-icons-png.flaticon.com/128/13680/13680221.png" alt="public" /></td> :
                <td><img style={{height:40,width:40}} onClick={() => publicChapter(chapter.id)} src="https://cdn-icons-png.flaticon.com/128/16208/16208276.png" alt="private" /></td>
              }
              <td></td>
              <td>
                <Button variant="contained" color="warning"  onClick={() =>
                    handleEditClick(
                      chapter.id,
                      chapter.chapterName,
                      chapter.ordinalNumber
                    )
                  }>
                    Sửa
                  </Button>
              </td>
              <td>
                <Button variant="contained" color="error" onClick={() =>
                    handleDeleteClick(
                      chapter.id,
                      chapter.chapterName,
                      chapter.ordinalNumber
                    )
                  }>
                    Xóa
                  </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      {/* <div className="pagination">
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
      </div> */}
       <Pagination
        count={pageNumbers}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className="pagination"
      />
    </div>
  );
};

export default ChapterManage;
