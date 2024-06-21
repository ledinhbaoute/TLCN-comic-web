package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.primarykey.FavoriteComicKey;
import vn.hcmute.tlcn.entity.FavoriteComic;

import java.util.List;

@Repository
public interface FavoriteComicRepository extends JpaRepository<FavoriteComic, FavoriteComicKey> {
    List<FavoriteComic>findByUser_UserName(String username);
    List<FavoriteComic>findByComicBook_Id(String comicId);
}
