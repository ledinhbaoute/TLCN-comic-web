package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ChapterDTO;

import java.util.List;

public interface IChapterService {
    List<ChapterDTO> getChapterAcceptedByComic(String comicId);
    List<ChapterDTO> getAllChapterNotAccepted();
    List<ChapterDTO> getAllChapterByComic(String comicId);

    ResponseEntity<ResponseObject> addChapter(String username, String chapterName, String comicId);
    int deleteChapter(String chapterId,String username);
    ResponseEntity<ResponseObject> adminDeleteChapter(String username, String chapterId);
    List<ChapterDTO> getChaptersByChapter(String chapterId);
    ResponseEntity<ResponseObject> updateChapter(String username,String chapterId,String newChapterName,int newOrdinalNumber);
    ResponseObject publicChapter(String username,String chapterId);
    ResponseEntity<ResponseObject> addChapterNotAccepted(String username, String chapterName, String comicId) ;
    ResponseEntity<ResponseObject> acceptChapter(String username, String chapterId);
}
