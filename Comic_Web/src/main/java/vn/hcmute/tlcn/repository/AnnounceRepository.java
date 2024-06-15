package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.hcmute.tlcn.entity.Announce;

import java.util.List;

public interface AnnounceRepository extends JpaRepository<Announce, String> {
    List<Announce>findByUser_UserNameOrderByCreatedAtDesc(String username);
}
