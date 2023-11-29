package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.hcmute.tlcn.entity.ChapterImage;

import java.util.List;
import java.util.Optional;

public interface ChapterImageRepository extends JpaRepository<ChapterImage,Integer> {
    List<ChapterImage>findByChapter_IdOrderByOrdinalNumberAsc(String chapterId);
    Optional<ChapterImage>findOneByLink(String fileName);
    List<ChapterImage>findAllByChapter_ComicBook_Id(String comicId);
}
