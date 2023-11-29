package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.primarykey.RatingKey;
import vn.hcmute.tlcn.entity.Rating;

import java.util.List;

@Repository

public interface RatingRepository extends JpaRepository<Rating, RatingKey> {
    List<Rating>findByComicBook_Id(String comicId);
}
