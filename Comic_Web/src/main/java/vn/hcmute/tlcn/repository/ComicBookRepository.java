package vn.hcmute.tlcn.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.hcmute.tlcn.entity.ComicBook;

import java.util.List;

public interface ComicBookRepository extends JpaRepository<ComicBook,String> {
    List<ComicBook>findByGenres_Id(String genreId);
    Page<ComicBook> findByGenres_Id(String genreId, PageRequest pageRequest);

    List<ComicBook>findByActor_Id(String userId);
    @Query(value = "SELECT t FROM ComicBook t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%', :input, '%'))")
    List<ComicBook>findByInputString(@Param("input")String input);
    List<ComicBook>findTop10ByOrderByViewDesc();
    List<ComicBook>findTop10ByOrderByUpdateDateDesc();
}
