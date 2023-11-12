package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.ChapterImageDTO;
import vn.hcmute.tlcn.service.IChapterImageService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/chapter_images")
public class ChapterImageController {
    @Autowired
    private IChapterImageService imageService;
    @GetMapping("")
    public ResponseEntity<ResponseObject>getImagesByChapter(@RequestParam String chapterId){
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

    @GetMapping("/{chapterId}")
    public ResponseEntity<ResponseObject>getImagesDetailByChapter(@PathVariable String chapterId){
        List<ChapterImageDTO>chapterImageDTOS=imageService.getImagesByChapter(chapterId);
        List<ChapterImageDTO>chapterImageDTOS1=new ArrayList<>();
        try {
            for (ChapterImageDTO cDTO:chapterImageDTOS
            ) {
                String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "readDetailFile", cDTO.getLink()).build().toUri().toString();
                cDTO.setLink(urlPath);
                chapterImageDTOS1.add(cDTO);
            }
            return ResponseEntity.ok().body(new ResponseObject(true,"Get Image Detail for Chapter Success!",chapterImageDTOS1));

        }
        catch (Exception exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,exception.getMessage(),""));
        }

    }
    @DeleteMapping("")
    public ResponseEntity<ResponseObject>deleteChapterImg(@RequestParam ("fileName")String fileName){
        try {
            imageService.deleteChapterImg(fileName);
            return ResponseEntity.ok(new ResponseObject(true,"Delete Chapter Image Success!",""));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,e.getMessage(),""));
        }
    }
}
