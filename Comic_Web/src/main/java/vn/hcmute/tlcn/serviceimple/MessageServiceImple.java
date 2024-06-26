package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.Message;
import vn.hcmute.tlcn.repository.MessageRepository;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageServiceImple {
    @Autowired
    private MessageRepository messageRepository;
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
    public List<Message> getAllMessagesForUser(String userName) {
        return messageRepository.findBySender_UserNameOrReceiver_UserName(userName, userName);
    }
    public Map<String, List<Message>> getAllChatsForUser(String userName) {
        List<Message> messages = getAllMessagesForUser(userName);
        Map<String, List<Message>> chats = new HashMap<>();
        for (Message message : messages) {
            String otherUserName = message.getSender().getUserName().equals(userName) ?
                    message.getReceiver().getUserName() : message.getSender().getUserName();

            chats.putIfAbsent(otherUserName, new ArrayList<>());
            chats.get(otherUserName).add(message);
        }
        List<Map.Entry<String, List<Message>>> chatList = new ArrayList<>(chats.entrySet());

        Comparator<Map.Entry<String, List<Message>>> byLastMessageTime = (entry1, entry2) -> {
            List<Message> messages1 = entry1.getValue();
            List<Message> messages2 = entry2.getValue();
            Message lastMessage1 = messages1.get(messages1.size() - 1);
            Message lastMessage2 = messages2.get(messages2.size() - 1);
            return lastMessage2.getTime().compareTo(lastMessage1.getTime());
        };
        Collections.sort(chatList, byLastMessageTime);
        LinkedHashMap<String, List<Message>> sortedChats = new LinkedHashMap<>();
        for (Map.Entry<String, List<Message>> entry : chatList) {
            sortedChats.put(entry.getKey(), entry.getValue());
        }
        return sortedChats;
    }

    public void markAsRead(String userName,String otherUserName){
        Map<String,List<Message>>chats=getAllChatsForUser(userName);

        List<Message> messages=chats.get(otherUserName);

        if(!messages.isEmpty()){
        messages.forEach(message -> {
            if(message.getReceiver().getUserName().equals(userName)){
                message.setRead(true);
            }
        });
        messageRepository.saveAll(messages);
        }
        else {
            // Xử lý trường hợp không tìm thấy cuộc trò chuyện
            throw new EntityNotFoundException("Conversation not found for user: " + otherUserName);
        }
    }
    public List<Message> getMessagesBetweenUsers(String sender, String receiver) {
        List<Message> messages = messageRepository.findBySender_UserNameAndReceiver_UserName(sender, receiver);
        messages.addAll(messageRepository.findByReceiver_UserNameAndSender_UserName(sender, receiver));
        messages.sort((m1, m2) -> m1.getTime().compareTo(m2.getTime())); // Sort messages by date
        return messages;
    }
}
