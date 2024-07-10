package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import vn.hcmute.tlcn.controller.FileUploadController;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.entity.ChapterImage;
import vn.hcmute.tlcn.entity.UserPremium;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.ChapterImageDTO;
import vn.hcmute.tlcn.repository.ChapterImageRepository;
import vn.hcmute.tlcn.repository.ChapterRepository;
import vn.hcmute.tlcn.repository.UserPremiumRepo;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.service.IChapterImageService;
import vn.hcmute.tlcn.utils.Converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChapterImageServiceImple implements IChapterImageService {
    @Autowired
    private ChapterImageRepository chapterImageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChapterRepository chapterRepository;
    @Autowired
    private Converter converter;
    @Autowired
    ImageStorageService imageStorageService;
    @Autowired
    UserPremiumRepo userPremiumRepo;
    @Override
    public ResponseObject getImagesByChapter(String username, String chapterId) {
        Chapter chapter = chapterRepository.findById(chapterId).orElse(null);
        if(chapter==null)
            return new ResponseObject(false,"Chapter not exist!","");
        if(chapter.getComicBook_Id().getPremium()){
            UserPremium userPremium=userPremiumRepo.findOneByUser_UserName(username).orElse(null);
            if(userPremium==null)
                return new ResponseObject(false,"You need Account Premium to read this book!","");
            else {
                List<ChapterImage> chapterImages = chapterImageRepository.findByChapter_IdOrderByOrdinalNumberAsc(chapterId);
                List<ChapterImageDTO> chapterImageDTOS = new ArrayList<>();
                for (ChapterImage chapterImg : chapterImages
                ) {
                    String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                            "readDetailFile", chapterImg.getLink()).build().toUri().toString();
                    ChapterImageDTO chapterImageDTO=converter.convertEntityToDto(chapterImg);
                    chapterImageDTO.setLink(urlPath);
                    chapterImageDTOS.add(chapterImageDTO);
                }
                return new ResponseObject(true, "Success!", chapterImageDTOS);
            }
        }
        List<ChapterImage> chapterImages = chapterImageRepository.findByChapter_IdOrderByOrdinalNumberAsc(chapterId);
        List<ChapterImageDTO> chapterImageDTOS = new ArrayList<>();
        for (ChapterImage chapterImg : chapterImages
        ) {
            String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                    "readDetailFile", chapterImg.getLink()).build().toUri().toString();
            ChapterImageDTO chapterImageDTO=converter.convertEntityToDto(chapterImg);
            chapterImageDTO.setLink(urlPath);
            chapterImageDTOS.add(chapterImageDTO);
        }
        return new ResponseObject(true, "Success!", chapterImageDTOS);
}
    @Override
public ResponseEntity<?> changeOrderImageList(String username, String chapterId,List<MultipartFile>newOrderList,boolean isAccept){
        User user=userRepository.findOneByUserName(username).orElse(null);
        if(user==null)
            return ResponseEntity.ok().body(new ResponseObject(false,"User not exist!",""));
        Chapter chapter=chapterRepository.findById(chapterId).orElse(null);
        if(!chapter.getComicBook_Id().getActorId().getUserName().equals(username))
            return ResponseEntity.ok().body(new ResponseObject(false,"Cannot edit others people's chapter",""));
        List<ChapterImage>chapterImages=chapterImageRepository.findByChapter_IdOrderByOrdinalNumberAsc(chapterId);
        chapterImageRepository.deleteAll(chapterImages);
        for (MultipartFile file:newOrderList
        ) {
            addImageChapter(username,chapterId,file);
        }
        if(!isAccept){
            chapter.setAccepted(false);
            chapter.setOpen(false);
            chapterRepository.save(chapter);
        }
        else {
            chapter.setAccepted(true);
            chapterRepository.save(chapter);
        }
        return ResponseEntity.ok().body(new ResponseObject(true,"Success",converter.convertEntityToDto(chapter)));

}
    @Override
    public int deleteChapterImg(String username, String fileName) {
        User user = userRepository.findOneByUserName(username).get();
        Optional<ChapterImage> optionalChapterImage = chapterImageRepository.findOneByLink(fileName);
        if (!optionalChapterImage.isPresent())
            return 0;
        ChapterImage chapterImage = optionalChapterImage.get();
        if (!user.getId().equals(chapterImage.getChapter().getComicBook_Id().getActorId().getId()))
            return 1;
        chapterImageRepository.delete(optionalChapterImage.get());
//        imageStorageService.deleteFile(fileName);
        return 2;
    }

    @Override
    public ResponseEntity<ResponseObject> addImageChapter(String username, String chapterId, MultipartFile file) {
        Optional<User> optionalUser = userRepository.findOneByUserName(username);
        Optional<Chapter> optionalChapter = chapterRepository.findById(chapterId);
        if (!optionalChapter.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Chapter not exist!", ""));
        Chapter chapter = optionalChapter.get();
        User user = optionalUser.get();
        if (!user.getId().equals(chapter.getComicBook_Id().getActorId().getId()))
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "You cannot upload image into someone else's Chapter!", ""));
        try {
//            ImageStorageService imageStorageService=new ImageStorageService("uploads/"+username+"/"+chapter.getComicBook_Id().getId()+"/"+chapterId);
            String imageName = imageStorageService.storeFile(file);
//            String imageName=imageStorageService.storeToCloudinary(file);
            int ordinalNumber = chapterImageRepository.findByChapter_IdOrderByOrdinalNumberAsc(chapterId).size() + 1;
            ChapterImage chapterImage = new ChapterImage(chapter, imageName, ordinalNumber);

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Upload Success!", chapterImageRepository.save(chapterImage)));

        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, exception.getMessage(), ""));
        }
    }
   public List<String>getAllImageByComic(String comicId){
        return  chapterImageRepository.findAllByChapter_ComicBook_Id(comicId).stream().map(i->i.getLink()).toList();
   }
    public List<String>getAllImageByChapter(String chapterId){
        return  chapterImageRepository.findByChapter_IdOrderByOrdinalNumberAsc(chapterId).stream().map(i->i.getLink()).toList();
    }
}

