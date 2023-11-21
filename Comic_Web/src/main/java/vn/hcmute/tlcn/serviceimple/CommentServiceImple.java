package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.entity.Comment;
import vn.hcmute.tlcn.PrimaryKey.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.CommentDTO;
import vn.hcmute.tlcn.repository.ChapterRepository;
import vn.hcmute.tlcn.repository.CommentRepository;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.service.ICommentService;
import vn.hcmute.tlcn.utils.Converter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImple implements ICommentService {
    @Autowired
    private Converter converter;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChapterRepository chapterRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Override
    public ResponseEntity<ResponseObject> addComment(String username, String chapterId, String content) {
        Optional<User>optionalUser=userRepository.findOneByUserName(username);

        Optional<Chapter>optionalChapter=chapterRepository.findById(chapterId);
        if(!optionalChapter.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Chapter not exist!",""));
        User user=optionalUser.get();
        Chapter chapter=optionalChapter.get();
        Comment comment=new Comment(user,chapter,new Date(),content);
        CommentDTO commentDTO=converter.convertEntityToDto(commentRepository.save(comment));
        return ResponseEntity.ok(new ResponseObject(true,"Comment Success!",commentDTO));
    }

    @Override
    public List<CommentDTO> getCommentByChapter(String chapterId) {
        List<Comment>comments=commentRepository.findByChapter_IdOrderByCreateAtDesc(chapterId);
        List<CommentDTO>commentDTOS=new ArrayList<>();
        for (Comment comment:comments
             ) {
            CommentDTO commentDTO=converter.convertEntityToDto(comment);
            commentDTOS.add(commentDTO);
        }
        return commentDTOS;
    }
}
