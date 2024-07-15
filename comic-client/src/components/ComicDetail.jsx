import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../config/config";
import { checkAuth } from "../security/Authentication";
import {
  Button as Button2,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Dialog } from "@mui/material";
import AlertDialog from "./dialogs/AlertDialog";
import toast from "react-hot-toast";

const ComicDetail = (props) => {
  const comic = props.comic;
  const userId = window.sessionStorage.getItem("userid")
  const [isFavorite, setIsfavorite] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const addFavoriteComic = async () => {
    try {
      await axios.post(
        `${API_URL}/user/favorite-comic`,
        { comicId: comic.id },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setIsfavorite(true)
      toast.success("Đã thêm truyện vào mục ưa thích!",{
        position:"top-right"
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtnFavoriteSubmit = () => {
    if (!checkAuth()) {
      toast("Bạn cần đăng nhập để thêm truyện vào ưa thích!",{
        icon:'🛈',
        position:"top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
       })
    } else {
      addFavoriteComic();
     
    }
  };

  useEffect(() => {
    const isFavoriteComic = async () => {
      if (checkAuth()) {
        try {
          const response = await axios.get(`${API_URL}/isFavorite?userId=${userId}&&comicId=${comic.id}`);
          setIsfavorite(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    isFavoriteComic();
  }, [comic,userId]);

  const deleteFavoriteComic = async () => {
    try {
      await axios.delete(`${API_URL}/user/favorite-comic`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: { comicId: comic.id },
      });
      setIsfavorite(false)
    } catch (error) {
      console.error("Error increasing view:", error);
    }
  };

  const handleDeleteFavorite = async () => {
    deleteFavoriteComic();
  };

  //
  //
  //Báo cáo truyện

  const [checked, setChecked] = useState([]);
  const [openReportReason, setOpenReportReason] = useState(false);
  const [reportReasonList, setReportReasonList] = useState([]);

  const getReportReasonList = async () => {
    try {
      const response = await axios.get(`${API_URL}/report_comic_reason`);
      setReportReasonList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReportClick = () => {
    if (checkAuth()) {
      getReportReasonList();
      setOpenReportReason(true);
    } else {
     toast("Bạn cần đăng nhập để báo cáo!",{
      icon:'🛈',
      position:"top-right",
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
     })
    }
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const reportCommic = async () => {
    try {
      await axios.post(
        `${API_URL}/user/report_comic`,
        { comicId: comic.id, reasonIds: checked.join(",") },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setAlertMessage("Báo cáo thành công");
      setAlertDialogOpen(true);
    } catch (error) {
      console.log(error);
      setAlertMessage("Báo cáo thất bại, đã có lỗi xảy ra");
      setAlertDialogOpen(true);
    }
  };

  const handleReportSubmit = () => {
    if (checked.length > 0) {
      reportCommic();
      setOpenReportReason(false);
    } else {
      toast("Phải có ít nhất 1 lý do!",{
        icon:'🛈',
        position:"top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
       })
    }
  };

  return (
    <div className="anime__details__content">
      <AlertDialog
        open={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        message={alertMessage}
      ></AlertDialog>

      <Dialog open={openReportReason}>
        <List
          dense
          sx={{
            width: "100%",
            minWidth: 300,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {reportReasonList.map((value) => {
            const labelId = `reason-${value.id}`;
            return (
              <ListItem
                key={value.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value.id)}
                    checked={checked.indexOf(value.id) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={value.reason} />
                </ListItemButton>
              </ListItem>
            );
          })}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button2
              variant="outlined"
              sx={{ marginRight: "10px" }}
              onClick={() => {
                setOpenReportReason(false);
              }}
            >
              Hủy
            </Button2>
            <Button2
              variant="outlined"
              sx={{ marginLeft: "10px" }}
              color="error"
              onClick={handleReportSubmit}
            >
              Báo cáo
            </Button2>
          </div>
        </List>
      </Dialog>
      <div className="row">
        <div className="col-lg-3">
          <div
            className="anime__details__pic set-bg"
            style={{ backgroundImage: `url(${comic.image})` }}
          >
            <div className="comment">
              <i className="fa fa-star"></i> {comic.rate}
            </div>
            <div className="view">
              <i className="fa fa-eye"></i> {comic.view}
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="anime__details__text">
            <div className="anime__details__title">
              <h3>{comic.name}</h3>
              {comic.actorId && <span>Tác giả:<Link to={`/user/${comic.actorId.id}`}>{comic.actorId.name}</Link></span>}
            </div>
            {/* <div className="anime__details__rating">
                            <div className="rating">
                                <a href="#"><i className="fa fa-star"></i></a>
                                <a href="#"><i className="fa fa-star"></i></a>
                                <a href="#"><i className="fa fa-star"></i></a>
                                <a href="#"><i className="fa fa-star"></i></a>
                                <a href="#"><i className="fa fa-star-half-o"></i></a>
                            </div>
                            <span>1.029 Votes</span>
                        </div> */}
            <p>{comic.discription}</p>
            <div className="anime__details__widget">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <ul>
                    <li>
                      <span>Ngày ra mắt:</span> {comic.publishDate}
                    </li>
                    <li>
                      <span>Trạng thái:</span>{" "}
                      {comic.status === 1 && "Đang tiến hành"}
                      {comic.status === 2 && "Đã xong"}
                      {comic.status === 3 && "Tạm ngưng"}
                    </li>
                    <li>
                      <span>Thể loại:</span>

                      {comic.genres &&
                        comic.genres.map((item) => (
                          item.name+" "
                        ))}
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 col-md-6">
                  <ul>
                    {/* <li>
                      <span>Scores:</span> 7.31 / 1,515
                    </li> */}
                    <li>
                      <span>Đánh giá:</span> {comic.rate}/5 ⭐
                    </li>
                    {/* <li>
                      <span>Duration:</span> 24 min/ep
                    </li> */}
                    {/* <li>
                      <span>Quality:</span> HD
                    </li> */}
                    <li>
                      <span>Lượt xem:</span> {comic.view}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="anime__details__btn">
              {!isFavorite && (
                <button
                  onClick={handleBtnFavoriteSubmit}
                  className="follow-btn"
                >
                  <i className="fa fa-heart-o"></i> Ưa thích
                </button>
              )}
              {isFavorite && (
                <button onClick={handleDeleteFavorite} className="follow-btn">
                  <i className="fa fa-heart"></i> Đã thích
                </button>
              )}
              <button onClick={handleReportClick} className="follow-btn">
                <i className="fa fa-flag"></i> Báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComicDetail;
