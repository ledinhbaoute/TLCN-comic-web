package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.Message;
import vn.hcmute.tlcn.serviceimple.MessageServiceImple;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class MessageController {
    @Autowired
    MessageServiceImple messageServiceImple;
    @GetMapping("/user/getMessages")
    public List<Message> getMessages(Authentication authentication, @RequestParam String receiverUsername) {
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return messageServiceImple.getMessagesBetweenUsers(userDetails.getUsername(),receiverUsername);
    }
    @GetMapping("/user/chats")
    public ResponseEntity<Map<String, List<Message>>> getAllChats(Authentication authentication) {
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        Map<String, List<Message>> chats = messageServiceImple.getAllChatsForUser(userDetails.getUsername());
        return ResponseEntity.ok(chats);
    }
    @PostMapping("/user/readChat")
   public void markChatAsRead(Authentication authentication,@RequestParam String otherUserName){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        messageServiceImple.markAsRead(userDetails.getUsername(),otherUserName);
    }
}
