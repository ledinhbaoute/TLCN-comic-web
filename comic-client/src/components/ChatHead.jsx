import { cloneElement, useState } from "react";
import { styled } from "@mui/material";
import clsx from "clsx";
import { checkAuth } from "../security/Authentication";
import toast from "react-hot-toast";

// STYLED COMPONENTS
const PopupRoot = styled("div")(({ theme }) => ({
  "& .popupOpen": {
    top: 64 + 16,
    [theme.breakpoints.down("sm")]: { bottom: 0 }
  },
  "& .closeIcon": { position: "absolute", top: 6, right: 6 }
}));

const Popup = styled("div")(({ theme }) => ({
  position: "fixed",
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  top: "100vh",
  transition: "top 250ms ease-in-out",
  boxShadow: theme.shadows[6],
  borderRadius: 6,
  zIndex: 99999,
  width: 360,
  overflow: "hidden",
  "@media only screen and (max-width: 450px)": {
    width: "calc(100% - 32px)",
    left: theme.spacing(2)
  }
}));

export default function ChatHead({ icon, children }) {
  const [open, setOpen] = useState(false);

  const togglePopup = () => {
    if(checkAuth()){
      console.log(checkAuth)
      setOpen((open) => !open);
    }
    else{
      toast("Bạn cần đăng nhập để nhắn tin!",{
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
    <PopupRoot>
      {cloneElement(icon, { onClick: togglePopup })}
      <Popup className={clsx({ popupOpen: open })}>
        {open ? cloneElement(children, { togglePopup }) : null}
      </Popup>
    </PopupRoot>
  );
}
