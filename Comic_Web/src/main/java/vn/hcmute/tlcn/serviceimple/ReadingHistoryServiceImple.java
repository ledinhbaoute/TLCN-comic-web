package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.entity.ReadingHistory;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.primarykey.ReadingHistoryKey;
import vn.hcmute.tlcn.repository.ChapterRepository;
import vn.hcmute.tlcn.repository.ReadingHistoryRepo;
import vn.hcmute.tlcn.repository.UserRepository;

import java.util.Date;
import java.util.List;

@Service
public class ReadingHistoryServiceImple {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ChapterRepository chapterRepository;
    @Autowired
    ReadingHistoryRepo readingHistoryRepo;
    public void addHistory(String username, String chapterId){
        Chapter chapter=chapterRepository.findById(chapterId).orElse(null);
        if(chapter==null)
            return ;
        User user=userRepository.findOneByUserName(username).get();
        ReadingHistoryKey key=new ReadingHistoryKey(user.getId(),chapter.getId());
        ReadingHistory readingHistory=readingHistoryRepo.findById(key).orElse(null);
        if(readingHistory!=null){
            readingHistory.setReadingTime(new Date());
            readingHistoryRepo.save(readingHistory);
        }
        else
            readingHistoryRepo.save(new ReadingHistory(user,chapter,new Date()));
    }
    public List<ReadingHistory>getReadingHistoryByUser(String username){
        List<ReadingHistory>historyList=readingHistoryRepo.findByUser_UserNameOrderByReadingTimeDesc(username);
        return historyList;
    }
    public void deleteHistory(String username,String chapterId){
        User user=userRepository.findOneByUserName(username).orElse(null);
        ReadingHistoryKey readingHistoryKey=new ReadingHistoryKey(user.getId(),chapterId);
        readingHistoryRepo.deleteById(readingHistoryKey);
    }

}
