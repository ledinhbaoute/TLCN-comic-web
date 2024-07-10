package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ChapterImageDTO;

import java.util.List;

public interface IChapterImageService {
    ResponseObject getImagesByChapter(String username,String chapterId);
    ResponseEntity<ResponseObject> addImageChapter(String username, String chapterId, MultipartFile file);
//    public byte[] readFileContent(String fileName);
    int deleteChapterImg(String username,String fileName);
//    ResponseEntity<?> changeOrderImageList(String username, String chapterId,List<ChapterImageDTO>newOrderList);
    ResponseEntity<?> changeOrderImageList(String username, String chapterId,List<MultipartFile>newOrderList,boolean isAccept);

}
