package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import vn.hcmute.tlcn.entity.UserPremium;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.UserDTO;



public interface IUserService {
    UserDTO getUser(String username);
    int checkRegisterCondition(String userName,String password,String confirmPass,String email);
    ResponseObject register(String name, String email, String username, String pass, String conFirmPass);
    boolean checkUserExist(String username,String email);
    int changePassword(String username,String password,String newPass,String confirmPass);
    ResponseEntity<ResponseObject> uploadAvatar(String username, MultipartFile file);
    UserPremium getUserPremium(String username);
}
