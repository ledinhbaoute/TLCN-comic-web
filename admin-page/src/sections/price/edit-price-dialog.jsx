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

export default function EditDialog({ open, handleClose,price}) {
    
    const[viewNumber,setViewNumber]=useState(price.view)
    const[cost,setCost]=useState(price.cost)

    const router = useRouter();

    const handleViewNumberChange=(event)=>{
        setViewNumber(event.target.value)
    }
    const handleCostChange=(event)=>{
        setCost(event.target.value)
    }
    const updatePrice = async () => {
        const response=await axios.post(`${API_URL}/admin/price`, { id:price.id,newView:viewNumber,newCost:cost },
        {
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":`Bearer ${Cookies.get("access_token")}`,
            }
        })
        return response.data
    }
    const handleSubmitEditPrice=async()=>{
        updatePrice()
        router.reload()
    }

return (

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Điều chỉnh giá</DialogTitle>
        <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
            <TextField
                autoFocus
                margin="dense"
                value={viewNumber}
                onChange={handleViewNumberChange}
                id="view"
                label="Số view"
                type="number"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                value={cost}
                onChange={handleCostChange}
                id="cost"
                label="Lợi nhuận"
                type="number"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSubmitEditPrice}>Xác nhận</Button>
        </DialogActions>
    </Dialog>

);
}
EditDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    price:PropTypes.object,
};
