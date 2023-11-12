package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.service.IChapterImageService;
import vn.hcmute.tlcn.service.IStorageService;
import vn.hcmute.tlcn.service.IUserService;
import vn.hcmute.tlcn.serviceimple.ImageStorageService;
import vn.hcmute.tlcn.serviceimple.UserServiceImple;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "api/v1/file-upload")
public class FileUploadController {
    @Autowired
    private IChapterImageService chapterImageService;
    @Autowired
    private ImageStorageService storageService;
    @Autowired
    IUserService userService;

    @PostMapping("/chapters")
    public ResponseEntity<ResponseObject>uploadImageForChapter(@RequestParam("username") String username,
                                                    @RequestParam("password") String password,
                                                    @RequestParam("chapterId")String chapterId,
                                                    @RequestParam("file")MultipartFile file){
       return chapterImageService.addImageChapter(username,password,chapterId,file);
    }
    @PostMapping("/users")
    public ResponseEntity<ResponseObject>uploadAvatar(@RequestParam("username") String username,
                                                               @RequestParam("password") String password,
                                                               @RequestParam("file")MultipartFile file){
        return userService.uploadAvatar(username,password,file);
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
