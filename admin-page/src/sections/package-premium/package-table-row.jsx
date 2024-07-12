// import axios from 'axios';
// import Cookies from 'js-cookie'
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import { useRouter } from 'src/routes/hooks';

// import API_URL from 'src/config/config';

import Iconify from 'src/components/iconify';

import EditDialog from './editdialog';

// ----------------------------------------------------------------------

export default function PackageTableRow({

  id,
  cost,
  duration

}) {
  const [open, setOpen] = useState(null);
  // const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);

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
  // const deletePackage = async () => {
  //   try {
  //     const response = await axios.delete(`${API_URL}/admin/genres`,
  //       {
  //         headers: {
  //           "Authorization": `Bearer ${Cookies.get("access_token")}`,
  //           "Content-Type": "application/x-www-form-urlencoded"

  //         }, data: { genreId:id },
  //       });
  //       console.log(response.data)

  //   } catch (error) {
  //     console.error('Error increasing view:', error);
  //   }
  // };
  // const handleDeletePAckage=()=>{
  //   deleteGenre();
  //   handleCloseMenu()
  //   router.reload()
  // }

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
              {cost}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{duration}</TableCell>



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
        <EditDialog open={openEdit} handleClose={handleClickClose} packagee={{'id':id,'cost':cost,'duration':duration}}/>
        

        {/* <MenuItem onClick={handleDeletePackage} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}

PackageTableRow.propTypes = {
  id: PropTypes.string,
  cost: PropTypes.number,
  duration:PropTypes.number,
};
