package vn.hcmute.tlcn.securiry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.repository.UserRepository;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findOneByUserName(username).orElseThrow(()->new UsernameNotFoundException("User not found!"));
        CustomUserDeTails customUserDeTails=new CustomUserDeTails(user, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        return customUserDeTails;
    }

}
