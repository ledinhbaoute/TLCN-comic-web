package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.Admin;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer> {
    Optional<Admin> findByUserNameAndPassword(String admin_username,String password);
    Optional<Admin>findOneByUserName(String admin_username);
}
