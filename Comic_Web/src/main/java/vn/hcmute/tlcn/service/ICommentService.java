package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.CommentDTO;

import java.util.List;

public interface ICommentService {
    ResponseEntity<ResponseObject> addComment(String username,  String chapterId, String content);
    List<CommentDTO> getCommentByChapter(String chapterId);
    int deleteComment(String username, int commentId);
    void adminDeleteComment(int commentId);
}
