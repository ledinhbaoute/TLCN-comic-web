package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.hcmute.tlcn.entity.User;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findOneByUserNameAndPassword(String username,String password);
    Optional<User> findOneByUserName(String username);

}
