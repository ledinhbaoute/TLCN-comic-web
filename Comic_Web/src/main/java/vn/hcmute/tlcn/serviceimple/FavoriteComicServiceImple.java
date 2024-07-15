package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.primarykey.FavoriteComicKey;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.FavoriteComic;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.FavoriteComicDTO;
import vn.hcmute.tlcn.repository.ComicBookRepository;
import vn.hcmute.tlcn.repository.FavoriteComicRepository;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.service.IFavoriteComicService;
import vn.hcmute.tlcn.utils.Converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteComicServiceImple implements IFavoriteComicService {
    @Autowired
    private FavoriteComicRepository favoriteComicRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ComicBookRepository comicBookRepository;
    @Autowired
    private Converter converter;

    @Override
    public ResponseEntity<ResponseObject> addFavoriteComic(String username, String comicId) {
        Optional<User> optionalUser=userRepository.findOneByUserName(username);
        Optional<ComicBook>optionalComicBook=comicBookRepository.findById(comicId);
        if(!optionalComicBook.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Comic not exist!",""));
        User user=optionalUser.get();
        ComicBook comicBook=optionalComicBook.get();
        FavoriteComic favoriteComic=new FavoriteComic(user,comicBook);
        try {
            FavoriteComicDTO favoriteComicDTO=converter.convertEntityToDto(favoriteComicRepository.save(favoriteComic));
            return ResponseEntity.ok(new ResponseObject(true,"Add Favorite Success!",favoriteComicDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseObject(false,e.getMessage(),""));
        }

    }

    @Override
    public ResponseEntity<ResponseObject> removeFavoriteComic(String username, String comicId) {
        Optional<User>optionalUser=userRepository.findOneByUserName(username);
        Optional<ComicBook>optionalComicBook=comicBookRepository.findById(comicId);
        if(!optionalComicBook.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Comic not exist!",""));
        User user=optionalUser.get();
        ComicBook comicBook=optionalComicBook.get();
        FavoriteComicKey favoriteComicKey=new FavoriteComicKey(user.getId(),comicBook.getId());
        Optional<FavoriteComic>optional=favoriteComicRepository.findById(favoriteComicKey);
        if (!optional.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Don't have this comic in this user's favorite comic list!",""));
        favoriteComicRepository.deleteById(favoriteComicKey);
        return ResponseEntity.ok(new ResponseObject(true,"Remove Comic from Favorite Comic Success!",""));
    }

    @Override
    public List<FavoriteComicDTO> getFavoriteComicByUser(String username) {
        List<FavoriteComic> favoriteComics=favoriteComicRepository.findByUser_UserName(username);
        List<FavoriteComicDTO>favoriteComicDTOS=new ArrayList<>();
        for (FavoriteComic favoriteComic:favoriteComics
             ) {
            favoriteComicDTOS.add(converter.convertEntityToDto(favoriteComic));
        }
        return favoriteComicDTOS;
    }
    @Override
    public boolean isFavorite(String userId,String comicId){
        FavoriteComic favoriteComic=favoriteComicRepository.findById(new FavoriteComicKey(userId,comicId)).orElse(null);
        if (favoriteComic!=null)
            return true;
        return false;
    }

}
