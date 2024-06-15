package vn.hcmute.tlcn.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.HistoryIncreaseView;
import java.util.Date;
import java.util.List;

@Repository
public interface HistoryIncreaseViewRepo extends JpaRepository<HistoryIncreaseView, Integer> {
    @Query("SELECT h.comicBook, COUNT(h) AS viewCount FROM HistoryIncreaseView h WHERE h.increaseDate between :startDate and :endDate GROUP BY h.comicBook ORDER BY viewCount DESC")
    Page<ComicBook> getTrending(Date startDate, Date endDate, PageRequest pageRequest);

    @Query("SELECT h.comicBook, COUNT(h) AS viewCount FROM HistoryIncreaseView h WHERE h.increaseDate between :startDate and :endDate GROUP BY h.comicBook ORDER BY viewCount DESC")
    List<Object[]> getTrending2(Date startDate, Date endDate);

    @Modifying
    @Query(value = "delete from history_increase_view where date_increase <= curdate()-interval 1 week and id>0 ",nativeQuery = true)
    void deleteOldRecord(Date date);
}
