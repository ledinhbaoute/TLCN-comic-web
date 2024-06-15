package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ComicBookDTO;
import vn.hcmute.tlcn.repository.ComicBookRepository;
import vn.hcmute.tlcn.service.IComicBookService;
import vn.hcmute.tlcn.utils.Converter;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1")

public class ComicBookController {
    @Autowired
    private IComicBookService service;
    @Autowired
    ComicBookRepository comicBookRepository;
    @Autowired
    Converter converter;

    @GetMapping("/comicbooks")
    ResponseEntity<ResponseObject> getAllComicBooks() {
        List<ComicBookDTO> comicBookList = service.getAllComic();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Query Successfully!", comicBookList));
    }

    @GetMapping("/comic")
    List<ComicBookDTO> getAllComic() {
        return comicBookRepository.findAll().stream().map(converter::convertEntityToDto).toList();
    }

    @GetMapping("/comicbooks/{comicbookId}")
    public ResponseEntity<ResponseObject> getComicBookDeTail(@PathVariable String comicbookId) {
        ComicBookDTO comicBook = service.getDetailComic(comicbookId);
        if (comicBook.getId() != null) {
            return ResponseEntity.ok().body(new ResponseObject(true, "Query Successfully!", comicBook));
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false, "Cannot find Comic Book with Id" + comicbookId, ""));

    }

    @GetMapping("comicbooks/filter/genre/{genreId}")
    private ResponseEntity<ResponseObject> getComicByGenres(@PathVariable String genreId) {
        List<ComicBookDTO> comicBookList = service.getComicByGenre(genreId);

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Query SuccessFull!", comicBookList));
    }

    @GetMapping("comicbooks/filter/actor/{actorId}")
    ResponseEntity<ResponseObject> getComicByActor(@PathVariable String actorId) {
        List<ComicBookDTO> comicBookDTOS = service.getComicByActor(actorId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Query Success!", comicBookDTOS));
    }


    @PostMapping("user/comicbooks")
    ResponseEntity<?> addComic(@RequestParam("comicName") String comicName,
                               @RequestParam("genreIds") List<String> genresId, @RequestParam("discription") String discription,
                               @RequestParam("image") MultipartFile image, Authentication authentication) throws IOException {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            ComicBookDTO comicBookDTO = service.addComic(comicName, username, genresId, discription, image);
            if (comicBookDTO == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseObject(false, "Don't have user with username=" + username, ""));
            } else
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Add Comic Success!", comicBookDTO));

        }

        return ResponseEntity.status(401).body("Unauthorized!");
    }


    @PutMapping("/user/comicbooks")
    ResponseEntity<?> updateComic(@RequestParam("comicId")String id,
                                  @RequestParam("newName")String newName,
                                  @RequestParam("genreIds") List<String> genresId,
                                  @RequestParam("newStatus")int status,@RequestParam("newDescription")String description, Authentication authentication) {
        if (authentication != null) {
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            ResponseObject responseObject = service.updateComic(userDetails.getUsername(), id,newName,genresId,status,description);
            return ResponseEntity.status(HttpStatus.OK).body(responseObject);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @PostMapping("user/comic/update_coverImg")
    ResponseEntity<?> updateCoverImg(Authentication authentication, @RequestParam String comicId,
                                     @RequestParam("file") MultipartFile file) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(service.updateCoverImage(userDetails.getUsername(), comicId, file));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @PutMapping("/user/comic/upgrade_premium")
    ResponseEntity<?> upgradeComic(Authentication authentication, @RequestParam("comicId") String comicId) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(service.upgradePremium(userDetails.getUsername(), comicId));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }


    @DeleteMapping("/user/comicbooks")
    ResponseEntity<?> deleteComic(@RequestParam("comicId") String comicId, Authentication authentication) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            try {
                int check = service.deleteComic(userDetails.getUsername(), comicId);
                if (check == 2)
                    return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Delete Success!", ""));
                else if (check == 1)
                    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Cannot delete someone else's Comic!", ""));

                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "Comic not exist!", ""));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, e.getMessage(), ""));
            }

        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @DeleteMapping("/admin/comic")
    ResponseEntity<?> adminDeleteComic(@RequestParam("comicId") String comicId, Authentication authentication) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            boolean isAdmin = authentication.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            if (isAdmin) {
                return ResponseEntity.ok(service.adminDeleteComic(comicId));
            }
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

    @PostMapping("comic/view")
    public void increaseView(@RequestParam String comicId) {
        service.increaseView(comicId);
    }

    @GetMapping("/comic_trending")
    Page<ComicBookDTO> getComicTrending(@RequestParam int indexPage) {
        return service.getComicTrendingByWeek(indexPage);
    }

    @GetMapping("comic_topview")
    List<ComicBookDTO> getComicTopView() {
        return service.getComicTopView();
    }

    @GetMapping("comic/all/pagination")
    Page<ComicBookDTO> getAllComicPagination(@RequestParam int indexPage, @RequestParam(required = false) String sortBy) {
        return service.getAllComicPagination(indexPage, sortBy);
    }

    @GetMapping("comic/genre/pagination")
    Page<ComicBookDTO> getComicGenrePagination(@RequestParam int indexPage, @RequestParam String genreId, @RequestParam(required = false) String sortBy) {
        return service.getComicByGenrePagination(genreId, indexPage, sortBy);
    }

    @GetMapping("comic/latest_update")
    Page<ComicBookDTO> getComicLatestUpdate(@RequestParam int indexPage) {
        return service.getBookOrderByUpdateDate(indexPage);
    }

}
