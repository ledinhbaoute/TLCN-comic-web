package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.ChapterDTO;

import java.util.List;

public interface IChapterService {
    List<ChapterDTO> getChapterByComic(String comicId);
    ResponseEntity<ResponseObject> addChapter(String username, String password, String chapterName, String comicId);
    int deleteChapter(String chapterId,String username,String password);
    ResponseEntity<ResponseObject> updateChapter(String username,String password,String chapterId,String newChapterName,int newOrdinalNumber);
}
