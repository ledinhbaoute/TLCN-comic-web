package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.service.IFollowService;

@RestController
@RequestMapping("api/v1/follows")
public class FollowController {
    @Autowired
    IFollowService iFollowService;
    @PostMapping("")
    ResponseEntity<ResponseObject>follow(@RequestParam("followerUserName")String flUserName,@RequestParam("followerPassword") String flPassword,
                                         @RequestParam("username")String userName){
        return iFollowService.addFollow(flUserName,flPassword,userName);
    }
    @DeleteMapping("")
    ResponseEntity<ResponseObject>unfollow(@RequestParam("followerUserName")String flUserName,@RequestParam("followerPassword") String flPassword,
                                         @RequestParam("username")String userName){
         return iFollowService.unFollow(flUserName,flPassword,userName);
    }
}
