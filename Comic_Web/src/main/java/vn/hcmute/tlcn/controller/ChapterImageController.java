package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ChapterImageDTO;
import vn.hcmute.tlcn.service.IChapterImageService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class ChapterImageController {
    @Autowired
    private IChapterImageService imageService;


    @GetMapping("/chapter_images/{chapterId}")
    public ResponseEntity<ResponseObject> getImagesDetailByChapter(Authentication authentication,@PathVariable String chapterId) {
            if(authentication==null){
                return ResponseEntity.ok( imageService.getImagesByChapter("",chapterId));
            }
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(imageService.getImagesByChapter(userDetails.getUsername(), chapterId));
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
    @PostMapping("/user/changeOrderNumber")
    ResponseEntity<?>changeOrderNumber(Authentication authentication,@RequestParam String chapterId, @RequestParam("newList") List<MultipartFile>newList,@RequestParam boolean isAccept){
       UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return imageService.changeOrderImageList(userDetails.getUsername(),chapterId,newList,isAccept);
    }
}
