package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.FavoriteComicDTO;

import java.util.List;

public interface IFavoriteComicService {
    ResponseEntity<ResponseObject> addFavoriteComic(String username,  String comicId);
    ResponseEntity<ResponseObject> removeFavoriteComic(String username,String comicId);
    List<FavoriteComicDTO>getFavoriteComicByUser(String username);
    boolean isFavorite(String userId,String comicId);
}
