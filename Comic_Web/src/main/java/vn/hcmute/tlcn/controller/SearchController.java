package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.ComicBookDTO;
import vn.hcmute.tlcn.model.UserDTO;
import vn.hcmute.tlcn.serviceimple.ComicServiceImple;
import vn.hcmute.tlcn.serviceimple.UserServiceImple;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class SearchController {
    @Autowired
    private UserServiceImple userServiceImple;
    @Autowired
    private ComicServiceImple comicServiceImple;

    @GetMapping("/search/user")
    ResponseEntity<ResponseObject> searchUser(@RequestParam("keySearch") String input) {
        List<UserDTO> userDTOS = userServiceImple.searchUser(input);
        if (userDTOS.size() > 0)
            return ResponseEntity.ok(new ResponseObject(true, "Success!", userDTOS));
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(false,"Not found!",""));

    }
    @GetMapping("search/comics")
    ResponseEntity<ResponseObject> searchComic(@RequestParam(name = "keySearch") String input){
        List<ComicBookDTO>comicBookDTOS= comicServiceImple.searchComicByInput(input);
        if(comicBookDTOS.size()>0)
            return ResponseEntity.ok(new ResponseObject(true, "Success!", comicBookDTOS));
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(false,"Not found!",""));
    }
    @GetMapping("/filterSearch")
    List<ComicBookDTO>filterSearchComic(@RequestParam(required = false) List<String>include,@RequestParam(required = false) List<String>exclude
            ,@RequestParam (required = false,defaultValue = "0") int status,@RequestParam (required = false,defaultValue = "0")int numberChapter){
        return comicServiceImple.filterSearchComic(include,exclude,status,numberChapter);
    }
}
