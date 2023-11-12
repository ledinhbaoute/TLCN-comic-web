package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.Comment;

import java.util.List;
@Repository
public interface CommentRepository extends JpaRepository<Comment,Integer> {
    List<Comment>findByChapter_IdOrderByCreateAtDesc(String chapterId);
}
