import axios from "axios";
import API_URL from "../config/config";
import React, { useEffect, useState } from "react";
import { checkAuth } from "../security/Authentication";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { Dialog, Menu, MenuItem } from "@mui/material";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import AlertDialog from "./dialogs/AlertDialog";
import { useLocation } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import toast from "react-hot-toast";
import {
  Button as Button2,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const Comment = (props) => {
  const chapterId = props.chapterId;
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const defaultAvatarUrl = `${process.env.PUBLIC_URL}/images/default-avatar.png`;

  useEffect(() => {
    const getCommentByChapter = async () => {
      try {
        if (chapterId) {
          const response = await axios.get(
            `${API_URL}/comments?chapterId=${chapterId}`
          );
          setCommentList(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCommentByChapter();
  }, [chapterId]);

  const insertComment = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user/comments`,
        { chapterId: chapterId, content: commentContent },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.data.status === true) {
        setCommentList((prev)=>[response.data.data,...prev])
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleTextareaChange = (event) => {
    setCommentContent(event.target.value);
  };
  const handleSubmit = (event) => {
    if (!checkAuth()) {
      toast("Bạn cần đăng nhập để bình luận!",{
        icon:'🛈',
        position:"top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
       })
      event.preventDefault();
    } else if (commentContent === "") {
      toast("Vui lòng nhập nội dung bình luận!",{
        icon:'🛈',
        position:"top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
       })
      event.preventDefault();
    } else {
      insertComment();
      setCommentContent("");
      event.preventDefault();
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isOwnedByUser, setIsOwnedByUser] = useState(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [selectedComment, setSelectedComment] = useState();

  const handleCommentClick = (event, item) => {
    setSelectedComment(item);
    setAnchorEl(event.currentTarget);
    if (window.sessionStorage.getItem("userid") === item.user.id) {
      setIsOwnedByUser(true);
    } else {
      setIsOwnedByUser(false);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteComment = async () => {
    try {
      const response = await axios.delete(`${API_URL}/user/comments`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          commentId: selectedComment.id,
        },
      });
      console.log(selectedComment);
      setAlertMessage("Xóa bình luận thành công");
      setAlertDialogOpen(true);
      console.log(response);
    } catch (error) {
      setAlertMessage("Xóa bình luận thất bại, đã có sự cố xảy ra");
      setAlertDialogOpen(true);
      console.log(error);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteConfirm(true);
    setAnchorEl(null);
  };
  
  const location = useLocation();
  const commentId = new URLSearchParams(location.search).get('commentId');
  
  useEffect(() => {
    if (commentId) {
      const commentElement = document.getElementById(commentId);
      if (commentElement) {
        commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        commentElement.focus();
      }
    }
  });

  //
  //
  // Báo cáo bình luận

  const [checked, setChecked] = useState([]);
  const [openReportReason, setOpenReportReason] = useState(false);
  const [reportReasonList, setReportReasonList] = useState([]);

  const getReportReasonList = async () => {
    try {
      const response = await axios.get(`${API_URL}/report_comment_reason`);
      setReportReasonList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReportClick = () => {
    getReportReasonList();
    setOpenReportReason(true);
    setAnchorEl(null);
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

  const reportComment = async () => {
    try {
      await axios.post(
        `${API_URL}/user/report_comment`,
        { commentId: selectedComment.id, reasonId: checked.join(",") },
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
    if(checked.length>0){
        reportComment();
        setOpenReportReason(false);
    } else {
      toast("Phải chọn ít nhất 1 lí do!",{
        icon:'🛈',
        position:"top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
       })
    }
  }

  return (
    <>
      <div className="anime__details__review">
        <div className="section-title">
          <h5>Bình luận ({commentList.length})</h5>
        </div>
        
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
        <ConfirmDialog
          open={openDeleteConfirm}
          onClose={() => setOpenDeleteConfirm(false)}
          onAccept={deleteComment}
          message={"Bạn có chắc muốn xóa bình luận?"}
          title="Xóa bình luận"
        ></ConfirmDialog>
         <Scrollbars
               autoHeight autoHeightMax={300}>
                
        {commentList.length ? (
          commentList.map((item) => (
            
            <div id={item.id} key={item.id} className="anime__review__item">
              <div className="anime__review__item__pic">
                <img
                  src={item.user.avatar?item.user.avatar:defaultAvatarUrl}
                  alt=""
                />
              </div>
              <div className="anime__review__item__text">
                <Button
                  className="button"
                  onClick={(e) => handleCommentClick(e, item)}
                >
                  <i className="fa fa-ellipsis-v"></i>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {isOwnedByUser && (
                    <MenuItem onClick={handleDeleteClick}>Xóa</MenuItem>
                  )}
                  {!isOwnedByUser && (
                    <MenuItem onClick={handleReportClick}>Báo cáo</MenuItem>
                  )}
                </Menu>
                <h6>
                  {item.user.name} <span>{item.createAt}</span>
                </h6>
                <p>{item.content}</p>
              </div>
            </div>
            
          ))
        ) : (
          <div className="anime__review__item">
            <div className="anime__review__item__text">
              <p>Chưa có bình luận</p>
            </div>
          </div>
          
        )}
        </Scrollbars>
    
      </div>
      <div className="anime__details__form">
        <div className="section-title">
          <h5>Bình luận tại đây</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="inputText"
            value={commentContent}
            onChange={handleTextareaChange}
            placeholder="Your Comment"
          ></textarea>

          <button type="submit">
            <i className="fa fa-location-arrow"></i> Bình luận
          </button>
        </form>
      </div>
    </>
  );
};
export default Comment;
