import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import PropTypes from 'prop-types';

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { useRouter } from 'src/routes/hooks';

import API_URL from "src/config/config";

export default function EditDialog({ open, handleClose, packagee }) {
    
    const[cost,setCost]=useState(packagee.cost)
    const[duration,setDuration]=useState(packagee.duration)
    const router = useRouter();

    const handleCostChange=(event)=>{
        setCost(event.target.value)
    }
    const handleDurationChange=(event)=>{
        setDuration(event.target.value)
    }
    const updatePackage = async () => {
        const response=axios.put(`${API_URL}/admin/package_premium`, { packageId:packagee.id,newCost:cost,newDuration:duration },
        {
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":`Bearer ${Cookies.get("access_token")}`,
            }
        })
        console.log(response.data)
    }
    const handleSubmitEditPackage=()=>{
        updatePackage()
        router.reload()
    }

return (

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa gói premium</DialogTitle>
        <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
            <TextField
                autoFocus
                margin="dense"
                value={cost}
                onChange={handleCostChange}
                id="name"
                label="Giá gói"
                type="number"
                fullWidth
                variant="standard"
            />
             <TextField
                
                margin="dense"
                value={duration}
                onChange={handleDurationChange}
                id="name"
                label="Thời hạn"
                type="number"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSubmitEditPackage}>Xác nhận</Button>
        </DialogActions>
    </Dialog>

);
}
EditDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    packagee:PropTypes.object,
};
