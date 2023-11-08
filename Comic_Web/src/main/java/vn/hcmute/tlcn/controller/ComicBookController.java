package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.ComicBookDTO;
import vn.hcmute.tlcn.repository.ComicBookRepository;
import vn.hcmute.tlcn.service.IComicBookService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/comicbooks")
public class ComicBookController {
    @Autowired
    private IComicBookService service;

    @GetMapping("")
    ResponseEntity<ResponseObject> getAllComicBooks(){
        List<ComicBookDTO>comicBookList=service.getAllComic();
        if (!comicBookList.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Query Successfull!",comicBookList));
        }
        else return ResponseEntity.status(HttpStatus.NOT_EXTENDED).body(new ResponseObject(false,"Not Excuted",""));
    }
    @GetMapping("/{comicbookId}")
    public ResponseEntity<ResponseObject> getComicBookDeTail(@PathVariable String comicbookId){
        ComicBookDTO comicBook=service.getDetailComic(comicbookId);
        if (comicBook!=null){
            return ResponseEntity.ok().body(new ResponseObject(true,"Query Successfull!",comicBook));
        }
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject(false,"Cannot find Comic Book with Id"+comicbookId,""));

    }
    @GetMapping("/filter/{genreId}")
    private ResponseEntity<ResponseObject>getComicByGenres(@PathVariable String genreId){
        List<ComicBookDTO>comicBookList=service.getComicByGenre(genreId);
        if (!comicBookList.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Query SuccessFull!",comicBookList));
                    }
        else return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Not Found Comics With GenreId"+genreId,""));

    }

    @GetMapping("/actor/{actorId}")
   ResponseEntity<ResponseObject> getComicByActor(@PathVariable String actorId){
        List<ComicBookDTO>comicBookDTOS=service.getComicByActor(actorId);
        if(!comicBookDTOS.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Query Success!",comicBookDTOS));
        }else return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Not Found Comics With ActorId"+actorId,""));

    }

//    @PostMapping("")
//    ResponseEntity<ResponseObject>addComic(@RequestBody ComicBookDTO comicBookDTO){
//        ComicBookDTO comicBookDTO1=service.addComic(comicBookDTO);
//
//    }

}
