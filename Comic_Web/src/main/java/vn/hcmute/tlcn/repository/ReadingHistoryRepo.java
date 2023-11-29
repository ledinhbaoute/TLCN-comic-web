package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.entity.ReadingHistory;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.primaryKey.ReadingHistoryKey;

import java.util.List;

@Repository
public interface ReadingHistoryRepo extends JpaRepository<ReadingHistory, ReadingHistoryKey> {

    List<ReadingHistory>findByUser_UserNameOrderByReadingTimeDesc(String username);
}
