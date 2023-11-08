package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre,String> {


}
