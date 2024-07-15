package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.FavoriteComicDTO;
import vn.hcmute.tlcn.service.IFavoriteComicService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class FavoriteComicController {
    @Autowired
    private IFavoriteComicService favoriteComicService;

    @GetMapping("user/favorite-comic")
    ResponseEntity<?> getFavoriteComicByUser(Authentication authentication) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            List<FavoriteComicDTO> favoriteComicDTOS = favoriteComicService.getFavoriteComicByUser(userDetails.getUsername());
            if (favoriteComicDTOS != null)
                return ResponseEntity.ok(new ResponseObject(true, "Query success!", favoriteComicDTOS));
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Favorite book is empty!", ""));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @PostMapping("user/favorite-comic")
    ResponseEntity<?> addFavoriteComic(Authentication authentication,
                                       @RequestParam("comicId") String comicId) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return favoriteComicService.addFavoriteComic(userDetails.getUsername(), comicId);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @DeleteMapping("user/favorite-comic")
    ResponseEntity<?> removeFavoriteComic(Authentication authentication,
                                          @RequestParam("comicId") String comicId) {

        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return favoriteComicService.removeFavoriteComic(userDetails.getUsername(), comicId);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @GetMapping("/isFavorite")
    boolean isFavorite(@RequestParam String userId,@RequestParam String comicId){
        return favoriteComicService.isFavorite(userId,comicId);
    }

}
