package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.hcmute.tlcn.model.WalletDTO;
import vn.hcmute.tlcn.serviceimple.WalletServiceImple;

@RestController
@RequestMapping("/api/v1")
public class WalletController {
    @Autowired
    WalletServiceImple walletServiceImple;
    @PostMapping("user/register_wallet")
    ResponseEntity<?>registerWallet(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(walletServiceImple.registerWallet(userDetails.getUsername()));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @GetMapping("user/personal_wallet")
    ResponseEntity<?>getPersonalWallet(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            WalletDTO walletDTO = walletServiceImple.getWalletByUser(userDetails.getUsername());
            if(walletDTO == null) {
            	return ResponseEntity.ok("Not registered yet");
            }
            return ResponseEntity.ok(walletDTO);
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
}
