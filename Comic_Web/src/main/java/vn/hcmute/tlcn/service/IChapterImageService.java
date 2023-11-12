package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.ChapterImageDTO;

import java.util.List;

public interface IChapterImageService {
    List<ChapterImageDTO>getImagesByChapter(String chapterId);
    ResponseEntity<ResponseObject> addImageChapter(String username, String password, String chapterId, MultipartFile file);
//    public byte[] readFileContent(String fileName);
    void deleteChapterImg(String fileName);
}
