package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.entity.Chapter;
import vn.hcmute.tlcn.entity.ChapterImage;
import vn.hcmute.tlcn.PrimaryKey.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.ChapterImageDTO;
import vn.hcmute.tlcn.repository.ChapterImageRepository;
import vn.hcmute.tlcn.repository.ChapterRepository;
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


    @Override
    public List<ChapterImageDTO> getImagesByChapter(String chapterId) {
        List<ChapterImage>chapterImages=chapterImageRepository.findByChapter_IdOrderByOrdinalNumberAsc(chapterId);
        List<ChapterImageDTO>chapterImageDTOS=new ArrayList<>();
        for (ChapterImage chapterImg:chapterImages
             ) {
            chapterImageDTOS.add(converter.convertEntityToDto(chapterImg));
        }
        return chapterImageDTOS;
    }
//    public Path getStorageFolder(String fileName){
//        Optional<ChapterImage>optionalChapterImg=chapterImageRepository.findOneByLink(fileName);
//        if(!optionalChapterImg.isPresent())
//            return null;
//
//        ChapterImage chapterImg=optionalChapterImg.get();
//        String path="uploads/"+chapterImg.getChapter().getComicBook_Id().getActorId().getUserName()+"/"
//                +chapterImg.getChapter().getComicBook_Id().getId()+"/"+chapterImg.getChapter().getId();
//        return Paths.get(path);
//    }
//    @Override
//    public byte[] readFileContent(String fileName) {
//
//
//        try {
//            Path file = storageFolder.resolve(fileName);
//            Resource resource = new UrlResource(file.toUri());
//            if (resource.exists() || resource.isReadable()) {
//                byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
//                return bytes;
//            } else {
//                throw new RuntimeException("Could not read file:" + fileName);
//            }
//        } catch (IOException exception) {
//            throw new RuntimeException("Could not read file:" + fileName, exception);
//        }
//    }

    @Override
    public int deleteChapterImg(String username,String fileName) {
        User user=userRepository.findOneByUserName(username).get();
        Optional<ChapterImage>optionalChapterImage=chapterImageRepository.findOneByLink(fileName);
        if(!optionalChapterImage.isPresent())
            return 0;
        ChapterImage chapterImage=optionalChapterImage.get();
        if(!user.getId().equals(chapterImage.getChapter().getComicBook_Id().getActorId().getId()))
            return 1;
        chapterImageRepository.delete(optionalChapterImage.get());
        imageStorageService.deleteFile(fileName);
        return 2;
    }

    @Override
    public ResponseEntity<ResponseObject> addImageChapter(String username, String chapterId, MultipartFile file) {
        Optional<User>optionalUser=userRepository.findOneByUserName(username);
        Optional<Chapter> optionalChapter=chapterRepository.findById(chapterId);
        if (!optionalChapter.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Chapter not exist!",""));
        Chapter chapter=optionalChapter.get();
        User user=optionalUser.get();
        if (!user.getId().equals(chapter.getComicBook_Id().getActorId().getId()))
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"You cannot upload image into someone else's Chapter!",""));
        try {
//            ImageStorageService imageStorageService=new ImageStorageService("uploads/"+username+"/"+chapter.getComicBook_Id().getId()+"/"+chapterId);
            String imageName=imageStorageService.storeFile(file);
            int ordinalNumber=chapterImageRepository.findByChapter_IdOrderByOrdinalNumberAsc(chapterId).size()+1;
            ChapterImage chapterImage=new ChapterImage(chapter,imageName,ordinalNumber);

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Upload Success!",chapterImageRepository.save(chapterImage)));

        }
        catch (Exception exception){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, exception.getMessage(),""));
        }
    }
}
