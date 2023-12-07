import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import AppContext from "../context/AppContext";

const ComicManage = () => {
  const genresList = useContext(AppContext);
  const [comics, setComics] = useState([]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newComic, setNewComic] = useState({
    name: "",
    description: "",
    genres: [],
  });
  const [newComicImage, setNewComicImage] = useState(null);

  const comicStatus = (value) => {
    switch (value) {
      case 1:
        return "Đang tiến hành";
      case 2:
        return "Hoàn thành";
      default:
        return "Tạm ngưng";
    }
  };

  const userId = window.sessionStorage.getItem("userid");
  useEffect(() => {
    const getComics = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/comicbooks/filter/actor/${userId}`
        );
        setComics(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComics();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const comicsPerPage = 10;

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comics.length / comicsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentcomics = comics.slice(indexOfFirstComic, indexOfLastComic);

  //
  //Xử lý xóa comic
  //
  const deleteComic = async (comicId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/user/comicbooks`,

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
          data: { comicId: comicId },
        }
      );
    //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = (comicId) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa comic này?");

    if (shouldDelete) {
      console.log(comicId);
      deleteComic(comicId);
      //   window.location.reload();
    }
  };

  //
  //Xử lý thêm comic
  //

  const addComic = async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/comicbooks`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      //   console.log(response.data);
    } catch (error) {}
  };

  const handleAddClick = () => {
    setShowAddDialog(true);
  };

  const handleAddComic = () => {
    // Xử lý logic thêm truyện mới ở đây
    // console.log(newComic);
    // console.log(newComicImage);
    if (
      newComic.name === "" ||
      newComic.description === "" ||
      newComic.genres.length === 0 ||
      newComicImage === null
    ) {
      window.alert("Vui lòng nhập đầy đủ các mục");
    } else {
      const formData = new FormData();
      formData.append("comicName", newComic.name);
      formData.append("genreIds", newComic.genres);
      formData.append("discription", newComic.description);
      formData.append("image", newComicImage);
      addComic(formData);
      setShowAddDialog(false);
      // window.location.reload();
    }
  };

  const handleGenreChange = (genre) => {
    const updatedGenres = newComic.genres.includes(genre)
      ? newComic.genres.filter((g) => g !== genre)
      : [...newComic.genres, genre];

    setNewComic((prevComic) => ({
      ...prevComic,
      genres: updatedGenres,
    }));
  };

  const handleImageChange = (file) => {
    if (file) {
      // Thực hiện xử lý hình ảnh ở đây, ví dụ: tải lên máy chủ, lưu trữ URL hình ảnh, v.v.
      setNewComicImage(file);
      //   console.log("Hình ảnh đã được chọn:", file);
    }
  };

  const handleCancelAdd = () => {
    setShowAddDialog(false);
  };

  //
  //Xử lý sửa comic
  //

  const [selectedComic, setSelectedComic] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedComicImg, setSelectedComicImg] = useState(null);

  const getComicDetail = async (comicId) => {
    try {
      const response = await axios.get(`${API_URL}/comicbooks/${comicId}`);
      setSelectedComic(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComicImgChange = (file) => {
    if (file) {
      // Thực hiện xử lý hình ảnh ở đây, ví dụ: tải lên máy chủ, lưu trữ URL hình ảnh, v.v.
      setSelectedComicImg(file);
      //   console.log("Hình ảnh đã được chọn:", file);
    }
  };

  const updateComic = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/user/comicbooks`,
        {
          comicId: selectedComic.id,
          newName: selectedComic.name,
          newDescription: selectedComic.discription,
          newStatus: selectedComic.status,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCoverImg = async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/comic/update_coverImg`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (e) => {
    setSelectedComic({
      ...selectedComic,
      status: parseInt(e.target.value, 10),
    });
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false);
  };

  const handleEditClick = (comicId) => {
    getComicDetail(comicId);
    setShowEditDialog(true);
  };

  const handleEditComic = () => {
    if (selectedComic.name === "" || selectedComic.discription === "") {
      window.alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      updateComic();
    }
    if (!(selectedComicImg === null)) {
      const formData = new FormData();
      formData.append("comicId", selectedComic.id);
      formData.append("file", selectedComicImg);
      updateCoverImg(formData);
    }
    window.location.reload();
    setShowEditDialog(false);
  };

  return (
    <div className="comic-list-container">
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
        <button>Tìm kiếm</button>
      </div>

      <div className="add-button">
        <button className="add" onClick={handleAddClick}>
          Thêm truyện mới
        </button>
      </div>

      {showAddDialog && (
        <div className="add-dialog">
          <h3>Thêm truyện mới</h3>
          <input
            type="text"
            name="name"
            placeholder="Tên truyện"
            value={newComic.name}
            onChange={(e) => setNewComic({ ...newComic, name: e.target.value })}
          />
          <input
            type="text"
            name="description"
            placeholder="Mô tả"
            value={newComic.description}
            onChange={(e) =>
              setNewComic({ ...newComic, description: e.target.value })
            }
          />
          <div>
            <a>Chọn ảnh đại điện cho truyện</a>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
          </div>
          <div>
            <h4>Thể loại</h4>
            {genresList.map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  checked={newComic.genres.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                />
                {genre.name}
              </label>
            ))}
          </div>

          <div>
            <button onClick={handleAddComic}>Thêm</button>
            <button onClick={handleCancelAdd}>Hủy</button>
          </div>
        </div>
      )}

      {showEditDialog && (
        <div className="add-dialog">
          <h3>Chỉnh sửa truyện</h3>
          <input
            type="text"
            name="name"
            placeholder="Tên truyện"
            defaultValue={selectedComic.name}
            value={selectedComic.name}
            onChange={(e) =>
              setSelectedComic({ ...selectedComic, name: e.target.value })
            }
          />
          <input
            type="text"
            name="description"
            placeholder="Mô tả"
            defaultValue={selectedComic.discription}
            value={selectedComic.discription}
            onChange={(e) =>
              setSelectedComic({
                ...selectedComic,
                discription: e.target.value,
              })
            }
          />
          <div>
            <a>Chọn ảnh đại điện cho truyện</a>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleUpdateComicImgChange(e.target.files[0])}
            />
          </div>
          <div>
            <h4>Trạng thái</h4>
            <label>
              <input
                type="radio"
                value={1}
                checked={selectedComic.status === 1}
                onChange={handleStatusChange}
              />
              Đang tiến hành
            </label>
            <label>
              <input
                type="radio"
                value={2}
                checked={selectedComic.status === 2}
                onChange={handleStatusChange}
              />
              Đã xong
            </label>
            <label>
              <input
                type="radio"
                value={3}
                checked={selectedComic.status === 3}
                onChange={handleStatusChange}
              />
              Tạm ngưng
            </label>
          </div>

          <div>
            <button onClick={handleEditComic}>Xác nhận</button>
            <button onClick={handleCancelEdit}>Hủy</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Tên truyện</th>
            <th>Hình ảnh</th>
            <th>Trạng thái</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {currentcomics.map((comic, index) => (
          <tbody>
            <tr className="table-row" key={index}>
              <td>
                <Link to={`/comic-detail/${comic.id}`}>{comic.name}</Link>
              </td>
              <td>
                <img
                  src={comic.image}
                  alt="Hình ảnh truyện"
                  width="50"
                  height="50"
                />
              </td>
              <td>{comicStatus(comic.status)}</td>
              <td>
                <button className="edit">
                  <Link to={`/chapter-manage/${comic.id}`}>Quản lý chương</Link>
                </button>
              </td>
              <td>
                <button
                  className="edit"
                  onClick={() => handleEditClick(comic.id)}
                >
                  Sửa
                </button>
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDeleteClick(comic.id)}
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

export default ComicManage;
