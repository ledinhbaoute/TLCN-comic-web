package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.InvalidToken;
import vn.hcmute.tlcn.jwt.JwtService;
import vn.hcmute.tlcn.repository.InvalidTokenRepo;

import java.util.Date;

@Service
public class InvalidTokenService {
    @Autowired
    JwtService jwtService;
    @Autowired
    InvalidTokenRepo invalidTokenRepo;
    public void logout(String token){
        String tokenId= jwtService.getTokenIdFromToken(token);
        Date expireTime=jwtService.getExpiredDateFromToken(token);
        InvalidToken invalidToken=new InvalidToken(tokenId,expireTime);
        invalidTokenRepo.save(invalidToken);
    }
}
