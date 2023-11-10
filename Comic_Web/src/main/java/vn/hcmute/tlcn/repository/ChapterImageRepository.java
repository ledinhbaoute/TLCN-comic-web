package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.hcmute.tlcn.entity.ChapterImage;

import java.util.List;

public interface ChapterImageRepository extends JpaRepository<ChapterImage,Integer> {
    List<ChapterImage>findByChapter_Id(String chapterId);
}
