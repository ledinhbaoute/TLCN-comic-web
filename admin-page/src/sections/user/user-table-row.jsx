import axios from 'axios';
import Cookies from 'js-cookie'
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import API_URL from 'src/config/config';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import ConfirmDialog from '../dialog/confirm-dialog';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  username,
  name,
  avatarUrl,
  email,
  phoneNumber,
  // isVerified,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [openConfirmDialog,setOpenConfirmDialog]=useState(false)
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleOpenConfirmDialog = (event) => {
    setOpenConfirmDialog(true);
  };
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  const lockOrUnlockAccount = async () => {
    try {
      console.log(username)
      await axios.post(
        `${API_URL}/admin/lock-or-unlock_user`,{username},
        {
          headers: {
          "Authorization":`Bearer  ${Cookies.get("access_token")}`,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      router.reload()
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{phoneNumber}</TableCell>

        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        <TableCell>
          <Label color={(status === 'Banned' && 'error') || 'success'}>{status}</Label>
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
        {status==="Active"?(
          <MenuItem onClick={handleOpenConfirmDialog}>
          <Iconify icon="eva:lock-fill" sx={{ mr: 2 }} />
          Khóa
        </MenuItem>
        ):
        (<MenuItem onClick={handleOpenConfirmDialog}>
          <Iconify icon="eva:lock-fill" sx={{ mr: 2 }} />
          Mở khóa
        </MenuItem>)}
        

        {/* <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
      <ConfirmDialog content="Bạn có chắc muốn thay đổi?" open={openConfirmDialog} handleClose={handleCloseConfirmDialog} handleConfirm={lockOrUnlockAccount}/>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  // isVerified: PropTypes.any,
  name: PropTypes.any,
  phoneNumber: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  username:PropTypes.string
};
