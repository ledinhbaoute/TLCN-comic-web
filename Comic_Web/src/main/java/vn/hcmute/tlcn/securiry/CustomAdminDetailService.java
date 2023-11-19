package vn.hcmute.tlcn.securiry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.Admin;
import vn.hcmute.tlcn.repository.AdminRepository;

@Service
public class CustomAdminDetailService implements UserDetailsService {
    @Autowired
    private AdminRepository adminRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin=adminRepository.findOneByUserName(username).orElseThrow(()->new UsernameNotFoundException("Admin not found!"));
        CustomAdminDetails customAdminDetails =new CustomAdminDetails(admin);
        return new User(admin.getUserName(),admin.getPassword(),customAdminDetails.getAuthorities());
    }
}
