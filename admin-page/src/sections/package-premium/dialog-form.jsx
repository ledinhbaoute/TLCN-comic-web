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

export default function FormDialog({ open, handleClose}) {
    
    const[cost,setCost]=useState(0)
    const[duration,setDuration]=useState(0)
    const router = useRouter();

    const handleCostChange=(event)=>{
        setCost(event.target.value)
    }
    const handleDurationChange=(event)=>{
        setDuration(event.target.value)
    }
    const insertPackage = async () => {
        const response=axios.post(`${API_URL}/admin/package_premium`, JSON.stringify({cost,duration}),
        {
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${Cookies.get("access_token")}`,
            }
        })
        console.log(response.data)
    }
    const handleSubmitAddPackage=()=>{
        insertPackage()
        router.reload()
    }

return (

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Package</DialogTitle>
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
                id="cost"
                label="Cost"
                type="number"
                fullWidth
                variant="standard"
            />
             <TextField
        
                margin="dense"
                value={duration}
                onChange={handleDurationChange}
                id="duration"
                label="Duration"
                type="number"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmitAddPackage}>Confirm</Button>
        </DialogActions>
    </Dialog>

);
}
FormDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};
