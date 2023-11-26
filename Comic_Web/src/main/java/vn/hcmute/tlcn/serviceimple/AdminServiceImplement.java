package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.entity.Admin;
import vn.hcmute.tlcn.model.AdminDTO;
import vn.hcmute.tlcn.repository.AdminRepository;
import vn.hcmute.tlcn.service.IAdminService;

import java.util.Optional;

@Service
public class AdminServiceImplement implements IAdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private Converter converter;

    @Override
    public AdminDTO getInfoAdmin(String admin_username) {
        AdminDTO adminDTO=new AdminDTO();
        Optional<Admin> admin=adminRepository.findOneByUserName(admin_username);
        if(admin.isPresent()){
            adminDTO= converter.convertEntityToDto(admin.get());
        }
        return adminDTO;
    }

    @Transactional
    public void lockOrUnlockAccountUser(String username){
        User user=userRepository.findOneByUserName(username).orElse(null);
        if(user!=null){
            user.setLocked(!user.isLocked());
        }
    }

}
