package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.utils.GenerateId;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.Genre;
import vn.hcmute.tlcn.model.GenreDTO;
import vn.hcmute.tlcn.repository.ComicBookRepository;
import vn.hcmute.tlcn.repository.GenreRepository;
import vn.hcmute.tlcn.service.IGenreService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GenreServiceImple implements IGenreService {
    @Autowired
    private GenreRepository genreRepository;
    @Autowired
    private ComicBookRepository comicBookRepository;
    @Autowired 
    private Converter converter;
    @Autowired
    private GenerateId generateId;
    
    @Override
    public List<GenreDTO> getAllGenre() {
        List<GenreDTO> genreDTOS=new ArrayList<>();
        List<Genre> genres=genreRepository.findAll();
        for (Genre genre:genres
             ) {
            genreDTOS.add(converter.convertEntityToDto(genre));
        }
        return genreDTOS;
    }

    @Override
    public boolean addGenre(String name) {
        Optional<Genre>optionalGenre=genreRepository.findByName(name);
        if(optionalGenre.isPresent())
            return false;
        Genre genre=new Genre(generateId.generateId(),name);
        genreRepository.save(genre);
        return true;
    }

    @Override
    public int deleteGenre(String genreId) {
        List<ComicBook>comicBooks=comicBookRepository.findByGenres_Id(genreId);
        Optional<Genre>genre=genreRepository.findById(genreId);
        if(!genre.isPresent())
            return 1;
        Genre genre1=genre.get();
        for (ComicBook comic:comicBooks
             ) {
            List genres=comic.getGenres();
            genres.remove(genre1);
            comic.setGenres(genres);
            comicBookRepository.save(comic);
        }
        genreRepository.deleteById(genreId);
        return 2;
    }

    @Override
    public boolean updateGenre(String id,String newName) {
        Optional<Genre>optionalGenre=genreRepository.findById(id);
        if(!optionalGenre.isPresent())
            return false;
        Genre genre=optionalGenre.get();
        genre.setName(newName);
        genreRepository.save(genre);
        return true;

    }

}
