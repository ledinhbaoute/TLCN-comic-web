package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import vn.hcmute.tlcn.PrimaryKey.ResponseObject;
import vn.hcmute.tlcn.model.ChapterImageDTO;
import vn.hcmute.tlcn.service.IChapterImageService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class ChapterImageController {
    @Autowired
    private IChapterImageService imageService;

    @GetMapping("chapter_images")
    public ResponseEntity<ResponseObject> getImagesByChapter(@RequestParam String chapterId) {
        try {
            List<ChapterImageDTO> chapterImageDTOS = imageService.getImagesByChapter(chapterId);
            int size = chapterImageDTOS.size();
            if (size > 0) return ResponseEntity.ok().body(new ResponseObject(true, "Query Success!", chapterImageDTOS));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false, "ChapterImage not found!", ""));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, e.getMessage(), ""));
        }

    }

    @GetMapping("/chapter_images/{chapterId}")
    public ResponseEntity<ResponseObject> getImagesDetailByChapter(@PathVariable String chapterId) {
        List<ChapterImageDTO> chapterImageDTOS = imageService.getImagesByChapter(chapterId);
        List<ChapterImageDTO> chapterImageDTOS1 = new ArrayList<>();
        try {
            for (ChapterImageDTO cDTO : chapterImageDTOS
            ) {
                String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                        "readDetailFile", cDTO.getLink()).build().toUri().toString();
                cDTO.setLink(urlPath);
                chapterImageDTOS1.add(cDTO);
            }
            return ResponseEntity.ok().body(new ResponseObject(true, "Get Image Detail for Chapter Success!", chapterImageDTOS1));

        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false, exception.getMessage(), ""));
        }

    }

    @DeleteMapping("/user/chapter_images")
    public ResponseEntity<?> deleteChapterImg(Authentication authentication, @RequestParam("fileName") String fileName) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            try {
                int check = imageService.deleteChapterImg(userDetails.getUsername(), fileName);
                if (check == 0)
                    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Chapter Image not exist!", ""));
                else if (check == 1)
                    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "You cannot delete someone else's Chapter Image !", ""));
                return ResponseEntity.ok(new ResponseObject(true, "Delete Chapter Image Success!", ""));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false, e.getMessage(), ""));
            }
        }
        return ResponseEntity.status(401).body("Unauthenticated!");
    }
}