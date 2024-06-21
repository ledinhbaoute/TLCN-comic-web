package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.hcmute.tlcn.entity.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.repository.*;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.model.ChapterDTO;
import vn.hcmute.tlcn.service.IChapterService;
import vn.hcmute.tlcn.utils.GenerateId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChapterServiceImple implements IChapterService {

    @Autowired
    private ChapterRepository chapterRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Converter converter;
    @Autowired
    private ComicBookRepository comicBookRepository;
    @Autowired
    GenerateId generateId;
    @Autowired
    ChapterImageServiceImple chapterImageServiceImple;
    @Autowired
    ImageStorageService imageStorageService;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    FavoriteComicRepository favoriteComicRepository;
    @Autowired
    AnnounceRepository announceRepository;

    @Override
    public List<ChapterDTO> getChapterByComic(String comicId) {
        List<ChapterDTO> chapterDTOS = new ArrayList<>();
        List<Chapter> chapters = chapterRepository.findByComicBook_IdOrderByOrdinalNumberAsc(comicId);
        for (Chapter chapter : chapters
        ) {
            chapterDTOS.add(converter.convertEntityToDto(chapter));
        }
        return chapterDTOS;
    }
    @Override
    public List<ChapterDTO> getChaptersByChapter(String chapterId){
        Chapter chapter=chapterRepository.findById(chapterId).orElse(null);
        if (chapter == null) {
            throw new IllegalArgumentException("Chapter not found");
        }
       List<Chapter>chapters=chapterRepository.findByComicBook_IdOrderByOrdinalNumberAsc(chapter.getComicBook_Id().getId());
        return chapters.stream().map(chapter1 -> converter.convertEntityToDto(chapter1)).collect(Collectors.toList());
    }

    public int checkCondition(String username, String comicId) {
        Optional<User> optionalUser = userRepository.findOneByUserName(username);
        Optional<ComicBook> optionalComicBook = comicBookRepository.findById(comicId);
        if (!optionalComicBook.isPresent())
            return 1;
        User user = optionalUser.get();
        ComicBook comicBook = optionalComicBook.get();
        if (!user.getId().equals(comicBook.getActorId().getId()))
            return 2;
        return 3;

    }
    @Transactional
    @Override
    public ResponseEntity<ResponseObject> addChapter(String username, String chapterName, String comicId) {
        int check = checkCondition(username, comicId);
        if (check == 1)
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Comic not exist!", ""));
        if (check == 2)
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "You can't add Chapter into someone else's Comic Book ", ""));
        Optional<ComicBook> optionalComicBook = comicBookRepository.findById(comicId);
        ComicBook comicBook = optionalComicBook.get();
        int ordinalNumber = chapterRepository.findByComicBook_IdOrderByOrdinalNumberAsc(comicId).size() + 1;
        Chapter chapter = new Chapter(generateId.generateId(), chapterName, comicBook, null, ordinalNumber);
        comicBook.setUpdateDate(new Date());
        return ResponseEntity.ok().body(new ResponseObject(true, "Add Chapter Success!",converter.convertEntityToDto( chapterRepository.save(chapter))));
    }

    @Override
    public int deleteChapter(String chapterId, String username) {
        Optional<User> optionalUser = userRepository.findOneByUserName(username);
        Optional<Chapter> optionalChapter = chapterRepository.findById(chapterId);
        if (!optionalChapter.isPresent())
            return 0;
        User user = optionalUser.get();
        Chapter chapter = optionalChapter.get();
        if (!chapter.getComicBook_Id().getActorId().getId().equals(user.getId()))
            return 1;
        List<String>imageList=chapterImageServiceImple.getAllImageByChapter(chapterId);
        chapterRepository.deleteById(chapterId);
//        for (String imageName:imageList
//             ) {
//            imageStorageService.deleteFile(imageName);
//        }

        return 2;
    }

    @Override
    public ResponseEntity<ResponseObject> updateChapter(String username,  String chapterId, String newChapterName, int newOrdinalNumber) {
        Optional<Chapter> optionalChapter = chapterRepository.findById(chapterId);
        if (!optionalChapter.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Chapter not exist!", ""));
        Chapter chapter = optionalChapter.get();
        int check = checkCondition(username, chapter.getComicBook_Id().getId());
        if (check == 0)
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "User not exist!", ""));
        if (check == 2)
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "You can't update someone else's Chapter", ""));
       else
            chapter.setChapterName(newChapterName);
            chapter.setOrdinalNumber(newOrdinalNumber);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Update Success!",chapterRepository.save(chapter)));

    }
    @Override
    public ResponseObject publicChapter(String username,String chapterId){
        User user=userRepository.findOneByUserName(username).orElse(null);
        Chapter chapter=chapterRepository.findById(chapterId).orElse(null);
        if(chapter==null)
            return new ResponseObject(false,"Chapter not exist!","");
        if(!user.getUserName().equals(chapter.getComicBook_Id().getActorId().getUserName()))
            return new ResponseObject(false,"Cannot public orther people chapter!","");

        if(chapter.getPublishDate()==null){
            chapter.setPublishDate(new Date());
            chapter.setOpen(!chapter.isOpen());
            List<FavoriteComic>favoriteComics=favoriteComicRepository.findByComicBook_Id(chapter.getComicBook_Id().getId());
            favoriteComics.forEach(favoriteComic -> {
                String content=favoriteComic.getComicBook().getName()+ ", truyện mà bạn thích vừa thêm 1 chương mới";
                Announce announce=new Announce();
                announce.setUser(favoriteComic.getUser());
                announce.setType("fvr");
                announce.setRead(false);
                announce.setCreatedAt(new Date());
                announce.setContent(content);
                announce.setId(generateId.generateId());
                announce.setLinkTo("/comic-detail/"+favoriteComic.getComicBook().getId());
                simpMessagingTemplate.convertAndSendToUser(favoriteComic.getUser().getUserName(),"/queue/notifications",announce);
                announceRepository.save(announce);
            });

        }
        else {
            chapter.setOpen(!chapter.isOpen());
        }

        return new ResponseObject(true,"Success!",chapterRepository.save(chapter));

    }
}
