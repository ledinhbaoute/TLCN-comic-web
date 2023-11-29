package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.service.IFollowService;

@RestController
@RequestMapping("api/v1")
public class FollowController {
    @Autowired
    IFollowService iFollowService;

    @PostMapping("/user/follows")
    ResponseEntity<?> follow(Authentication authentication,
                             @RequestParam("username") String userName) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return iFollowService.addFollow(userDetails.getUsername(), userName);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @DeleteMapping("user/follows")
    ResponseEntity<?> unfollow(Authentication authentication,
                                            @RequestParam("username") String userName) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return iFollowService.unFollow(userDetails.getUsername(), userName);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
}
