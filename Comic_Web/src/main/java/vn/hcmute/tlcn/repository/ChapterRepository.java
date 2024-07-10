package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.Chapter;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter,String> {
    List<Chapter>findByComicBook_IdOrderByOrdinalNumberAsc(String comicId);
    List<Chapter>findByIsAccepted(boolean isAccepted);


}
