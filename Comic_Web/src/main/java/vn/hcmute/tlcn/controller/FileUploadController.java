package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.service.IChapterImageService;
import vn.hcmute.tlcn.service.IUserService;
import vn.hcmute.tlcn.serviceimple.ImageStorageService;

@Controller
@RequestMapping(path = "api/v1")
public class FileUploadController {
    @Autowired
    private IChapterImageService chapterImageService;
    @Autowired
    private ImageStorageService storageService;
    @Autowired
    IUserService userService;

    @PostMapping("/user/chapterimg-upload")
    public ResponseEntity<?> uploadImageForChapter(Authentication authentication,
                                                                @RequestParam("chapterId") String chapterId,
                                                                @RequestParam("file") MultipartFile file) {
        if (authentication != null) {
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return chapterImageService.addImageChapter(userDetails.getUsername(), chapterId, file);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @PostMapping("/user/avt-upload")
    public ResponseEntity<?> uploadAvatar(Authentication authentication,
                                                       @RequestParam("file") MultipartFile file) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return userService.uploadAvatar(userDetails.getUsername(), file);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
        try {
            byte[] bytes = storageService.readFileContent(fileName);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(bytes);
        } catch (Exception exception) {
            return ResponseEntity.noContent().build();
        }
    }


}
