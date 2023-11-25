package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.hcmute.tlcn.PrimaryKey.FollowKey;
import vn.hcmute.tlcn.entity.Follower;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follower, FollowKey> {
    List<Follower>findByUser_UserName(String userName);

}