import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const OtpDialogInput = ({ open, onClose }) => {
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setOtp(value);
  };

  const handleSubmit = () => {
    // Xử lý logic khi người dùng gửi mã OTP
    console.log('OTP:', otp);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>OTP Input</DialogTitle>
      <DialogContent>
        <TextField
          label="OTP"
          variant="outlined"
          type="number"
          value={otp}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogContent>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialogInput;