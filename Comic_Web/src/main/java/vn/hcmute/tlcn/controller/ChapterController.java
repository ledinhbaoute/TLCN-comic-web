package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ChapterDTO;
import vn.hcmute.tlcn.service.IChapterService;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1")
public class ChapterController {

    @Autowired
    private IChapterService chapterServiceImple;

    @GetMapping("chapters/{comicId}")
    ResponseEntity<ResponseObject> getChapterAcceptedByComic(@PathVariable String comicId) {
        List<ChapterDTO> chapterList = chapterServiceImple.getChapterAcceptedByComic(comicId);
        if (!chapterList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Query Successful!", chapterList));

        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false, "Cannot find Chapters with comicId " + comicId, ""));
    }
    @GetMapping({"user/chapters/{comicId}", "admin/chapters/{comicId}"})
    ResponseEntity<ResponseObject> getAllChapterByComic(@PathVariable String comicId) {
        List<ChapterDTO> chapterList = chapterServiceImple.getAllChapterByComic(comicId);
        if (!chapterList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Query Successful!", chapterList));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false, "Cannot find Chapters with comicId " + comicId, ""));
        }
    }
    @GetMapping( "admin/chaptersNotAccept")
    ResponseEntity<ResponseObject> getAllChapterNotAccept(Authentication authentication) {
        List<ChapterDTO> chapterList = chapterServiceImple.getAllChapterNotAccepted();
        if (!chapterList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Query Successful!", chapterList));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false, "Don't have chapter not accepted! " , ""));
        }
    }
    @GetMapping("chaptersByChapter/{chapterId}")
    ResponseEntity<ResponseObject> getChaptersByChapter(@PathVariable String chapterId) {
        List<ChapterDTO> chapterList = chapterServiceImple.getChaptersByChapter(chapterId);
        if (!chapterList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Query Successful!", chapterList));

        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false, "Cannot find Chapters with chapterId " + chapterId, ""));
    }

    @PostMapping("/user/chapters")
    ResponseEntity<?> addChapter(@RequestParam("comicId") String comicId,
                                 @RequestParam("chapterName") String chapterName,
                                 Authentication authentication
    ) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            try {
                return chapterServiceImple.addChapter(userDetails.getUsername(), chapterName, comicId);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false, e.getMessage(), ""));
            }
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @PostMapping("/user/addChapterNotAccept")
    ResponseEntity<?> addChapterNotAccept(@RequestParam("comicId") String comicId,
                                 @RequestParam("chapterName") String chapterName,
                                 Authentication authentication
    ) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            try {
                return chapterServiceImple.addChapterNotAccepted(userDetails.getUsername(), chapterName, comicId);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false, e.getMessage(), ""));
            }
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @PostMapping("/admin/accept_chapter")
    ResponseEntity<?> acceptChapter(@RequestParam("chapterId") String chapterId,
                                 Authentication authentication) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            try {
                return chapterServiceImple.acceptChapter(userDetails.getUsername(), chapterId);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false, e.getMessage(), ""));
            }
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @PutMapping("/user/chapters")
    ResponseEntity<?> updateChapter(Authentication authentication,
                                    @RequestParam("chapterId") String chapterId, @RequestParam("newChapterName") String chapterName,
                                    @RequestParam("newOrdinalNumber") int newOrdinalNumber) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            try {
                return chapterServiceImple.updateChapter(userDetails.getUsername(), chapterId, chapterName, newOrdinalNumber);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false, e.getMessage(), ""));
            }
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @DeleteMapping("/user/chapters")
    ResponseEntity<?> deleteChapter(Authentication authentication,
                                                 @RequestParam("chapterId") String chapterId) {
        if (authentication != null) {
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            try {
                int check = chapterServiceImple.deleteChapter(chapterId, userDetails.getUsername());
                if (check == 0)
                    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Chapter not exist!", ""));
                if (check == 1)
                    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "You can't delete chapter in someone else's comic!", ""));
                return ResponseEntity.ok().body(new ResponseObject(true, "Delete Success!", ""));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false, e.getMessage(), ""));
            }
        } return ResponseEntity.status(401).body("Unauthorized!");
    }
    @PostMapping("user/publicChapter")
    ResponseEntity<?>publicChapter(Authentication authentication, @RequestParam String chapterId){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok().body(chapterServiceImple.publicChapter(userDetails.getUsername(),chapterId));
    }
    @DeleteMapping("admin/rejectChapter")
    ResponseEntity<?>rejectChapter(Authentication authentication, @RequestParam String chapterId){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(chapterServiceImple.adminDeleteChapter(userDetails.getUsername(),chapterId));

    }


}
