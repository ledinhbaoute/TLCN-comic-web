package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.entity.UserPremium;
import vn.hcmute.tlcn.jwt.JwtService;
import vn.hcmute.tlcn.model.Token;
import vn.hcmute.tlcn.model.UserDTO;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.securiry.CustomUserDetailsService;
import vn.hcmute.tlcn.serviceimple.*;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.utils.ValidatePassword;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    JwtService jwtService;
    @Autowired
    CustomUserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImple userServiceImple;
    @Autowired
    private ValidatePassword validatePassword;
    @Autowired
    ChapterImageServiceImple chapterImageServiceImple;
    @Autowired
    InvalidTokenService invalidTokenService;
    @Autowired
    Converter converter;
    @GetMapping("/user")
    ResponseEntity<?> getUser(Authentication authentication) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(userServiceImple.getUser(userDetails.getUsername()));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @GetMapping("/getUserByUserName")
    ResponseEntity<?> getUserByUserName(@RequestParam String userName) {
        return ResponseEntity.ok(userServiceImple.getUser(userName));
    }
    
    @GetMapping("/findUser/{userId}")
    ResponseEntity<?> getUserbyId(@PathVariable String userId) {
        if (userId != null) {
            return ResponseEntity.ok(userServiceImple.getUserbyId(userId));
        }
        return ResponseEntity.status(404).body("Unauthorized!");
    }
    
    @GetMapping("all-user")
    List<UserDTO>getAllUser(){
        return userRepository.findAll().stream().map(converter::convertEntityToDto).toList();
    }

    @PostMapping("/register")
    ResponseEntity<ResponseObject> registerUser(@RequestParam("name") String name, @RequestParam("email") String email,
                                                @RequestParam("username") String username, @RequestParam("password") String pass,
                                                @RequestParam("confirmPass") String confirmPass,
                                                @RequestParam("birthDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date birthDate) {

        ResponseObject responseObject = userServiceImple.register(name, email, username,birthDate, pass, confirmPass);
        return ResponseEntity.status(HttpStatus.OK).body(responseObject);
    }

    @PostMapping("/verify_registration")
    ResponseEntity<ResponseObject> verifyRegistration(@RequestParam("otp") String otpCode, @RequestParam("email") String email) {
        return ResponseEntity.ok(userServiceImple.verifyRegister(otpCode, email));
    }

    @PostMapping("/forgot_password")
    ResponseEntity<ResponseObject> forgotPassword(@RequestParam("username") String username, @RequestParam("email") String email) {
        return ResponseEntity.ok(userServiceImple.forgotPassword(username, email));
    }

    @PostMapping("/verify_resetPassword")
    ResponseEntity<?> verifyResetPassword(@RequestParam("otp") String otpCode, @RequestParam String email) {
        return ResponseEntity.ok(userServiceImple.verifyResetPassword(otpCode, email));
    }

    @PostMapping("/reset_password")
    ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String newPass, @RequestParam String confirmPass) {
        return ResponseEntity.ok(userServiceImple.resetPassword(email, newPass, confirmPass));
    }

    @PostMapping("u/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestParam("username") String username, @RequestParam("password") String pass) throws Exception {

        authenticate(username, pass);

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(username);
        final String token = jwtService.generateToken(userDetails);
        userServiceImple.deleteExpiredPremiumPackage(userDetails.getUsername());
//        userServiceImple.updateStatusOnline(username);
        return ResponseEntity.ok(new Token(token));
    }
    @PostMapping("/logout")
    public void logout(@RequestParam String accessToken){
        invalidTokenService.logout(accessToken);
    }
    @PostMapping("user/change-password")
    ResponseEntity<?> changePasswordUser(@RequestParam("password") String oldpass,
                                         @RequestParam("newPass") String newPass, @RequestParam("confirmPass") String confirmPass,
                                         Authentication authentication) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            int check = userServiceImple.changePassword(username, oldpass, newPass, confirmPass);
            if (check == 0) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseObject(false, "Password incorrect!", ""));
            } else if (check == 1) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, "New password and Confirm password not match", ""));
            } else if (check == 2)
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true, "Change password success!", ""));
            else
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(validatePassword.checkPasswordValid(newPass));
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

    @PostMapping("/user/register_premium")
    ResponseEntity<?> registerPremium(Authentication authentication, @RequestParam("package_id") int packageId) {
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(userServiceImple.updatePremium(userDetails.getUsername(), packageId));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    
    @GetMapping("/user/user_premium")
    ResponseEntity<?> getUserPremium(Authentication authentication){
    	if (authentication != null) {
    		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    		UserPremium userPremium = userServiceImple.getUserPremium(userDetails.getUsername());
    		if(userPremium != null) {
    			return ResponseEntity.ok(userPremium);
    		}
    		return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(false, "Not register premium", ""));
    	}
    	return ResponseEntity.status(401).body("Unauthorized!");
    }
    
    @PostMapping("user/update_profile")
    ResponseEntity<?>updateProfile(Authentication authentication,@RequestParam String newName,@RequestParam String newPhoneNumber,@RequestParam String newIntro,@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date newBirthDate){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            userServiceImple.updateProfile(userDetails.getUsername(),newName,newPhoneNumber,newIntro,newBirthDate);
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @PostMapping("user/update_status")
    ResponseEntity<?>updateStatusOnline(Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            userServiceImple.updateStatusOnline(userDetails.getUsername());
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }

}
