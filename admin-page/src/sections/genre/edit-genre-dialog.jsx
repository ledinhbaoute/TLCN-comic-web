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

export default function EditDialog({ open, handleClose,genre}) {
    
    const[genreName,setGenreName]=useState(genre.name)
    const router = useRouter();

    const handleTextChange=(event)=>{
        setGenreName(event.target.value)
    }
    const updateGenre = async () => {
        const response=axios.put(`${API_URL}/admin/genres`, { genreId:genre.id,newName:genreName },
        {
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "Authorization":`Bearer ${Cookies.get("access_token")}`,
            }
        })
        console.log(response.data)
    }
    const handleSubmitEditGenre=()=>{
        updateGenre()
        router.reload()
    }

return (

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa thể loại</DialogTitle>
        <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
            <TextField
                autoFocus
                margin="dense"
                value={genreName}
                onChange={handleTextChange}
                id="name"
                label="Tên thể loại"
                type="text"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSubmitEditGenre}>Xác nhận</Button>
        </DialogActions>
    </Dialog>

);
}
EditDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    genre:PropTypes.object,
};
