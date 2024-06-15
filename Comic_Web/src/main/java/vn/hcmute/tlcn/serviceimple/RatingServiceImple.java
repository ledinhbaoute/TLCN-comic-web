package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.Announce;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.Rating;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.RatingDTO;
import vn.hcmute.tlcn.repository.AnnounceRepository;
import vn.hcmute.tlcn.repository.ComicBookRepository;
import vn.hcmute.tlcn.repository.RatingRepository;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.service.IRatingService;
import vn.hcmute.tlcn.utils.Converter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImple implements IRatingService {
    @Autowired
    private Converter converter;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ComicBookRepository comicBookRepository;
    @Autowired
    RatingRepository ratingRepository;
    @Autowired
    AnnounceRepository announceRepository;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public ResponseEntity<ResponseObject> addRating(String username, String ComicId, int score, String comment) {
        Optional<User> optionalUser = userRepository.findOneByUserName(username);
        Optional<ComicBook> optionalComicBook = comicBookRepository.findById(ComicId);
        if (!optionalComicBook.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Comic not exist!", ""));
        User user = optionalUser.get();
        ComicBook comicBook = optionalComicBook.get();
        Rating rating = new Rating(user, comicBook, score, comment);
        ratingRepository.save(rating);
        updateComicRating(ComicId);
//        String content=username+" đã đánh giá về truyện "+comicBook.getName();
//        Announce announce=new Announce();
//        announce.setCreatedAt(new Date());
//        announce.setType("rv");
//        announce.setUser(comicBook.getActorId());
//        announce.setLinkTo("/comic-detail/"+comicBook.getId()+"?reviewId="+rating.getUser().getId());
//        announce.setContent(content);
//        announce.setRead(false);
//        simpMessagingTemplate.convertAndSendToUser(announce.getUser().getUserName(),"/queue/notifications",announce);
//        announceRepository.save(announce);
        return ResponseEntity.ok(new ResponseObject(true, "Rating Success!",rating));
    }
    @Override
    public List<RatingDTO> getRatingByComic(String comicId) {
        List<Rating>ratings=ratingRepository.findByComicBook_Id(comicId);
        List<RatingDTO>ratingDTOS=new ArrayList<>();
        for (Rating r:ratings
             ) {
            ratingDTOS.add(converter.convertEntityToDto(r));
        }
        return ratingDTOS;
}
    public void updateComicRating(String comicId) {
        List<Rating> ratings = ratingRepository.findByComicBook_Id(comicId);
        float rate = 0;
        if (!ratings.isEmpty())
            rate = (float) ratings.stream().mapToInt(Rating::getScore).average().orElse(0);
        Optional<ComicBook> optionalComic = comicBookRepository.findById(comicId);
        if (optionalComic.isPresent()) {
            ComicBook comic = optionalComic.get();
            comic.setRate(rate);
            comicBookRepository.save(comic);
        }

    }
}