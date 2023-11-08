package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.hcmute.tlcn.converter.Converter;
import vn.hcmute.tlcn.entity.Genre;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.GenreDTO;
import vn.hcmute.tlcn.repository.GenreRepository;
import vn.hcmute.tlcn.service.IGenreService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1")
public class GenreController {
    @Autowired
    private IGenreService iGenreService;
    @Autowired
    private GenreRepository genreRepository;
    @Autowired
    private Converter converter;

    @GetMapping("/genres")
    ResponseEntity<ResponseObject> getAllGenres(){
        List<GenreDTO> genresList= iGenreService.getAllGenre();
        if(!genresList.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Query Succesfull!",genresList));
        }
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false,"Cannot query genres list",null));
    }

    @PostMapping("/genres")
    ResponseEntity<ResponseObject>addGenre(@RequestBody GenreDTO genreDTO){
        Genre genre=converter.convertDtoToEntity(genreDTO);
        Optional<Genre> genre1=genreRepository.findById(genre.getId());
        if (genre1.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Cannot insert!",""));
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Insert Success!",genreRepository.save(genre)));
    }
}
