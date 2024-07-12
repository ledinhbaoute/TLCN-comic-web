package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import vn.hcmute.tlcn.entity.Message;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.jwt.JwtService;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.securiry.CustomUserDetailsService;
import vn.hcmute.tlcn.serviceimple.MessageServiceImple;

import java.util.Date;
import java.util.Map;

@Controller
public class ChatController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
    @Autowired
    UserRepository userRepository;
    @Autowired
    private MessageServiceImple messageService;
    @MessageMapping("/chat")
    @SendToUser("/queue/messages")
    public void sendMessage(@Payload Map<String,String> messageData, SimpMessageHeaderAccessor headerAccessor) {
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String receiverUserName=messageData.get("receiver");
        if(username!=null && receiverUserName!=null){
            User user=userRepository.findOneByUserName(username).orElse(null);
            User receiver=userRepository.findOneByUserName(receiverUserName).orElse(null);
            if(user!=null && receiver!=null){
            Message message=new Message();
            message.setSender(user);
            message.setReceiver(receiver);
            message.setContent(messageData.get("content"));
            message.setTime(new Date());
            message.setRead(false);
            messageService.saveMessage(message);
            messagingTemplate.convertAndSendToUser(message.getReceiver().getUserName(), "/queue/messages", message);
            }
            else throw new RuntimeException("User or receiver not found");
        }
        else
            throw new RuntimeException("User not authenticated");

    }
}
