package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.ChapterImageDTO;
import vn.hcmute.tlcn.service.IChapterImageService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chapter_images")
public class ChapterImageController {
    @Autowired
    private IChapterImageService imageService;
    @GetMapping("")
    public ResponseEntity<ResponseObject>getImageByChapter(@RequestParam String chapterId){
        try {
            List<ChapterImageDTO>chapterImageDTOS=imageService.getImagesByChapter(chapterId);
            int size=chapterImageDTOS.size();
            if(size>0) return ResponseEntity.ok().body(new ResponseObject(true,"Query Success!",chapterImageDTOS));
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"ChapterImage not found!",""));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,e.getMessage(),""));
        }

    }
}
