package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.UserPremium;

import java.util.Optional;

@Repository
public interface UserPremiumRepo extends JpaRepository<UserPremium, Integer> {
    Optional<UserPremium> findOneByUser_UserName(String username);
}
