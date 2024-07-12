package vn.hcmute.tlcn.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class ActivityFilter extends OncePerRequestFilter {
    @Autowired
    private UserRepository userRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user = userRepository.findOneByUserName(username).orElse(null);
            if (user != null) {
                // Cập nhật thời gian hoạt động cuối cùng
                user.setLastActiveTime(new Date());
                userRepository.save(user);
            }
        }

        // Tiếp tục thực hiện các Filter khác trong chain và xử lý yêu cầu bởi controller
        filterChain.doFilter(request, response);

    }
}
