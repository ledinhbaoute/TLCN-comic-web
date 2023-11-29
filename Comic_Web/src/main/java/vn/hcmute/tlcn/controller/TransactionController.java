package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.serviceimple.TransactionServiceImple;

@RestController
@RequestMapping("/api/v1")
public class TransactionController {
    @Autowired
    TransactionServiceImple transactionServiceImple;

    @PostMapping("/user/top_up")
    ResponseEntity<?> topUpMoneyToWallet(Authentication authentication, @RequestParam("password") String password,
                                         @RequestParam("amount") int amount) {
        if (authentication != null) {
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(transactionServiceImple.topUpMoneyToWallet(userDetails.getUsername(), amount,password));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @GetMapping("/user/transactions")
    ResponseEntity<?>getAllTransactionByUser(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(new ResponseObject(true,"Success!",transactionServiceImple.getAllTransactionByUser(userDetails.getUsername())));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

}