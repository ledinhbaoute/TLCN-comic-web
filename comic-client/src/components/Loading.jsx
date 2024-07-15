import React from "react";
import {
  CircularProgress,
  Backdrop
} from "@mui/material";

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
