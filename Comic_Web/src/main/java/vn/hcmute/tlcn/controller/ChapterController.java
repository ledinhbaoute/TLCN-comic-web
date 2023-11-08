package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.ChapterDTO;
import vn.hcmute.tlcn.repository.ChapterRepository;
import vn.hcmute.tlcn.service.IChapterService;
import vn.hcmute.tlcn.serviceimple.ChapterServiceImple;

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
}
