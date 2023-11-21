package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.PrimaryKey.FollowKey;
import vn.hcmute.tlcn.entity.Follower;
import vn.hcmute.tlcn.PrimaryKey.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.repository.FollowRepository;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.service.IFollowService;

import java.util.List;
import java.util.Optional;
@Service
public class FollowServiceImple implements IFollowService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    FollowRepository followRepository;
    @Override
    public ResponseEntity<ResponseObject> addFollow(String followerUserName, String userName) {
        Optional<User>optionalFollower=userRepository.findOneByUserName(followerUserName);

        Optional<User>userOptional=userRepository.findOneByUserName(userName);
        if(!userOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"User Account not exist!",""));

        User userFollower=optionalFollower.get();
        User user=userOptional.get();
        if(userFollower.getUserName().equals(user.getUserName()))
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Cannot follower yourseft! ",""));
        Follower follower=new Follower(userFollower,user);
        followRepository.save(follower);
        return ResponseEntity.ok(new ResponseObject(false,"Add Follower Success!",follower));
    }

    @Override
    public ResponseEntity<ResponseObject> unFollow(String followerUserName,  String userName) {
        Optional<User>optionalFollower=userRepository.findOneByUserName(followerUserName);

        Optional<User>userOptional=userRepository.findOneByUserName(userName);
        if(!userOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"User Account not exist!",""));

        User userFollower=optionalFollower.get();
        User user=userOptional.get();
        FollowKey followKey=new FollowKey(userFollower,user);
        try {
            Optional<Follower>optional=followRepository.findById(followKey);
            if(!optional.isPresent())
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"You are not follow this user!",""));
            followRepository.deleteById(followKey);
            return ResponseEntity.ok(new ResponseObject(true,"Delete Success!",""));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,e.getMessage(),""));
        }


    }

    @Override
    public List<Follower> getFollwers_User(String username) {
        return followRepository.findByUser_UserName(username);

    }
}
