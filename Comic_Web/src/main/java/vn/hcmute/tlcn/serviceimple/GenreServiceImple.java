package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.converter.Converter;
import vn.hcmute.tlcn.entity.Genre;
import vn.hcmute.tlcn.model.GenreDTO;
import vn.hcmute.tlcn.repository.GenreRepository;
import vn.hcmute.tlcn.service.IGenreService;

import java.util.ArrayList;
import java.util.List;

@Service
public class GenreServiceImple implements IGenreService {
    @Autowired
    private GenreRepository genreRepository;
    @Autowired 
    private Converter converter;
    
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

}
