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

    
    @GetMapping("/user/transactions")
    ResponseEntity<?>getAllTransactionByUser(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(new ResponseObject(true,"Success!",transactionServiceImple.getAllTransactionByUser(userDetails.getUsername())));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @GetMapping("/admin/transaction")
    ResponseEntity<?>getAllTransactionRegisterPremium(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            boolean isAdmin=userDetails.getAuthorities().stream().anyMatch(authority->authority.getAuthority().equals("ROLE_ADMIN"));
            if(isAdmin)
                return ResponseEntity.ok(transactionServiceImple.getAllTransactionRegisterPremium());

        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

}
