package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.serviceimple.BookmarkService;

@RestController
@RequestMapping("/api/v1")
public class BookmarkController {
    @Autowired
    BookmarkService bookmarkService;

    @GetMapping("/user/bookmark")
    public ResponseEntity<?>getBookMark(Authentication authentication, @RequestParam String chapterId){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(bookmarkService.getBookMark(userDetails.getUsername(),chapterId));
    }
    @PostMapping("/user/bookmark")
    public ResponseEntity<?>addOrUpdateBookMark(Authentication authentication,@RequestParam String chapterId,@RequestParam int currentPage){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(bookmarkService.addBookMark(userDetails.getUsername(),chapterId,currentPage));
    }
}
