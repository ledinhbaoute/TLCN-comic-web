package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.jwt.JwtService;
import vn.hcmute.tlcn.model.Token;
import vn.hcmute.tlcn.securiry.CustomAdminDetailService;
import vn.hcmute.tlcn.service.IAdminService;
import vn.hcmute.tlcn.serviceimple.AdminServiceImplement;

@RestController
@RequestMapping("api/v1/")
public class AdminController {
    @Autowired
    private IAdminService service;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtService jwtService;
    @Autowired
    private CustomAdminDetailService adminDetailService;
    @Autowired
    private AdminServiceImplement adminServiceImplement;


    @GetMapping("/admin")
    public ResponseEntity<?> getAdminInfo(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok( adminServiceImplement.getInfoAdmin(userDetails.getUsername()));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @PostMapping("a/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestParam("username") String username,@RequestParam("password")String pass) throws Exception {

        authenticate(username,pass);

        final UserDetails userDetails = adminDetailService
                .loadUserByUsername(username);

        final String token = jwtService.generateToken( userDetails);
        return ResponseEntity.ok(new Token(token));
    }
    @PostMapping("/admin/lock-or-unlock_user")
    private ResponseEntity<?>lockUser(Authentication authentication,@RequestParam("username")String username){
        if(authentication!=null){
            adminServiceImplement.lockOrUnlockAccountUser(username);
            return ResponseEntity.ok("Success!");
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
