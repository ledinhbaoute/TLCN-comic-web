package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.CommentDTO;

import java.util.List;

public interface ICommentService {
    ResponseEntity<ResponseObject> addComment(String username, String password, String chapterId, String content);
    List<CommentDTO> getCommentByChapter(String chapterId);
}
