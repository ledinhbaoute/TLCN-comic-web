package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.hcmute.tlcn.entity.ComicBook;

import java.util.List;

public interface ComicBookRepository extends JpaRepository<ComicBook,String> {
    List<ComicBook>findByGenres_Id(String genreId);
    List<ComicBook>findByActor_Id(String userId);
}
