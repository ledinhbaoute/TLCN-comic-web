package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.Announce;
import vn.hcmute.tlcn.primarykey.FollowKey;
import vn.hcmute.tlcn.entity.Follower;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.repository.AnnounceRepository;
import vn.hcmute.tlcn.repository.FollowRepository;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.service.IFollowService;
import vn.hcmute.tlcn.utils.GenerateId;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
public class FollowServiceImple implements IFollowService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    FollowRepository followRepository;
    @Autowired
    AnnounceRepository announceRepository;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    GenerateId generateId;
    @Override
    public ResponseEntity<ResponseObject> addFollow(String followerUserName, String userName) {
        Optional<User>optionalFollower=userRepository.findOneByUserName(followerUserName);

        Optional<User>userOptional=userRepository.findOneByUserName(userName);
        if(!userOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"User Account not exist!",""));

        User userFollower=optionalFollower.get();
        User user=userOptional.get();
        if(userFollower.getUserName().equals(user.getUserName()))
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Cannot follower yourself! ",""));
        Follower follower=new Follower(userFollower,user);
        followRepository.save(follower);
        String content=followerUserName +" đã theo dõi bạn";
        Announce announce=new Announce();
        announce.setUser(user);
        announce.setContent(content);
        announce.setRead(false);
        announce.setCreatedAt(new Date());
        announce.setType("fl");
        announce.setLinkTo("/user/"+userFollower.getId());
        announce.setId(generateId.generateId());
        try {
            simpMessagingTemplate.convertAndSendToUser(user.getUserName(),"/queue/notifications",announce);
            announceRepository.save(announce);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
        return ResponseEntity.ok(new ResponseObject(true,"Add Follower Success!",follower));
    }

    @Override
    public ResponseEntity<ResponseObject> unFollow(String followerUserName,  String userName) {
        Optional<User>optionalFollower=userRepository.findOneByUserName(followerUserName);

        Optional<User>userOptional=userRepository.findOneByUserName(userName);
        if(!userOptional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"User Account not exist!",""));

        User userFollower=optionalFollower.get();
        User user=userOptional.get();
        FollowKey followKey=new FollowKey(userFollower.getId(),user.getId());
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
    @Override
    public List<Follower> getUsers_Followers(String username) {
        return followRepository.findByFollower_UserName(username);
    }

    @Override
    public boolean isFollow(String username,String followerUserName) {
        boolean f=false;
        List<Follower>followers=getFollwers_User(username);
        for (Follower fl:followers
             ) {
            if(fl.getFollower().getUserName().equals(followerUserName))
            {
                f=true;
                break;
            }
        }
        return f;
    }
}
