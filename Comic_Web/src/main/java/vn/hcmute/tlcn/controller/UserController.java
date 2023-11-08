package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.UserDTO;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.serviceimple.UserServiceImple;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImple userServiceImple;
    @GetMapping("/users")
    List<User> getAllUser(){
        return userRepository.findAll();
    }

    @PostMapping("/users/login")
    ResponseEntity<ResponseObject>userLogin(@RequestParam("username") String userName,@RequestParam("password")String password){
        UserDTO userDTO=userServiceImple.getUser(userName,password);
        if (userServiceImple.checkUser(userDTO)){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Login Success!",userDTO));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseObject(false,"Login Failed!",""));
    }

    @PostMapping("users/register")
    ResponseEntity<ResponseObject>registerUser(@RequestParam("name") String name,@RequestParam("email") String email,
                                               @RequestParam("username")String username,@RequestParam("password")String pass,
                                               @RequestParam("confirmPass")String confirmPass){
        ResponseObject responseObject=userServiceImple.register(name,email,username,pass,confirmPass);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }
}
