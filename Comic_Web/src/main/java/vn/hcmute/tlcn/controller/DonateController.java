package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.model.DonateDTO;
import vn.hcmute.tlcn.serviceimple.DonateServiceImple;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class DonateController {
    @Autowired
    DonateServiceImple donateServiceImple;
    @PostMapping("/user/donate")
    ResponseEntity<?>donate(Authentication authentication, @RequestParam("receiver") String receiver,
                            @RequestParam("amount") int amount, @RequestParam("message") String message,@RequestParam("password")String password){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(donateServiceImple.donate(userDetails.getUsername(), receiver,amount,message,password));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @GetMapping("user/donate_history")
    ResponseEntity<?>getDonateHistory(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(donateServiceImple.getDonateHistory(userDetails.getUsername()));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @GetMapping("user/received_donate_history")
    ResponseEntity<?>getReceivedDonateHistory(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(donateServiceImple.getReceivedDonateHistory(userDetails.getUsername()));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @GetMapping("/hihihi")
    List<DonateDTO>list(){
        return donateServiceImple.getAll();
    }
}
