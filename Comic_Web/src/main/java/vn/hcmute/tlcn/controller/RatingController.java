package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.RatingDTO;
import vn.hcmute.tlcn.service.IRatingService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/ratings")
public class RatingController {
    @Autowired
    IRatingService iRatingService;
    @PostMapping("")
    ResponseEntity<ResponseObject> addRating(@RequestParam("username")String username,@RequestParam("password")String password,
                                             @RequestParam("score")int score,@RequestParam("comment")String comment,
                                             @RequestParam("comicId")String comicId){
        return iRatingService.addRating(username,password,comicId,score,comment);
    }
    @GetMapping("")
    ResponseEntity<ResponseObject>getRatingByComic(@RequestParam("comicId")String comicId){
        List<RatingDTO>ratingDTOS=iRatingService.getRatingByComic(comicId);
        if(ratingDTOS.isEmpty())
            return ResponseEntity.ok(new ResponseObject(false,"Don't have any rating!",""));
        return ResponseEntity.ok(new ResponseObject(true,"Query Success",ratingDTOS));
    }
}
