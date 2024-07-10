import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmDialog = ({
  open,
  onClose,
  onAccept,
  message,
  title = "Xác nhận",
  buttonText = "Xác nhận",
}) => {
  const handleAccept = () => {
    onClose();
    onAccept();
  };

  const handleExit = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleExit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExit}>Hủy</Button>
          <Button onClick={handleAccept} autoFocus style={{ color: "red" }}>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmDialog;
