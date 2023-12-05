package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.serviceimple.ReadingHistoryServiceImple;

@RestController
@RequestMapping("api/v1")
public class ReadingHistoryController {
    @Autowired
    ReadingHistoryServiceImple historyService;
    @GetMapping("/user/history_reading")
    public ResponseEntity<?>getList(Authentication authentication){
        if (authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(historyService.getReadingHistoryByUser(userDetails.getUsername()));
        }
        return ResponseEntity.status(401).body("Unauthorized!");

    }
    @PostMapping("/user/history_reading")
    public ResponseEntity<?> getList(Authentication authentication, @RequestParam String chapterId){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            historyService.addHistory(userDetails.getUsername(), chapterId);
            return ResponseEntity.ok().body("");
        }
        return ResponseEntity.status(401).body("Unauthorized!");

    }
    @DeleteMapping("/user/history_reading")
    public ResponseEntity<?>deleteHistoryItem(Authentication authentication,@RequestParam String chapterId){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            historyService.deleteHistory(userDetails.getUsername(), chapterId);
            return ResponseEntity.ok("Success!");
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
}
