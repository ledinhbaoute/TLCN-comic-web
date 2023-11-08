package vn.hcmute.tlcn.service;

import vn.hcmute.tlcn.model.ComicBookDTO;

import java.util.List;

public interface IComicBookService {
    List<ComicBookDTO> getAllComic();
    List<ComicBookDTO> getComicByGenre(String genreId);
    ComicBookDTO getDetailComic(String comicId);
    List<ComicBookDTO> getComicByActor(String actorId);

    ComicBookDTO addComic(ComicBookDTO comicBookDTO);
}
