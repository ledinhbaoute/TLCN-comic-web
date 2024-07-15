import { useEffect, useRef, useState } from "react";
import { Avatar, Box, Divider, IconButton, styled, TextField } from "@mui/material";
import { Attachment, Clear, TagFaces } from "@mui/icons-material";
import Scrollbars from "react-custom-scrollbars-2";
import { H5 } from "./Typography";
import ChatAvatar from "./ChatAvatar";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Cookies from "js-cookie";
import API_URL from "../config/config";
import axios from "axios";
import { fToNow } from '../utils/format-time';
import {isWithinTwoMinutes} from '../utils/format-time';


// STYLED COMPONENTS
const ChatContainer = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "#fff"
});

const StyledScrollBar = styled(Scrollbars)({
  flexGrow: 1
});

const ProfileBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 12px 12px 20px",
  color: theme.palette.primary.main,
  background: "#fafafa"
}));

const ChatStatus = styled("div")(({ theme }) => ({
  marginLeft: "12px",
  color: theme.palette.primary.main,
  "& h5": {
    marginTop: 0,
    fontSize: "14px",
    marginBottom: "3px"
  },
  "& span": { fontWeight: "500" }
}));

const ChatMessage = styled("div")(({ theme }) => ({
  padding: "8px",
  maxWidth: 240,
  fontSize: "14px",
  borderRadius: "4px",
  marginBottom: "8px",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  background: "#fafafa",
  textAlign: "left"
}));

const MessageTime = styled("div")(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "500",
  textAlign: "left"

}));

// const ChatImgContainer = styled("div")({
//   padding: "20px",
//   display: "flex",
//   justifyContent: "flex-end"
// });

// const ChatImgBox = styled("div")(({ theme }) => ({
//   padding: "8px",
//   fontSize: "14px",
//   maxWidth: 240,
//   borderRadius: "4px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   color: theme.palette.primary.main,
//   background: "#fafafa"
// }));

// const ChatImg = styled("img")(() => ({ width: "40px" }));


export default function Chatbox({ togglePopup, receiverUserName, setChatList }) {
  const chatBottomRef = useRef(null)

  const currentUserId = window.sessionStorage.getItem("userid")
  const [currentUser, setCurrentUser] = useState({})
  const [receiverUser, setReceiverUser] = useState({})
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const token = Cookies.get("access_token");


  useEffect(() => {
    const socket = new SockJS(`http://localhost:8081/ws?token=${token}`);
    const stompClient = Stomp.over(socket);
    getCurrentUser();
    stompClient.connect({}, () => {
      stompClient.subscribe('/user/queue/messages', (message) => {
        console.log('Received message: ', message.body);
        const receivedMessage = JSON.parse(message.body);
        if (receivedMessage.sender.userName === receiverUserName) {
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
        
      });
    });

    setStompClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [token,receiverUserName]);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
  useEffect(() => {
    const getReceiverUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/getUserByUserName?userName=${receiverUserName}`);
        setReceiverUser(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    getReceiverUser();
  }, [receiverUserName])
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getMessages?receiverUsername=${receiverUserName}`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [receiverUserName])

  useEffect(() => {
    const markReadChat = async () => {
      try {
        await axios.post(`${API_URL}/user/readChat`,
          { otherUserName: receiverUserName },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    markReadChat()
    if (setChatList) {
      setChatList(prevChatList => {
        const updatedChatList = new Map(Object.entries(prevChatList));
        if (updatedChatList.has(receiverUserName)) {
          const updatedMessages = updatedChatList.get(receiverUserName).map(message => ({
            ...message,
            read: true
          }));
          updatedChatList.set(receiverUserName, updatedMessages);
        }

        return Object.fromEntries(updatedChatList);
      })
    }
  }, [receiverUserName,setChatList])

  const sendMessageOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (stompClient && input.trim() && receiverUserName) {
        const message = { content: input, receiver: receiverUserName };
        stompClient.send('/app/chat', {}, JSON.stringify(message));
        const newMessage = {
          content: input,
          sender: currentUser,
          receiver: receiverUser,
          time: new Date()
        }
        setMessages((prevMessages) => [
          ...prevMessages, newMessage

        ]);
        if (setChatList) {
          setChatList(prevChatList => {
            const updatedChatList = new Map(Object.entries(prevChatList));

            // Xác định người dùng gửi và người dùng nhận
            const sender = currentUser.userName;
            const receiver = receiverUser.userName;

            // Tìm otherUser (người gửi tin nhắn hoặc người nhận tin nhắn)
            const otherUser = sender === currentUser.userName ? receiver : sender;

            // Kiểm tra xem otherUser đã tồn tại trong Map chưa
            if (updatedChatList.has(otherUser)) {
              // Nếu đã tồn tại, thêm tin nhắn mới vào mảng tin nhắn của otherUser
              updatedChatList.get(otherUser).push({
                content: input,
                sender: currentUser,
                receiver: receiverUser,
                time: new Date()
              });
            } else {
              // Nếu chưa tồn tại, khởi tạo một mảng mới và thêm vào Map
              updatedChatList.set(otherUser, {
                content: input,
                sender: currentUser,
                receiver: receiverUser,
                time: new Date()
              });
            }
            const sortedChatList = new Map([...updatedChatList.entries()].sort((a, b) => {
              const lastMessageA = a[1][a[1].length - 1];
              const lastMessageB = b[1][b[1].length - 1];
              return new Date(lastMessageB.time) - new Date(lastMessageA.time);
            }));

            return Object.fromEntries(sortedChatList);
          });
        }

        setInput('');
      }
    }
  };
 
  return (
    <ChatContainer>
      <ProfileBox>
        <Box display="flex" alignItems="center">
          
          <ChatAvatar src={receiverUser.avatar} status={isWithinTwoMinutes(receiverUser.lastActiveTime) ? "online" : "offline"} />
          <ChatStatus>
            <H5>{receiverUser.name}</H5>
            <H5>{isWithinTwoMinutes(receiverUser.lastActiveTime)?'Active':`Active ${fToNow(receiverUser.lastActiveTime)}` }</H5>
          </ChatStatus>
        </Box>
        <IconButton onClick={togglePopup}>
          <Clear fontSize="small" />
        </IconButton>
      </ProfileBox>
      <StyledScrollBar >
        {messages.map((item, ind) => (
          <Box
            key={ind}
            p="20px"
            display="flex"
            sx={{ justifyContent: currentUserId === item.sender.id && "flex-end" }}>
            {currentUserId !== item.sender.id && <Avatar src={item.sender.avatar} />}
            <Box ml="12px">
              {currentUserId !== item.sender.id && (
                <H5 mb={0.5} fontSize={14}>
                  {item.sender.userName}
                </H5>
              )}
              <ChatMessage>{item.content}</ChatMessage>
              <MessageTime>{fToNow(item.time)}</MessageTime>
            </Box>
          </Box>
        ))}
        <div ref={chatBottomRef} />
      </StyledScrollBar>

      <div>
        <Divider sx={{ backgroundColor: 'gray' }} />

        <TextField
          multiline
          fullWidth
          rowsMax={4}
          value={input}
          placeholder="Type here ..."
          onKeyUp={sendMessageOnEnter}
          onChange={(e) => setInput(e.target.value)}

          InputProps={{
            endAdornment: (
              <Box display="flex">
                <IconButton size="small">
                  <TagFaces />
                </IconButton>

                <IconButton size="small">
                  <Attachment />
                </IconButton>
              </Box>
            ),
            classes: { root: "pl-5 pr-3 py-3 text-body" }
          }}
        />
      </div>
    </ChatContainer>
  );
}
