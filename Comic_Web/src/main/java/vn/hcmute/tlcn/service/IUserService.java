package vn.hcmute.tlcn.service;

import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.UserDTO;

public interface IUserService {
    UserDTO getUser(String username,String password);
    Boolean checkUser(UserDTO userDTO);
    int checkRegisterCondition(String userName,String password,String confirmPass);
    ResponseObject register(String name, String email, String username, String pass, String conFirmPass);
    Boolean checkUserExist(String username);
}
