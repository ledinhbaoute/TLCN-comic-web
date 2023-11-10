package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.GenreDTO;
import vn.hcmute.tlcn.repository.GenreRepository;
import vn.hcmute.tlcn.service.IGenreService;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
public class GenreController {
    @Autowired
    private IGenreService iGenreService;
    @Autowired GenreRepository genreRepository;

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
    ResponseEntity<ResponseObject>addGenre(@RequestParam("genreName")String genreName){
        if(!iGenreService.addGenre(genreName))
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Genre already exist!",""));

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Insert Success!",""));
    }

    @PutMapping("/genres")
    ResponseEntity<ResponseObject>updateGenre(@RequestParam ("genreId")String id,@RequestParam("newName")String newName){
        if (!iGenreService.updateGenre(id,newName))
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Genre not exist!",""));

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Update Success!",""));
    }

    @DeleteMapping("/genres")
    ResponseEntity<ResponseObject>deleteGenre(@RequestParam("genreId")String id){
        try {
            int check=iGenreService.deleteGenre(id);
            if (check==2)
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Delete Genre Success!",""));
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Genre not exist!",""));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,e.getMessage(),""));
        }

    }
}
