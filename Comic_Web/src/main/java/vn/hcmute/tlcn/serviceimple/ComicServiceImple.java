package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.converter.Converter;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.model.ComicBookDTO;
import vn.hcmute.tlcn.repository.ComicBookRepository;
import vn.hcmute.tlcn.service.IComicBookService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ComicServiceImple implements IComicBookService {
    @Autowired
    private ComicBookRepository comicBookRepository;

    @Autowired
    private Converter converter;
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
    public ComicBookDTO addComic(ComicBookDTO comicBookDTO) {
        ComicBook comicBook=converter.convertDtoToEntity(comicBookDTO);
        ComicBook comicBook1=comicBookRepository.save(comicBook);
        return converter.convertEntityToDto(comicBook1);
    }
}
