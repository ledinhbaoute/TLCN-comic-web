package vn.hcmute.tlcn.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.ComicBook;

import java.util.Date;
import java.util.List;
@Repository
public interface ComicBookRepository extends JpaRepository<ComicBook,String> {
    List<ComicBook>findByGenres_Id(String genreId);
    Page<ComicBook> findByGenres_Id(String genreId, PageRequest pageRequest);

    List<ComicBook>findByActor_Id(String userId);
    List<ComicBook>findByActor_UserName(String username);
    @Query(value = "SELECT t FROM ComicBook t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%', :input, '%'))")
    List<ComicBook>findByInputString(@Param("input")String input);
    List<ComicBook>findTop10ByOrderByViewDesc();
//    List<ComicBook>findTop10ByOrderByUpdateDateDesc();

    @Query("SELECT c FROM ComicBook c WHERE c.updateDate >= :startDate AND c.updateDate <= :endDate ORDER BY c.updateDate DESC")
    Page<ComicBook> findComicsUpdatedWithinOneWeekOrderByUpdateDateDesc(Date startDate, Date endDate,PageRequest pageRequest);


    @Query("SELECT DISTINCT c FROM ComicBook c " +
            "JOIN c.genres g1 " +
            "WHERE g1.id IN :includeGenres " +
            "AND c.id NOT IN (SELECT c2.id FROM ComicBook c2 JOIN c2.genres g2 WHERE g2.id IN :excludeGenres) " +
            "AND c.status = :status " +
            "AND SIZE(c.chapters) >= :numberChapter")
    List<ComicBook> findByGenresAndStatusAndChapters(
            @Param("includeGenres") List<String> includeGenres,
            @Param("excludeGenres") List<String> excludeGenres,
            @Param("status") int status,@Param("numberChapter")int numberChapter);


    @Query("SELECT DISTINCT c FROM ComicBook c " +
            "JOIN c.genres g1 " +
            "WHERE g1.id IN :includeGenres " +
            "AND c.id NOT IN (SELECT c2.id FROM ComicBook c2 JOIN c2.genres g2 WHERE g2.id IN :excludeGenres) " +
            "AND SIZE(c.chapters) >= :numberChapter")
    List<ComicBook> findByGenresAndChapters(
            @Param("includeGenres") List<String> includeGenres,
            @Param("excludeGenres") List<String> excludeGenres,
            @Param("numberChapter")int numberChapter);

}
