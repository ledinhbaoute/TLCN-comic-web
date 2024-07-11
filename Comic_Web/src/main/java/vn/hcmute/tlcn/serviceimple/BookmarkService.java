package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.BookMark;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.repository.BookMarkRepository;
import vn.hcmute.tlcn.repository.ChapterRepository;
import vn.hcmute.tlcn.repository.UserRepository;

@Service
public class BookmarkService {
    @Autowired
    BookMarkRepository bookMarkRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ChapterRepository chapterRepository;
    public ResponseObject addBookMark(String username, String chapterId, int currentPage){
        User user=userRepository.findOneByUserName(username).orElse(null);
        Chapter chapter=chapterRepository.findById(chapterId).orElse(null);
        if(user==null)
            return new ResponseObject(false,"Người dùng không tồn tại","");
        if(chapter==null)
            return new ResponseObject(false,"Chương truyện không tồn tại","");
        BookMark bookMark=bookMarkRepository.findOneByUser_UserNameAndChapter_Id(username,chapterId);
        if(bookMark==null){
            bookMark=new BookMark();
            bookMark.setChapter(chapter);
            bookMark.setUser(user);
        }
        bookMark.setCurrentPage(currentPage);
        return new ResponseObject(true,"Thêm bookmark thành công",bookMarkRepository.save(bookMark));
    }
    public ResponseObject getBookMark(String username,String chapterId){
        User user=userRepository.findOneByUserName(username).orElse(null);
        Chapter chapter=chapterRepository.findById(chapterId).orElse(null);
        if(user==null)
            return new ResponseObject(false,"Người dùng không tồn tại","");
        if(chapter==null)
            return new ResponseObject(false,"Chương truyện không tồn tại","");
        BookMark bookMark=bookMarkRepository.findOneByUser_UserNameAndChapter_Id(username,chapterId);
        return new ResponseObject(true,"Thành công!",bookMark);
    }
}
