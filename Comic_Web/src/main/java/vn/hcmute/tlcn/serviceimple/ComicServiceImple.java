package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.utils.GenerateId;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.Genre;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.ComicBookDTO;
import vn.hcmute.tlcn.repository.ComicBookRepository;
import vn.hcmute.tlcn.repository.GenreRepository;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.service.IComicBookService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ComicServiceImple implements IComicBookService {
    @Autowired
    private ComicBookRepository comicBookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Converter converter;
    @Autowired
    private GenerateId generateId;
    @Autowired
    private GenreRepository genreRepository;
    @Override
    public List<ComicBookDTO> getAllComic() {
        List<ComicBookDTO>comicBookDTOS=new ArrayList<>();
        List<ComicBook>comicBooks=comicBookRepository.findAll();
        for (ComicBook comic:comicBooks
             ) {
            comicBookDTOS.add(converter.convertEntityToDto(comic));
        }
        return comicBookDTOS;
    }

    @Override
    public List<ComicBookDTO> getComicByGenre(String genreId) {
        List<ComicBookDTO> comicBookDTOS=new ArrayList<>();
        List<ComicBook>comicBooks=comicBookRepository.findByGenres_Id(genreId);
        for (ComicBook comic:comicBooks
             ) {
            comicBookDTOS.add(converter.convertEntityToDto(comic));
        }
        return comicBookDTOS;
    }

    @Override
    public ComicBookDTO getDetailComic(String comicId) {
        ComicBookDTO comicBookDTO=new ComicBookDTO();
        Optional<ComicBook> comicBook=comicBookRepository.findById(comicId);
        if (comicBook.isPresent())
            comicBookDTO= converter.convertEntityToDto(comicBook.get());
        return comicBookDTO;
    }

    @Override
    public List<ComicBookDTO> getComicByActor(String actorId) {
        List<ComicBook>comicBooks=comicBookRepository.findByActor_Id(actorId);
        List<ComicBookDTO>comicBookDTOS=new ArrayList<>();
        for (ComicBook cm:comicBooks
             ) {
            comicBookDTOS.add(converter.convertEntityToDto(cm));

        }
        return comicBookDTOS;
    }

    @Override
    public ComicBookDTO addComic(String name, String username,List<String>genres) {

        Optional<User> optionalUser=userRepository.findOneByUserName(username);
        if(!optionalUser.isPresent())
            return null;
        User user=optionalUser.get();
        List<Genre>genreList=new ArrayList<>();
        ComicBook comicBook=new ComicBook(generateId.generateId(),name,false,user,0,0,new Date(),new Date(),1);
        for (String id:genres
             ) {
            Optional<Genre>genre=genreRepository.findById(id);
            if(genre.isPresent())
                genreList.add(genre.get());
        }
        comicBook.setGenres(genreList);
        comicBookRepository.save(comicBook);
        return converter.convertEntityToDto(comicBook);
    }

    @Override
    public ResponseObject updateComic(String username,String comicId,String newName,int newStatus) {
        Optional<User>optionalUser=userRepository.findOneByUserName(username);
        Optional<ComicBook>optionalComicBook=comicBookRepository.findById(comicId);
        if(!optionalComicBook.isPresent())
             return new ResponseObject(false,"Comic book not exist!","");
        User user=optionalUser.get();
        ComicBook comicBook=optionalComicBook.get();
        if(!comicBook.getActorId().getId().equals(user.getId()))
            return new ResponseObject(false,"This comic book is not owned by this user","");
        comicBook.setName(newName);
        comicBook.setStatus(newStatus);
        return new ResponseObject(true,"Update Success!",converter.convertEntityToDto(comicBookRepository.save(comicBook)));





    }

    @Override
    public int deleteComic(String username,String comicId) {
        User user=userRepository.findOneByUserName(username).get();
        Optional<ComicBook>optionalComicBook=comicBookRepository.findById(comicId);
        if (!optionalComicBook.isPresent())
            return 0;
        ComicBook comicBook=optionalComicBook.get();
        if(!user.getId().equals(comicBook.getActorId().getId()))
            return 1;
        comicBookRepository.deleteById(comicId);
        return 2;
    }




}
