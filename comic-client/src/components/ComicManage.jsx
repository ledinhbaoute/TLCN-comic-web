import React, { useState, useEffect, useContext, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../config/config";
import { PY_API_URL } from "../config/config";
import Cookies from "js-cookie";
import AppContext from "../context/AppContext";
import { Dialog } from "@mui/material";
import AlertDialog from "./dialogs/AlertDialog";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import toast from "react-hot-toast";

const ComicManage = () => {
  const genresList = useContext(AppContext);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [comics, setComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
        setSearchResult(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComics();
  }, []);

  const handleSearchClick = () => {
    setSearchResult(
      comics.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const comicsPerPage = 10;

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResult.length / comicsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentcomics = searchResult.slice(indexOfFirstComic, indexOfLastComic);
  ///nhận diện ảnh nhạy cảm
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
  //
  //Xử lý xóa comic
  //
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [comicIdtoDelete, setComicIdtoDelete] = useState("");
  const [comicNametoDelete, setComicNametoDelete] = useState("");

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
      setAlertMessage("Xóa truyện thành công");
      setAlertDialogOpen(true);
    } catch (error) {
      console.log(error);
      setAlertMessage("Xóa truyện thất bại, đã có lỗi xảy ra");
      setAlertDialogOpen(true);
    }
  };

  const handleDeleteClick = (comicId, comicName) => {
    // const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa comic này?");
    // if (shouldDelete) {
    //   console.log(comicId);
    //   deleteComic(comicId);
    //   //   window.location.reload();
    // }
    setComicIdtoDelete(comicId);
    setComicNametoDelete(comicName);
    setConfirmDeleteDialogOpen(true);
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
      setAlertMessage("Thêm truyện mới thành công");
      setAlertDialogOpen(true);
      //   console.log(response.data);
    } catch (error) {
      setAlertMessage(
        "Thêm truyện mới thất bại. Đảm bảo bạn đã điền đủ các mục và file ảnh không vượt quá 1Mb"
      );
      setAlertDialogOpen(true);
    }
  };

  const handleAddClick = () => {
    setShowAddDialog(true);
  };

  const handleAddComic = async () => {
    if (
      newComic.name === "" ||
      newComic.description === "" ||
      newComic.genres.length === 0 ||
      newComicImage === null
    ) {
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
      const result = await handleCheckingImage(newComicImage)
      const azure_result = await handleAzureCheckingImage(newComicImage)
      if (!result.SFW || !azure_result.SFW) {
        toast.error("Ảnh được phát hiện là nhạy cảm")
      }
      else {
        const formData = new FormData();
        formData.append("comicName", newComic.name);
        formData.append("genreIds", newComic.genres);
        formData.append("discription", newComic.description);
        formData.append("image", newComicImage);
        addComic(formData);
        setShowAddDialog(false);
      }
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

  const [selectedComic, setSelectedComic] = useState({
    genres: [],
  });
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

  const handleSelectedComicGenreChange = (genre, name) => {
    const updatedGenres = selectedComic.genres.some((item) => item.id === genre)
      ? selectedComic.genres.filter((g) => g.id !== genre)
      : [...selectedComic.genres, { id: genre, name: name }];

    setSelectedComic((prevComic) => ({
      ...prevComic,
      genres: updatedGenres,
    }));
    // console.log(selectedComic);
    // const updateGenreIds = selectedComic.genres.map(genre => genre.id);
    // console.log(updateGenreIds);
  };

  const updateComic = async () => {
    try {
      const updateGenreIds = selectedComic.genres.map((genre) => genre.id);
      const response = await axios.put(
        `${API_URL}/user/comicbooks`,
        {
          comicId: selectedComic.id,
          newName: selectedComic.name,
          newDescription: selectedComic.discription,
          newStatus: selectedComic.status,
          genreIds: updateGenreIds.join(","),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      //   console.log(response.data);
      setSelectedComic(response.data.data)
      setAlertMessage(
        (preMessage) => `${preMessage} Cập nhật thông tin truyện thành công.`
      );
    } catch (error) {
      console.log(error);
      setAlertMessage(
        (preMessage) => `${preMessage} Cập nhật thông tin truyện thất bại.`
      );
      // setAlertDialogOpen(true);
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
      setAlertMessage(" Cập nhật hình ảnh thành công.");
    } catch (error) {
      console.log(error);
      setAlertMessage(
        " Cập nhật hình ảnh thất bại (đảm bảo ảnh được upload dưới 1mb)."
      );
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

  const handleEditComic = async () => {
    if (
      selectedComic.name === "" ||
      selectedComic.discription === "" ||
      selectedComic.genres.length === 0
    ) {
      toast("Vui lòng nhập đầy đủ thông tin!", {
        icon: '🛈',
        position: "top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
      })
    } else {
      if (!(selectedComicImg === null)) {
        const result = await handleCheckingImage(selectedComicImg)
        const azure_result = await handleAzureCheckingImage(selectedComicImg)
        if (!result.SFW || !azure_result.SFW) {
          toast.error("Không thể cập nhật ảnh vì phát hiện ảnh nhạy cảm!")
        }
        else {
          const formData = new FormData();
          formData.append("comicId", selectedComic.id);
          formData.append("file", selectedComicImg);
          await updateCoverImg(formData);
        }
      }
      await updateComic();
      setAlertDialogOpen(true);
      setShowEditDialog(false);
    }
  };

  //
  //
  //Nâng truyện lên premium
  const [openConfirmUpgrade, setOpenConfirmUpgrade] = useState(false);
  const [comicIdtoUpgrade, setComicIdtoUpgrade] = useState("");
  const handleUpgradeClick = (comicId) => {
    setComicIdtoUpgrade(comicId);
    setOpenConfirmUpgrade(true);
  };

  const upgradePremium = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/user/comic/upgrade_premium`,
        { comicId: comicIdtoUpgrade },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      setAlertMessage(response.data.message);
      setAlertDialogOpen(true);
    } catch (error) {
      setAlertMessage("Nâng cấp thất bại. Có lỗi xảy ra");
      setAlertDialogOpen(true);
      console.log(error);
    }
  };

  return (
    <div className="comic-list-container">

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button onClick={handleSearchClick}>Tìm kiếm</button>
      </div>

      <div className="add-button">
        <button className="add" onClick={handleAddClick}>
          Thêm truyện mới
        </button>
      </div>

      <ConfirmDialog
        open={confirmDeleteDialogOpen}
        onClose={() => setConfirmDeleteDialogOpen(false)}
        onAccept={() => deleteComic(comicIdtoDelete)}
        message={"Bạn thật sự muốn xóa truyện " + comicNametoDelete}
        title="Xóa truyện"
      />

      <ConfirmDialog
        open={openConfirmUpgrade}
        onClose={() => setOpenConfirmUpgrade(false)}
        onAccept={upgradePremium}
        message={
          "Bạn thật sự muốn nâng cấp truyện này lên premium (Chỉ người dùng premium được tương tác). Sau khi xác nhận sẽ không thể hoàn tác."
        }
      ></ConfirmDialog>
      <AlertDialog
        open={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        message={alertMessage}
      />

      <Dialog open={showAddDialog}>
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
      </Dialog>

      <Dialog open={showEditDialog}>
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
            <h4>Thể loại</h4>
            {genresList.map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  checked={selectedComic.genres.some(
                    (item) => item.id === genre.id
                  )}
                  onChange={() =>
                    handleSelectedComicGenreChange(genre.id, genre.name)
                  }
                />
                {genre.name}
              </label>
            ))}
          </div>

          <div>
            <button onClick={handleEditComic}>Xác nhận</button>
            <button onClick={handleCancelEdit}>Hủy</button>
          </div>
        </div>
      </Dialog>

      <table>
        <thead>
          <tr>
            <th>Tên truyện</th>
            <th>Hình ảnh</th>
            <th>Trạng thái</th>
            <th>Premium</th>
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
                {comic.premium ? (
                  "Đã nâng cấp"
                ) : (
                  <button
                    className="edit"
                    onClick={() => handleUpgradeClick(comic.id)}
                  >
                    Nâng cấp
                  </button>
                )}
              </td>
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
                  onClick={() => handleDeleteClick(comic.id, comic.name)}
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
