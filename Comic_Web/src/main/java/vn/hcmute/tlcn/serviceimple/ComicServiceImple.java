package vn.hcmute.tlcn.serviceimple;

import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import vn.hcmute.tlcn.controller.FileUploadController;
import vn.hcmute.tlcn.entity.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.repository.*;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.utils.GenerateId;
import vn.hcmute.tlcn.model.ComicBookDTO;
import vn.hcmute.tlcn.service.IComicBookService;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ComicServiceImple implements IComicBookService {
    @Autowired
    private ComicBookRepository comicBookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private Converter converter;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private GenreRepository genreRepository;
    @Autowired
    private ImageStorageService imageStorageService;
    @Autowired
    private UserPremiumRepo userPremiumRepo;
    @Autowired
    private ChapterImageServiceImple chapterImageServiceImple;
    @Autowired
    private HistoryIncreaseViewRepo historyIncreaseViewRepo;
    @Autowired
    private AnnounceRepository announceRepository;
    @Autowired
    private FollowRepository followRepository;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public List<ComicBookDTO> getAllComic() {
        List<ComicBookDTO> comicBookDTOS = new ArrayList<>();
        List<ComicBook> comicBooks = comicBookRepository.findAll();
        for (ComicBook comic : comicBooks
        ) {
            ComicBookDTO comicBookDTO = converter.convertEntityToDto(comic);
            comicBookDTOS.add(comicBookDTO);
        }
        Collections.shuffle(comicBookDTOS);

        return comicBookDTOS.subList(0,5);
    }
    @Override
    public List<ComicBookDTO> getComicByGenre(String genreId) {
        List<ComicBookDTO> comicBookDTOS = new ArrayList<>();
        List<ComicBook> comicBooks = comicBookRepository.findByGenres_Id(genreId);

        for (ComicBook comic : comicBooks
        ) {
            String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                    "readDetailFile", comic.getImage()).build().toUri().toString();
            ComicBookDTO comicBookDTO = converter.convertEntityToDto(comic);
            comicBookDTO.setImage(urlPath);
            comicBookDTOS.add(comicBookDTO);
        }
        return comicBookDTOS;
    }

    @Override
    public ComicBookDTO getDetailComic(String comicId) {
        ComicBookDTO comicBookDTO = new ComicBookDTO();
        Optional<ComicBook> comicBook = comicBookRepository.findById(comicId);
        if (comicBook.isPresent()) {
            comicBookDTO = converter.convertEntityToDto(comicBook.get());
            String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                    "readDetailFile", comicBookDTO.getImage()).build().toUri().toString();
            comicBookDTO.setImage(urlPath);
        }
        return comicBookDTO;
    }

    @Override
    public List<ComicBookDTO> getComicByActor(String actorId) {
        List<ComicBook> comicBooks = comicBookRepository.findByActor_Id(actorId);
        List<ComicBookDTO> comicBookDTOS = new ArrayList<>();
        for (ComicBook comic : comicBooks
        ) {
            String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                    "readDetailFile", comic.getImage()).build().toUri().toString();
            ComicBookDTO comicBookDTO = converter.convertEntityToDto(comic);
            comicBookDTO.setImage(urlPath);
            comicBookDTOS.add(comicBookDTO);

        }
        return comicBookDTOS;
    }
    @Override
    public List<ComicBookDTO> searchComicByInput(String input) {
        List<ComicBookDTO> comicBookDTOS = new ArrayList<>();
        List<ComicBook> comicBooks = comicBookRepository.findByInputString(input);
        for (ComicBook comic : comicBooks
        ) {
            String urlPath = MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
                    "readDetailFile", comic.getImage()).build().toUri().toString();
            ComicBookDTO comicBookDTO = converter.convertEntityToDto(comic);
            comicBookDTO.setImage(urlPath);
            comicBookDTOS.add(comicBookDTO);

        }
        return comicBookDTOS;
    }

    @Override
    public ComicBookDTO addComic(String name, String username, List<String> genres, String discription, MultipartFile file) throws IOException {

        Optional<User> optionalUser = userRepository.findOneByUserName(username);
        if (!optionalUser.isPresent())
            return null;
        User user = optionalUser.get();
        List<Genre> genreList = new ArrayList<>();
        ComicBook comicBook = new ComicBook(generateId.generateId(), name, false, user, 0, 0, new Date(), new Date(), 1, null, discription);
        for (String id : genres
        ) {
            Optional<Genre> genre = genreRepository.findById(id);
            if (genre.isPresent())
                genreList.add(genre.get());
        }
        comicBook.setGenres(genreList);
        String image = imageStorageService.storeFile(file);
        comicBook.setImage(image);

        comicBookRepository.save(comicBook);
        List<Follower>followers=followRepository.findByUser_UserName(username);
        followers.forEach(follower -> {
            String content=user.getName()+ "vừa tạo 1 truyện mới";
            Announce announce=new Announce();
            announce.setUser(follower.getFollower());
            announce.setType("ncm");
            announce.setRead(false);
            announce.setCreatedAt(new Date());
            announce.setContent(content);
            announce.setId(generateId.generateId());
            announce.setLinkTo("/comic-detail/"+comicBook.getId());
            simpMessagingTemplate.convertAndSendToUser(follower.getFollower().getUserName(),"/queue/notifications",announce);
            announceRepository.save(announce);
        });
        return converter.convertEntityToDto(comicBook);
    }
    @Override
    public ResponseObject updateComic(String username, String comicId, String newName, List<String> genres, int newStatus,String newDescription) {
        Optional<User> optionalUser = userRepository.findOneByUserName(username);
        Optional<ComicBook> optionalComicBook = comicBookRepository.findById(comicId);
        if (!optionalComicBook.isPresent())
            return new ResponseObject(false, "Comic book not exist!", "");
        User user = optionalUser.get();
        ComicBook comicBook = optionalComicBook.get();
        if (!comicBook.getActorId().getId().equals(user.getId()))
            return new ResponseObject(false, "This comic book is not owned by this user", "");
        List<Genre> genreList = new ArrayList<>();
        for (String id : genres
        ) {
            Optional<Genre> genre = genreRepository.findById(id);
            if (genre.isPresent())
                genreList.add(genre.get());
        }
        comicBook.setName(newName);
        comicBook.setStatus(newStatus);
        comicBook.setDiscription(newDescription);
        comicBook.setGenres(genreList);
        return new ResponseObject(true, "Update Success!", converter.convertEntityToDto(comicBookRepository.save(comicBook)));
    }

    @Override
    public int deleteComic(String username, String comicId) {
        User user = userRepository.findOneByUserName(username).get();
        Optional<ComicBook> optionalComicBook = comicBookRepository.findById(comicId);
        if (!optionalComicBook.isPresent())
            return 0;
        ComicBook comicBook = optionalComicBook.get();
        if (!user.getId().equals(comicBook.getActorId().getId()))
            return 1;
        try {
            List<String> imageList = chapterImageServiceImple.getAllImageByComic(comicId);
            comicBookRepository.deleteById(comicId);
//            imageStorageService.deleteFile(comicBook.getImage());
//
//            for (String imageName : imageList
//            ) {
//                imageStorageService.deleteFile(imageName);
//            }
            return 2;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    public ResponseObject adminDeleteComic(String comicId){
        ComicBook comicBook=comicBookRepository.findById(comicId).orElse(null);
        if(comicBook==null)
            return new ResponseObject(false,"Comic not exist!","");
        try {
            comicBookRepository.deleteById(comicId);
            return new ResponseObject(true,"Success!","");
        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    @Override
    public ResponseObject upgradePremium(String username, String comicId) {
        User user = userRepository.findOneByUserName(username).get();
        ComicBook comicBook = comicBookRepository.findById(comicId).orElse(null);
        if (comicBook == null)
            return new ResponseObject(false, "Comic not exist!", "");
        if (!user.getId().equals(comicBook.getActorId().getId()))
            return new ResponseObject(false, "Cannot upgrade someone else's book!", "");
        UserPremium userPremium = userPremiumRepo.findOneByUser_UserName(username).orElse(null);
        if (userPremium != null) {
            comicBook.setPremium(true);
            return new ResponseObject(true, "Nâng cấp truyện thành công!", converter.convertEntityToDto(comicBook));
        }
        return new ResponseObject(false, "You need upgrade to Premium Account!", "");
    }
    @Override
    public ResponseObject updateCoverImage(String username,String comicId,MultipartFile file){
        User user=userRepository.findOneByUserName(username).get();
        ComicBook comicBook=comicBookRepository.findById(comicId).orElse(null);
        if(comicBook==null){
            return new ResponseObject(false,"Comic not exist!","");
        }
        if(!comicBook.getActorId().getId().equals(user.getId()))
            return new ResponseObject(false,"This comic book is not owned by this user","");
        String currentImg = comicBook.getImage();
        try {
            String newImg=imageStorageService.storeFile(file);
            comicBook.setImage(newImg);
//            imageStorageService.deleteFile(currentImg);
            return new ResponseObject(true,"Success",comicBookRepository.save(comicBook));
        }catch (Exception e){
            return new ResponseObject(false,e.getMessage(),"");
        }

    }
    @Override
    @Transactional
    public void increaseView(String comicId) {
        ComicBook comicBook = comicBookRepository.findById(comicId).orElse(null);
        if (comicBook == null)
            return;
        comicBook.setView(comicBook.getView() + 1);
        comicBookRepository.save(comicBook);
        HistoryIncreaseView historyIncreaseView = new HistoryIncreaseView(comicBook, new Date());
        historyIncreaseViewRepo.save(historyIncreaseView);
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.DAY_OF_YEAR, -8);
        Date overOneWeekAgo = calendar.getTime();
    }

    @Override
    public Page<ComicBookDTO> getComicTrendingByWeek(int indexPage) {
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.WEEK_OF_YEAR, -1);
        Date oneWeekAgo = calendar.getTime();

        Page<ComicBook> trendingList = historyIncreaseViewRepo.getTrending(oneWeekAgo, currentDate, PageRequest.of(indexPage, 12));
        return trendingList.map(converter::convertEntityToDto);
//        int endIndex = Math.min(trendingList.size(), 10);
//        return trendingList.subList(0, endIndex).stream().map(c -> converter.convertEntityToDto(c)).toList();
    }

    @Override
    public List<ComicBookDTO> getComicTopView() {
        return comicBookRepository.findTop10ByOrderByViewDesc().stream().map(c -> converter.convertEntityToDto(c)).toList();
    }

    @Override
    public Page<ComicBookDTO> getAllComicPagination(int indexPage, String sortBy) {
        if (sortBy != null) {
            Page<ComicBook> page = comicBookRepository.findAll(PageRequest.of(indexPage, 6, Sort.by(sortBy).descending()));
            return page.map(converter::convertEntityToDto);

        }
        return comicBookRepository.findAll(PageRequest.of(indexPage, 6)).map(converter::convertEntityToDto);
    }

    @Override
    public Page<ComicBookDTO> getComicByGenrePagination(String genreId, int indexPage, String sortBy) {
        if (sortBy == null)
            return comicBookRepository.findByGenres_Id(genreId, PageRequest.of(indexPage, 8)).map(converter::convertEntityToDto);
        return comicBookRepository.findByGenres_Id(genreId, PageRequest.of(indexPage, 8, Sort.by(sortBy).descending())).map(converter::convertEntityToDto);
    }

    @Override
    public Page<ComicBookDTO> getBookOrderByUpdateDate(int indexPage) {
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.WEEK_OF_YEAR, -1);
        Date oneWeekAgo = calendar.getTime();
        return comicBookRepository.findComicsUpdatedWithinOneWeekOrderByUpdateDateDesc(oneWeekAgo,currentDate,PageRequest.of(indexPage,12)).map(converter::convertEntityToDto);
    }
    @Override
    public List<ComicBookDTO>filterSearchComic(List<String> includeGenres, List<String> excludeGenres, int status,int numberChapter){
        if(status!=0){
            return comicBookRepository.findByGenresAndStatusAndChapters(includeGenres,excludeGenres,status,numberChapter)
                    .stream().map(comicBook -> converter.convertEntityToDto(comicBook)).collect(Collectors.toList());
        }
        else return comicBookRepository.findByGenresAndChapters(includeGenres,excludeGenres,numberChapter)
                .stream().map(comicBook -> converter.convertEntityToDto(comicBook)).collect(Collectors.toList());
    }
}
