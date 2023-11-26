package vn.hcmute.tlcn.service;

import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ComicBookDTO;

import java.util.List;

public interface IComicBookService {
    List<ComicBookDTO> getAllComic();
    List<ComicBookDTO> getComicByGenre(String genreId);
    ComicBookDTO getDetailComic(String comicId);
    List<ComicBookDTO> getComicByActor(String actorId);

    ComicBookDTO addComic(String name,String username,List<String> genres,String discription, MultipartFile file);
    ResponseObject updateComic(String username,String comicId,String newName,int newStatus);
    int deleteComic(String username,String comicId);
    List<ComicBookDTO>searchComicByInput(String input);
    public ResponseObject upgradePremium(String username,String comicId);
}
