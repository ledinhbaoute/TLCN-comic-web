package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.CommentDTO;
import vn.hcmute.tlcn.service.ICommentService;

import java.util.List;

@RestController
@RequestMapping("api/v1/comments")
public class CommentController {
    @Autowired
    private ICommentService iCommentService;
    @PostMapping("")
    ResponseEntity<ResponseObject>addComment(@RequestParam("username")String username,@RequestParam("password")String password,
                                             @RequestParam("chapterId")String chapterId,@RequestParam("content")String content){
        return iCommentService.addComment(username, password, chapterId, content);
    }
    @GetMapping("")
    ResponseEntity<ResponseObject>getCommentByChapter(@RequestParam("chapterId")String chapterId){
        List<CommentDTO>commentDTOS=iCommentService.getCommentByChapter(chapterId);
        return ResponseEntity.ok(new ResponseObject(true,"Query Success",commentDTOS));
    }
}
