package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.ChapterDTO;
import vn.hcmute.tlcn.service.IChapterService;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/chapters")
public class ChapterController {

    @Autowired
    private IChapterService chapterServiceImple;

    @GetMapping("/{comicId}")
    ResponseEntity<ResponseObject>getChapterByComic(@PathVariable String comicId){
        List<ChapterDTO>chapterList=chapterServiceImple.getChapterByComic(comicId);
        if (!chapterList.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Query Successful!",chapterList));

        }
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false,"Cannot find Chapters with comicId "+comicId,""));
    }

    @PostMapping("")
    ResponseEntity<ResponseObject>addChapter(@RequestParam("username")String username,@RequestParam("password") String password,
                                             @RequestParam("comicId")String comicId,@RequestParam("chapterName")String chapterName
                                             ){
        try {
            return chapterServiceImple.addChapter(username,password,chapterName,comicId);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,e.getMessage(),""));
        }
    }


    @PutMapping("")
    ResponseEntity<ResponseObject>updateChapter(@RequestParam("username")String username,@RequestParam("password") String password,
                                                @RequestParam("chapterId")String chapterId,@RequestParam("newChapterName")String chapterName,
                                                @RequestParam("newOrdinalNumber")int newOrdinalNumber){
        try {
            return chapterServiceImple.updateChapter(username,password,chapterId,chapterName,newOrdinalNumber);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,e.getMessage(),""));
        }
    }

    @DeleteMapping("")
    ResponseEntity<ResponseObject>deleteChapter(@RequestParam("username")String username,@RequestParam("password") String password,
                                                @RequestParam("chapterId")String chapterId){
        try {
            int check=chapterServiceImple.deleteChapter(chapterId,username,password);
            if(check==0)
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"User not exist!",""));
            if(check==1) return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Chapter not exist!",""));
            if(check==2) return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"You cann't delete chapter in someone else's comic!",""));
            return ResponseEntity.ok().body(new ResponseObject(true,"Delete Succes!",""));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,e.getMessage(),""));
        }

    }

}
