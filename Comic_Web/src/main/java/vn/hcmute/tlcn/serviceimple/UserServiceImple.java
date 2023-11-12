package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.utils.GenerateId;
import vn.hcmute.tlcn.utils.ValidatePassword;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.model.UserDTO;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.service.IUserService;

import java.util.Optional;

@Service
public class UserServiceImple implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Converter converter;
    @Autowired
    private GenerateId generateId;
    @Autowired
    ValidatePassword validatePassword;
    @Autowired
    ImageStorageService imageStorageService;

    @Override
    public UserDTO getUser(String username, String password) {
        UserDTO userDTO = new UserDTO();
        Optional<User> user = userRepository.findOneByUserNameAndPassword(username, password);
        if (user.isPresent())
            userDTO = converter.convertEntityToDto(user.get());
        return userDTO;
    }

    @Override
    public Boolean checkUser(UserDTO userDTO) {
        boolean f = false;
        if (userDTO.getUserName() != null && userDTO.getPassword() != null)
            f = true;
        return f;
    }

    @Override
    public int checkRegisterCondition(String userName, String password, String confirmPass) {
        int check = 0;
        if (checkUserExist(userName))
            check = 1;
        else if(!validatePassword.checkPasswordValid(password).isStatus())
            check=3;

        else if (!password.equals(confirmPass))
            check = 2;
        return check;
    }

    @Override
    public ResponseObject register(String name, String email, String username, String pass, String conFirmPass) {
        User user;
        UserDTO userDTO=new UserDTO();
        int check=checkRegisterCondition(username, pass, conFirmPass);
        if (check == 0) {
            user = new User(generateId.generateId(), name, null, false, email, "+84xxx",
                    username, pass, 0, null, null, 1);
            userDTO=converter.convertEntityToDto( userRepository.saveAndFlush(user));
            return new ResponseObject(true,"Register Success!",userDTO);
        }
        else if(check==1){
            return new ResponseObject(false,"User name already exist!","");
        }
        else if (check==2)
            return new ResponseObject(false,"Password and confirm password doesn't match!","");
        else return validatePassword.checkPasswordValid(pass);
    }

    @Override
    public Boolean checkUserExist(String username) {
        boolean f = false;
        Optional<User> user = userRepository.findOneByUserName(username);
        if ((user.isPresent()))
            f = true;
        return f;

    }

    @Override
    public int changePassword(String username, String password,String newPass, String confirmPass) {
        int check=0;
        Optional<User>optionalUser=userRepository.findOneByUserNameAndPassword(username,password);
        if(!optionalUser.isPresent())
             return check;
        User user=optionalUser.get();
        if(!validatePassword.checkPasswordValid(newPass).isStatus())
            check=3;
        else if(!newPass.equals(confirmPass))
            check=1;
        else {
            check=2;
            user.setPassword(confirmPass);
            userRepository.saveAndFlush(user);
        }
        return check;

    }

    @Override
    public ResponseEntity<ResponseObject> uploadAvatar(String username, String password, MultipartFile file) {
        Optional<User>optionalUser=userRepository.findOneByUserNameAndPassword(username,password);
        if(!optionalUser.isPresent())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseObject(false,"Username or password not valid!",""));
        User user=optionalUser.get();
        try {
            String avatarfileName=imageStorageService.storeFile(file);
            user.setAvatar(avatarfileName);
            user=userRepository.save(user);
            return ResponseEntity.ok(new ResponseObject(true,"Update Avatar Success!",user));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,e.getMessage(),""));
        }
    }


}
