package vn.hcmute.tlcn.securiry;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import vn.hcmute.tlcn.entity.User;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDeTails implements UserDetails {
    private User user;
    private Collection<? extends GrantedAuthority> authorities;
    private boolean accountNonLocked;
    public CustomUserDeTails(User user,Collection<? extends GrantedAuthority> authorities) {
        this.user = user;
        this.authorities=authorities;
        this.accountNonLocked=!user.isLocked();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
