import axios from 'axios';
import Cookies from 'js-cookie'
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import API_URL from 'src/config/config';

import Iconify from 'src/components/iconify';

import EditDialog from './edit-genre-dialog';
import ConfirmDialog from '../dialog/confirm-dialog';

// ----------------------------------------------------------------------

export default function GenreTableRow({

  id,
  name,

}) {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmDialog,setOpenConfirmDialog]=useState(false)
  const handleOpenConfirmDialog = (event) => {
    setOpenConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  const handleClickOpen = () => {
    setOpenEdit(true);
  };
  const handleClickClose = () => {
    setOpenEdit(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const deleteGenre = async () => {
    try {
      const response = await axios.delete(`${API_URL}/admin/genres`,
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("access_token")}`,
            "Content-Type": "application/x-www-form-urlencoded"

          }, data: { genreId:id },
        });
        console.log(response.data)

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDeleteGenre=()=>{
    deleteGenre();
    handleCloseMenu()
    router.reload()
  }

  return (
    <>
      <TableRow hover tabIndex={-1} >
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
        <TableCell>{id}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>

            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>



        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >

        <MenuItem onClick={handleClickOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Sửa
        </MenuItem>
        <EditDialog open={openEdit} handleClose={handleClickClose} genre={{'id':id,'name':name}}/>
        

        <MenuItem onClick={handleOpenConfirmDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
      <ConfirmDialog content='Bạn có chắc xóa thể loại này?' open={openConfirmDialog} handleClose={handleCloseConfirmDialog} handleConfirm={handleDeleteGenre}/>
    </>
  );
}

GenreTableRow.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
};
