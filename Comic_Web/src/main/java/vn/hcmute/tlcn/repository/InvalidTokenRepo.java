package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.InvalidToken;

@Repository
public interface InvalidTokenRepo extends JpaRepository<InvalidToken,String> {

}
