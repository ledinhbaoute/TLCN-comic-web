package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    private Converter converter;

    @Override
    public AdminDTO getInfoAdmin(String admin_username, String password) {
        AdminDTO adminDTO=new AdminDTO();
        Optional<Admin> admin=adminRepository.findByUserNameAndPassword(admin_username,password);
        if(admin.isPresent()){
            adminDTO= converter.convertEntityToDto(admin.get());
        }
        return adminDTO;
    }

    @Override
    public Boolean checkAdmin(AdminDTO adminDTO) {
        boolean f=false;
       if(adminDTO.getUserName()!=null && adminDTO.getPassword()!=null)
           f=true;
        return f;
    }
}
