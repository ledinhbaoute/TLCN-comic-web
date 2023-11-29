package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.GenreDTO;
import vn.hcmute.tlcn.repository.GenreRepository;
import vn.hcmute.tlcn.service.IGenreService;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")
public class GenreController {
    @Autowired
    private IGenreService iGenreService;
    @Autowired
    GenreRepository genreRepository;

    @Autowired
    private Converter converter;

    @GetMapping("/genres")
    ResponseEntity<ResponseObject> getAllGenres() {
        List<GenreDTO> genresList = iGenreService.getAllGenre();

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Query Succesfull!", genresList));

    }

    @PostMapping("admin/genres")
    ResponseEntity<?> addGenre(@RequestParam("genreName") String genreName, Authentication authentication) {
        if (authentication != null) {
            if (!iGenreService.addGenre(genreName))
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Genre already exist!", ""));

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Insert Success!", ""));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @PutMapping("admin/genres")
    ResponseEntity<?> updateGenre(@RequestParam("genreId") String id, @RequestParam("newName") String newName, Authentication authentication) {
        if (authentication != null) {
            if (!iGenreService.updateGenre(id, newName))
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Genre not exist!", ""));

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Update Success!", ""));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @DeleteMapping("admin/genres")
    ResponseEntity<?> deleteGenre(@RequestParam("genreId") String id, Authentication authentication) {
        if (authentication != null) {
            try {
                int check = iGenreService.deleteGenre(id);
                if (check == 2)
                    return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Delete Genre Success!", ""));
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Genre not exist!", ""));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, e.getMessage(), ""));
            }
        }
        return ResponseEntity.status(401).body("Unauthorized!");

    }
}
