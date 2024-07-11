package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.BookMark;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark,Integer> {
    BookMark findOneByUser_UserNameAndChapter_Id(String username,String chapterId);
}
