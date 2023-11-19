package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import vn.hcmute.tlcn.entity.Follower;
import vn.hcmute.tlcn.entity.ResponseObject;

import java.util.List;

public interface IFollowService {
    ResponseEntity<ResponseObject>addFollow(String followerUserName,String userName);
    ResponseEntity<ResponseObject> unFollow(String followerUserName,String userName);
    List<Follower> getFollwers_User(String username);
}
