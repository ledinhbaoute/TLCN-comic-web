package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.CommentDTO;
import vn.hcmute.tlcn.service.ICommentService;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class CommentController {
    @Autowired
    private ICommentService iCommentService;

    @PostMapping("/user/comments")
    ResponseEntity<?> addComment(Authentication authentication,
                                              @RequestParam("chapterId") String chapterId, @RequestParam("content") String content) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return iCommentService.addComment(userDetails.getUsername(), chapterId, content);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @GetMapping("/comments")
    ResponseEntity<ResponseObject> getCommentByChapter(@RequestParam("chapterId") String chapterId) {
        List<CommentDTO> commentDTOS = iCommentService.getCommentByChapter(chapterId);
        return ResponseEntity.ok(new ResponseObject(true, "Query Success", commentDTOS));
    }
    @DeleteMapping("user/comments")
    ResponseEntity<?>deleteComment(@RequestParam("commentId")int id,Authentication authentication){
    	 if (authentication != null) {
             UserDetails userDetails = (UserDetails) authentication.getPrincipal();
             int check=iCommentService.deleteComment(userDetails.getUsername(), id);
             if(check==0)
            	 return ResponseEntity.ok(new ResponseObject(false,"Comment not exist",""));
             else if(check==1)
            	 return ResponseEntity.ok(new ResponseObject(false,"Cannot delete someone else's comment",""));
             return ResponseEntity.ok(new ResponseObject(true,"Success",""));
         }
         return ResponseEntity.status(401).body("Unauthorized!");
    }
    @DeleteMapping("/admin/comment")
    void adminDeleteComment(@RequestParam int commentId){
        iCommentService.adminDeleteComment(commentId);
    }
}
