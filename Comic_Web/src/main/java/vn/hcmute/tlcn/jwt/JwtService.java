package vn.hcmute.tlcn.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtService {
    private String JWT_SECRET="quy123";
    private int JWT_EXPIRE=24*60*60*1000/6;
    public String generateToken(UserDetails userDetails){
        List<String> roles=userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        Date now=new Date();
        Date expireDate=new Date(now.getTime()+JWT_EXPIRE);
        return Jwts.builder().setSubject(userDetails.getUsername())
                .claim("role",roles)
                .setExpiration(expireDate)
                .setIssuedAt(now).setHeaderParam("typ","Jwt")
                .signWith(SignatureAlgorithm.HS512,JWT_SECRET)
                .compact();
    }
    public String getUserNameFromToken(String token){
        Claims claims=Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
    public List<String> getRoleFromToken(String token){
        Claims claims=Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();
        return (List<String>) claims.get("role");
    }
    public Date getExpiredDateFromToken(String token){
        Claims claims=Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();
        return claims.getExpiration();
    }
    private boolean isTokenExpired(String token){
        final Date expiredDate=getExpiredDateFromToken(token);
        return expiredDate.before(new Date());
    }

    public boolean validateToken(String authToken, UserDetails userDetails){
        return getUserNameFromToken(authToken).equals(userDetails.getUsername()) && !isTokenExpired(authToken);
    }
}
