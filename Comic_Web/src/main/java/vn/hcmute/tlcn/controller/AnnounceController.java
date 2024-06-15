package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.Announce;
import vn.hcmute.tlcn.serviceimple.AnnounceServiceImple;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AnnounceController {
    @Autowired
    AnnounceServiceImple announceServiceImple;
    @GetMapping("/user/notifications")
    List<Announce>getNotificationsByUser(Authentication authentication){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return announceServiceImple.getAnnounceByUser(userDetails.getUsername());
    }
    @PostMapping("/user/notifications")
    public void markAllAsRead(Authentication authentication){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        announceServiceImple.markAllAsRead(userDetails.getUsername());
    }
    @PostMapping("/user/markNotification")
    public ResponseEntity<?> markAsRead(Authentication authentication, @RequestParam String announceId){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return announceServiceImple.markAsRead(userDetails.getUsername(),announceId);
    }
}
