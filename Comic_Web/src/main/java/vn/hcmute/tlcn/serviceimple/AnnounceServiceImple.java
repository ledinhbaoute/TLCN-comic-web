package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.hcmute.tlcn.entity.Announce;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.repository.AnnounceRepository;
import vn.hcmute.tlcn.repository.UserRepository;

import java.util.List;

@Service
public class AnnounceServiceImple {
    @Autowired
    AnnounceRepository announceRepository;
    @Autowired
    UserRepository userRepository;

    public List<Announce> getAnnounceByUser(String username){
        return announceRepository.findByUser_UserNameOrderByCreatedAtDesc(username);
    }
    @Transactional
    public void markAllAsRead(String username){
        List<Announce>announces=announceRepository.findByUser_UserNameOrderByCreatedAtDesc(username);
        announces.forEach(announce -> announce.setRead(true));
        announceRepository.saveAll(announces);
    }
    @Transactional
    public ResponseEntity markAsRead(String username, String announceId){
        Announce announce=announceRepository.findById(announceId).orElse(null);
        User user=userRepository.findOneByUserName(username).orElse(null);
        if (announce==null){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Thông báo không tồn tại",null));
        }
        if(!announce.getUser().getUserName().equals(user.getUserName()))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body( new ResponseObject(false,"Không thể đánh dấu thông báo của người khác",null));
        announce.setRead(true);
        return ResponseEntity.ok().body( new ResponseObject(true,"Success!",announceRepository.save(announce)));
    }
}
