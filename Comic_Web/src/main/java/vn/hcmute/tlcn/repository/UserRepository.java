package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.hcmute.tlcn.entity.User;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findOneByUserNameAndPassword(String username,String password);
    Optional<User> findOneByUserName(String username);

    @Query("SELECT t FROM User t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%', :input, '%'))")
    List<User> searchByInput(String input);
}
