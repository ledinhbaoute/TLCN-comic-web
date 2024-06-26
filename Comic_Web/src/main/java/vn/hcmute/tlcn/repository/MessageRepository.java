package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Integer> {
    List<Message> findBySender_UserNameAndReceiver_UserName(String sender, String receiver);
    List<Message> findByReceiver_UserNameAndSender_UserName(String sender, String receiver);
    List<Message> findBySender_UserNameOrReceiver_UserName(String sender, String receiver);
}
