import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_URL from "../config/config";
import { PY_API_URL } from "../config/config";
import Cookies from "js-cookie";
import AppContext from "../context/AppContext";
import AlertDialog from "./dialogs/AlertDialog";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import toast from "react-hot-toast";
import { Dialog, TextField, Button, Checkbox, FormControlLabel, Radio, RadioGroup,  Pagination } from '@mui/material';

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
  const [updateState,setUpdateState]=useState(false)
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
  }, [updateState,userId]);

  const handleSearchClick = () => {
    setSearchResult(
      comics.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const comicsPerPage = 10;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const pageNumbers = Math.ceil(searchResult.length / comicsPerPage);

  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = searchResult.slice(indexOfFirstComic, indexOfLastComic);
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
      await axios.delete(
        `${API_URL}/user/comicbooks`,

        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
          data: { comicId: comicId },
        }
      );
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
      await axios.post(
        `${API_URL}/user/comicbooks`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      setUpdateState(!updateState)
      setNewComic({
        name: "",
        description: "",
        genres: [],
      })
      setNewComicImage(null)
      setShowAddDialog(false)
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
      const toastId = toast.loading("Hệ thống đang thực hiện kiểm tra ảnh...");
      const result = await handleCheckingImage(newComicImage)
      const azure_result = await handleAzureCheckingImage(newComicImage)
      if (!result.SFW || !azure_result.SFW) {
        toast.error("Ảnh được phát hiện là nhạy cảm",{id:toastId})
      }
      else {
        const formData = new FormData();
        formData.append("comicName", newComic.name);
        formData.append("genreIds", newComic.genres);
        formData.append("discription", newComic.description);
        formData.append("image", newComicImage);
        addComic(formData);
        toast.success("Thêm truyện mới thành công!",{id:toastId})
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
      setNewComicImage(file);
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
      setSelectedComicImg(file);
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
  };

  const updateComic = async () => {
    try {
      const updateGenreIds = selectedComic.genres.map((genre) => genre.id);
      await axios.put(
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
      setUpdateState(!updateState)
    } catch (error) {
      console.log(error);
      setAlertMessage(
        (preMessage) => `${preMessage} Cập nhật thông tin truyện thất bại.`
      );
      setAlertDialogOpen(true);
    }
  };

  const updateCoverImg = async (formData) => {
    try {
      await axios.post(
        `${API_URL}/user/comic/update_coverImg`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
     
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
    setNewComicImage(null)

  };

  const handleEditClick = async(comicId) => {
    await getComicDetail(comicId);
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
        const toastId=toast.loading("Hệ thống đang thực hiện kiểm tra ảnh!")
        const result = await handleCheckingImage(selectedComicImg)
        const azure_result = await handleAzureCheckingImage(selectedComicImg)
        if (!result.SFW || !azure_result.SFW) {
          toast.error("Không thể cập nhật ảnh vì phát hiện ảnh nhạy cảm!",{id:toastId})
        }
        else {
          const formData = new FormData();
          formData.append("comicId", selectedComic.id);
          formData.append("file", selectedComicImg);
          await updateCoverImg(formData);
          toast.success("Cập nhật ảnh bìa truyện thành công!",{id:toastId})
        }
      }
      await updateComic();
      setSelectedComic({
        genres: [],
      })
      setSelectedComicImg(null)
      setShowEditDialog(false)
      toast.success("Cập nhật thông tin truyện thành công!")
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
       <Button variant="outlined" onClick={handleSearchClick}>Tìm kiếm</Button>
      </div>

      <div className="add-button">
      <Button variant="contained" color="primary" onClick={handleAddClick}>
          Thêm truyện mới
        </Button>
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

<Dialog open={showAddDialog} onClose={handleCancelAdd}>
        <div className="add-dialog">
          <h3>Thêm truyện mới</h3>
          <TextField
            label="Tên truyện"
            value={newComic.name}
            onChange={(e) => setNewComic({ ...newComic, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Mô tả"
            value={newComic.description}
            onChange={(e) => setNewComic({ ...newComic, description: e.target.value })}
            fullWidth
          />
          <div>
            <h6>Chọn ảnh đại điện cho truyện</h6>
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
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    checked={newComic.genres.includes(genre.id)}
                    onChange={() => handleGenreChange(genre.id)}
                  />
                }
                label={genre.name}
              />
            ))}
          </div>
          <div>
            <Button variant="contained" color="success" onClick={handleAddComic}>Thêm</Button>
            <Button onClick={handleCancelAdd}>Hủy</Button>
          </div>
        </div>
      </Dialog>

      <Dialog open={showEditDialog} onClose={handleCancelEdit}>
        <div className="add-dialog">
          <h3>Chỉnh sửa truyện</h3>
          <TextField
            label="Tên truyện"
            value={selectedComic.name}
            onChange={(e) => setSelectedComic({ ...selectedComic, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Mô tả"
            value={selectedComic.discription}
            onChange={(e) => setSelectedComic({ ...selectedComic, discription: e.target.value })}
            fullWidth
          />
          <div>
            <h6>Chọn ảnh đại điện cho truyện</h6>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => handleUpdateComicImgChange(e.target.files[0])}
            />
          </div>
          <div>
            <h4>Trạng thái</h4>
            <RadioGroup value={selectedComic.status} onChange={handleStatusChange}>
              <FormControlLabel value={1} control={<Radio />} label="Đang tiến hành" />
              <FormControlLabel value={2} control={<Radio />} label="Đã xong" />
              <FormControlLabel value={3} control={<Radio />} label="Tạm ngưng" />
            </RadioGroup>
          </div>
          <div>
            <h4>Thể loại</h4>
            {genresList.map((genre) => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    checked={selectedComic.genres.some((item) => item.id === genre.id)}
                    onChange={() => handleSelectedComicGenreChange(genre.id, genre.name)}
                  />
                }
                label={genre.name}
              />
            ))}
          </div>
          <div>
            <Button variant="contained" color="success"  onClick={handleEditComic}>Xác nhận</Button>
            <Button onClick={handleCancelEdit}>Hủy</Button>
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
        {currentComics.map((comic, index) => (
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
                  <Button variant="contained" color="success" sx={{textTransform:"initial"}} onClick={() => handleUpgradeClick(comic.id)}>
                      Nâng cấp
                    </Button>
                )}
              </td>
              <td>
              <Button variant="contained" color="primary"  sx={{textTransform:"initial"}}>
                    <Link to={`/chapter-manage/${comic.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      Quản lý chương
                    </Link>
                  </Button>
              </td>
              <td>
              <Button variant="contained" color="warning" onClick={() => handleEditClick(comic.id)}>
                    Sửa
                  </Button>
              </td>
              <td>
              <Button variant="contained" color="error" onClick={() => handleDeleteClick(comic.id, comic.name)}>
                    Xóa
                  </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
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

export default ComicManage;