package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.hcmute.tlcn.jwt.JwtService;
import vn.hcmute.tlcn.model.Token;
import vn.hcmute.tlcn.securiry.CustomAdminDetailService;
import vn.hcmute.tlcn.service.IAdminService;

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

    @PostMapping("a/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestParam("username") String username,@RequestParam("password")String pass) throws Exception {

        authenticate(username,pass);

        final UserDetails userDetails = adminDetailService
                .loadUserByUsername(username);

        final String token = jwtService.generateToken( userDetails);
        System.out.println(userDetails.getAuthorities());

        return ResponseEntity.ok(new Token(token));
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
