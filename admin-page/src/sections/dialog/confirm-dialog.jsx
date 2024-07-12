import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ConfirmDialog({open,handleClose,handleConfirm,content}) {


  return (
     
      <Dialog
        open={open}        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Xác nhận
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleConfirm}  autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}
ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  content:PropTypes.string,
};