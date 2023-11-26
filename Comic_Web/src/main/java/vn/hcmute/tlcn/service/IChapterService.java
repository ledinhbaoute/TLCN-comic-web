package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ChapterDTO;

import java.util.List;

public interface IChapterService {
    List<ChapterDTO> getChapterByComic(String comicId);
    ResponseEntity<ResponseObject> addChapter(String username, String chapterName, String comicId);
    int deleteChapter(String chapterId,String username);
    ResponseEntity<ResponseObject> updateChapter(String username,String chapterId,String newChapterName,int newOrdinalNumber);
}
