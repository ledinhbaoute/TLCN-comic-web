import { useState, useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import API_URL from '../config/config';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from '../utils/format-time';
import { Icon } from '@iconify/react';
import Iconify from './iconify';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from "js-cookie";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  
  const [notificationsUnread, setNotificationsUnRead] = useState([])
  const [notificationsRead, setNotificationsRead] = useState([])


  const [open, setOpen] = useState(null);
  const token = Cookies.get("access_token");

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleMarkAllAsRead = async () => {

    try {
       await axios.post(
        `${API_URL}/user/notifications`, {},
        {
          headers: {
            "Authorization": "Bearer " + token
          },
        }
      );
      getNotifications()
    } catch (error) {
      console.error(error);
    }
  };
  const getNotifications = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/user/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const notificationsUnread = response.data.filter((item) => !item.read);
      const notificationsRead = response.data.filter((item) => item.read);
      setNotificationsUnRead(notificationsUnread)
      setNotificationsRead(notificationsRead);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    const socket = new SockJS(`http://localhost:8081/ws?token=${token}`);
    const stompClient = Stomp.over(socket);
    getNotifications();
    stompClient.connect({}, (frame) => {
      stompClient.subscribe(`/user/queue/notifications`, (message) => {
        if (message.body) {
          const newNotification = JSON.parse(message.body)
          setNotificationsRead((prevNotifications) => [
            ...prevNotifications,
          ]);
          setNotificationsUnRead((prevNotifications)=>[
            newNotification,
            ...prevNotifications,
          ])
        }
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [token,getNotifications]);


  const navigate = useNavigate();
  const markAsRead = async (announceId) => {
    if (!announceId) {
      console.error("No announceId provided");
      return;
    }

    try {
       await axios.post(
        `${API_URL}/user/markNotification`, 
        {
          announceId:announceId
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + Cookies.get("access_token")
          },
        }
      );
      
      getNotifications()
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = (notification) => {
    if (!notification || !notification.id) {
      console.error("Invalid notification object", notification);
      return;
    }
      markAsRead(notification.id).then(() => {
        navigate(notification.linkTo);
        handleClose()
      });
  };
  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={notificationsUnread.length} color="error">
          {/* <Iconify width={24}  icon="solar:bell-bing-bold-duotone" /> */}
          <Icon icon="solar:bell-bing-bold-duotone" color='white' width={24} />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Thông báo</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Bạn có {notificationsUnread.length} thông báo chưa xem
            </Typography>
          </Box>

          {notificationsUnread.length > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <List
          disablePadding
          sx={{ height: 'auto', margin: 0, padding: 0 }}
          subheader={
            <ListSubheader disableSticky sx={{
              py: 1, px: 2.5, typography: 'overline', fontWeight: 700,
              lineHeight: 1.5,

              textTransform: 'uppercase',
            }}>
              Chưa xem
            </ListSubheader>
          }
        >
          {notificationsUnread.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onClick={handleClick}/>
          ))}
        </List>

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{
              py: 1, px: 2.5, typography: 'overline', fontWeight: 700,
              lineHeight: 1.5,

              textTransform: 'uppercase',
            }}>
              Đã xem
            </ListSubheader>
          }
        >
          {notificationsRead.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onClick={handleClick} />
          ))}
        </List>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification,onClick }) {
  const { avatar, title } = renderContent(notification);
  
  return (
    <ListItemButton
    onClick={()=>onClick(notification)}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
export function pxToRem(value) {
  return `${value / 16}rem`;
}
// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2" sx={{
      fontWeight: 500,
      lineHeight: 22 / 14, fontSize: pxToRem(14)
    }}>
      {notification.content}
      {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.content}
      </Typography> */}
    </Typography>
  );

  if (notification.type === 'fl') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_follow.png" />,
      title,
    };
  }
  if (notification.type === 'dn') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_donate.png" />,
      title,
    };
  }
  if (notification.type === 'prf') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_profits.png" />,
      title,
    };
  }
  if (notification.type === 'avt') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_avatar.png" />,
      title,
    };
  }
  if (notification.type === 'cmt') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_comment.png" />,
      title,
    };
  }
  if (notification.type === 'ncm') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/glass/ic_comic.png" />,
      title,
    };
  }
  if (notification.type === 'fvr') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/glass/ic_comic.png" />,
      title,
    };
  }
  if (notification.type === 'acpt') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/glass/ic_comic.png" />,
      title,
    };
  }
  if (notification.type === 'reject') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/glass/ic_comic.png" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
