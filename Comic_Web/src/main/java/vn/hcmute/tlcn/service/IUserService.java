package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import vn.hcmute.tlcn.entity.UserPremium;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.UserDTO;

import java.util.Date;


public interface IUserService {
    UserDTO getUser(String username);
    UserDTO getUserbyId(String userId);
    int checkRegisterCondition(String userName,String password,String confirmPass,String email);
    ResponseObject register(String name, String email, String username, Date birthDate, String pass, String conFirmPass);
    boolean checkUserExist(String username,String email);
    int changePassword(String username,String password,String newPass,String confirmPass);
    ResponseEntity<ResponseObject> uploadAvatar(String username, MultipartFile file);
    UserPremium getUserPremium(String username);
}
