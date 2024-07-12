import axios from 'axios';
import Cookies from 'js-cookie';
import { useState,useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import API_URL from 'src/config/config';
import { account } from 'src/_mock/account';

// const MENU_OPTIONS = [
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router=useRouter();
  const [admin,setAdmin]=useState({})
  useEffect(() => {
    const getInfoAdmin = async () => {
      try {
        
        const response=await axios.get(
          `${API_URL}/admin`,
          {
            headers: {
              "Authorization": `Bearer  ${Cookies.get("access_token")}`,
            }
          }
        );
        setAdmin(response.data)
      } catch (error) {
        console.log(error);
      }

    };
    getInfoAdmin()
  }, [])
  const logout=async()=>{
    try{
      await axios.post(
        `${API_URL}/logout`, {accessToken:Cookies.get("access_token")},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }catch (error) {
      console.log(error);
    } 

  }
  const handleLogout = async () => {
    await logout();
    Cookies.remove("access_token");
    window.sessionStorage.clear();
    router.reload()
  };
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={admin.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {admin.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {`@${admin.userName}`}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))} */}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Đăng xuất
        </MenuItem>
      </Popover>
    </>
  );
}
