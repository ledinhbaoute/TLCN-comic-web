package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.RatingDTO;
import vn.hcmute.tlcn.service.IRatingService;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class RatingController {
    @Autowired
    IRatingService iRatingService;

    @PostMapping("/user/ratings")
    ResponseEntity<?> addRating(Authentication authentication,
                                             @RequestParam("score") int score, @RequestParam("comment") String comment,
                                             @RequestParam("comicId") String comicId) {
        if (authentication != null) {
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return iRatingService.addRating(userDetails.getUsername(), comicId, score, comment);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @GetMapping("/ratings")
    ResponseEntity<ResponseObject> getRatingByComic(@RequestParam("comicId") String comicId) {
        List<RatingDTO> ratingDTOS = iRatingService.getRatingByComic(comicId);
        if (ratingDTOS.isEmpty())
            return ResponseEntity.ok(new ResponseObject(false, "Don't have any rating!", ""));
        return ResponseEntity.ok(new ResponseObject(true, "Query Success", ratingDTOS));
    }
}
