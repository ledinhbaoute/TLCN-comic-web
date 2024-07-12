package vn.hcmute.tlcn.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ComicBookDTO;

import java.io.IOException;
import java.util.List;

public interface IComicBookService {
    List<ComicBookDTO> getAllComic();
    List<ComicBookDTO> getComicByGenre(String genreId);
    ComicBookDTO getDetailComic(String comicId);
    List<ComicBookDTO> getComicByActor(String actorId);
    ResponseObject updateCoverImage(String username,String comicId,MultipartFile file);

    ComicBookDTO addComic(String name,String username,List<String> genres,String discription, MultipartFile file) throws IOException;
    ResponseObject updateComic(String username,String comicId,String newName,List<String> genres,int newStatus,String newDescription);
    int deleteComic(String username,String comicId);
    List<ComicBookDTO>searchComicByInput(String input);
    ResponseObject upgradePremium(String username,String comicId);
    void increaseView(String comicId);
    Page<ComicBookDTO>getComicTrendingByWeek(int indexPage);
    List<ComicBookDTO>getComicTopView();
    Page<ComicBookDTO> getAllComicPagination(int indexPage,String sortBy);
    Page<ComicBookDTO> getComicByGenrePagination(String genreId,int indexPage,String sortBy);
    Page<ComicBookDTO>getBookOrderByUpdateDate(int indexPage);
    ResponseObject adminDeleteComic(String comicId);
    List<ComicBookDTO>filterSearchComic(List<String> includeGenres, List<String> excludeGenres, int status,int numberChapter);
}
