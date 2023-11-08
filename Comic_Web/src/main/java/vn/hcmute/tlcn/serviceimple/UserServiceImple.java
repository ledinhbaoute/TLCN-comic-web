package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.converter.Converter;
import vn.hcmute.tlcn.converter.GenerateId;
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
        else return new ResponseObject(false,"Password and confirm password doesn't match!","");

    }

    @Override
    public Boolean checkUserExist(String username) {
        boolean f = false;
        Optional<User> user = userRepository.findOneByUserName(username);
        if ((user.isPresent()))
            f = true;
        return f;

    }


}
