package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.RatingDTO;

import java.util.List;

public interface IRatingService {
    ResponseEntity<ResponseObject>addRating(String username,String ComicId,int score,String comment);
    List<RatingDTO>getRatingByComic(String comicId);
}
