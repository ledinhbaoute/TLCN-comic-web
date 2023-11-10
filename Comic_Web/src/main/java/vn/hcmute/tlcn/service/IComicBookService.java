package vn.hcmute.tlcn.service;

import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.ComicBookDTO;

import java.util.List;

public interface IComicBookService {
    List<ComicBookDTO> getAllComic();
    List<ComicBookDTO> getComicByGenre(String genreId);
    ComicBookDTO getDetailComic(String comicId);
    List<ComicBookDTO> getComicByActor(String actorId);

    ComicBookDTO addComic(String name,String username,String password,List<String> genres);
    ResponseObject updateComic(String username, String password, ComicBookDTO comicBookDTO);
    int deleteComic(String comicId);
    int checkUpdateCondition(String username,String password,ComicBookDTO comicBookDTO);
}
