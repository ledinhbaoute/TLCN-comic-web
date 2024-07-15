import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import API_URL from '../config/config';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from '../utils/format-time';
import { Icon } from '@iconify/react';
import Iconify from './iconify';
import messageBoxIcon from '@iconify-icons/mdi/email'
import Cookies from "js-cookie";
import Chatbox from './Chatbox';
import ChatHead from './ChatHead';
import Comment from '@mui/icons-material/Comment';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
// ----------------------------------------------------------------------

export default function MessagesPopover() {


  const [messageList, setMessageList] = useState([])
  const [unreadConversations, setUnreadConversations] = useState(0);
  const [currentUser, setCurrentUser] = useState({})

  const [open, setOpen] = useState(null);
  const token = Cookies.get("access_token");
  useEffect(() => {
    const socket = new SockJS(`http://localhost:8081/ws?token=${token}`);
    const stompClient = Stomp.over(socket);
    getCurrentUser();
    stompClient.connect({}, () => {
      stompClient.subscribe('/user/queue/messages', (message) => {
        console.log('Received message: ', message.body);
        const receivedMessage = JSON.parse(message.body);
          setMessageList(prevChatList => {
            const updatedChatList = new Map(Object.entries(prevChatList));
            const sender = receivedMessage.sender.userName;
            const receiver = receivedMessage.receiver.userName;
            const otherUser = sender === currentUser.userName ? receiver : sender;
            if (updatedChatList.has(otherUser)) {
              updatedChatList.get(otherUser).push(receivedMessage);
            } else {
              updatedChatList.set(otherUser, [receivedMessage]);
            }
            const sortedChatList = new Map([...updatedChatList.entries()].sort((a, b) => {
              const lastMessageA = a[1][a[1].length - 1];
              const lastMessageB = b[1][b[1].length - 1];
              return new Date(lastMessageB.time) - new Date(lastMessageA.time);
            }));
            
            return Object.fromEntries(sortedChatList);
          });
        
      
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [token,currentUser.userName]);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    let count = 0;
    Object.values(messageList).forEach(conversation => {
      if (conversation.some(message => !message.read&&message.receiver.id===currentUser.id)) {
        count++;
      }
    });
    setUnreadConversations(count);
  }, [messageList,currentUser.id]);
  
  useEffect(()=>{
    const getChatList = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessageList(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    getChatList();
  },[token])
  
  const updateChatList=useCallback((newChatList)=>{
    setMessageList(newChatList)
  },[]) 
  
  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={unreadConversations} color="error">
          {/* <Iconify width={24}  icon="solar:bell-bing-bold-duotone" /> */}
          <Icon icon={messageBoxIcon} color='white' width={24} />
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
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Đoạn chat</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Bạn có {unreadConversations} tin nhắn chưa xem
            </Typography>
          </Box>

          {/* {2 > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" >
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <List
          disablePadding
          sx={{ height: 'auto', margin: 0, padding: 0 }}
          // subheader={
          //   <ListSubheader disableSticky sx={{
          //     py: 1, px: 2.5, typography: 'overline', fontWeight: 700,
          //     lineHeight: 1.5,

          //     textTransform: 'uppercase',
          //   }}>
          //     Chưa xem
          //   </ListSubheader>
          // }
        >
          {Object.keys(messageList).map((otherUser) => (
            <MessageItem key={otherUser} chat={messageList[otherUser][messageList[otherUser].length - 1]} setChatList={updateChatList} />
          ))}
        </List>

        {/* <List
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
          
        </List> */}

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

MessageItem.propTypes = {
  chat: PropTypes.shape({
    time: PropTypes.string,
    id: PropTypes.number,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
  setChatList:PropTypes.func,
};

function MessageItem({ chat,setChatList}) {
  const { avatar, title } = renderContent(chat);
  const currentUserId = window.sessionStorage.getItem("userid")

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(chat.isUnRead && {
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
              fontWeight:chat.read||chat.sender.id===currentUserId?'normal':'bold'
              
            }}
          >
            {chat.sender.id === currentUserId ? 'Bạn:' + chat.content : chat.content}
          </Typography>
        }
      />
      <ChatHead
        icon={
          <IconButton size="small" sx={{ my: "12px", color: "primary.contrastText" }}>
            <Comment sx={{color:"gray"}}/>
          </IconButton>
        }>
        <Chatbox receiverUserName={chat.sender.id===currentUserId? chat.receiver.userName:chat.sender.userName} setChatList={setChatList} />
      </ChatHead>
    </ListItemButton>
  );
}
export function pxToRem(value) {
  return `${value / 16}rem`;
}
// ----------------------------------------------------------------------

function renderContent(chat) {
  const currentUserId = window.sessionStorage.getItem("userid")
  const title = (
    <Typography variant="subtitle2" sx={{
      fontWeight: 500,
      lineHeight: 22 / 14, fontSize: pxToRem(14)
    }}>
      {chat.sender.id === currentUserId ? chat.receiver.name : chat.sender.name}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
        {fToNow(chat.time)}
      </Typography>
    </Typography>
  );

  return {
    avatar: chat.receiver.avatar ? <img alt={chat.title} src={chat.sender.id === currentUserId ? chat.receiver.avatar : chat.sender.avatar} /> : null,
    title,
  };
}
