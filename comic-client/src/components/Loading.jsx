import React from "react";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import {
  Dialog,
  CircularProgress,
  DialogContentText,
  Box,
  Backdrop,
} from "@mui/material";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
  return (
    // <Dialog open={true} sx={{ justifyContent: "center" }}>
    //   <DialogContentText id="alert-dialog-description">
    //     Đang xử lý...
    //   </DialogContentText>
    <Backdrop open={true} sx={{zIndex: 1,}}>
      <CircularProgress
        sx={{
          "--CircularProgress-size": "60px",
        }}
      />
    </Backdrop>
    // </Dialog>
  );
};

export default Loading;
