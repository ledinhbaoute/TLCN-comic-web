package vn.hcmute.tlcn.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.UserDTO;

public interface IUserService {
    UserDTO getUser(String username);
    Boolean checkUser(UserDTO userDTO);
    int checkRegisterCondition(String userName,String password,String confirmPass);
    ResponseObject register(String name, String email, String username, String pass, String conFirmPass);
    Boolean checkUserExist(String username);
    int changePassword(String username,String password,String newPass,String confirmPass);
    ResponseEntity<ResponseObject> uploadAvatar(String username, MultipartFile file);
}
