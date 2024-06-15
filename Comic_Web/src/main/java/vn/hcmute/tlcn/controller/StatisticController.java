package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.hcmute.tlcn.entity.Announce;
import vn.hcmute.tlcn.model.ComicViewCount;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.Statistic;
import vn.hcmute.tlcn.utils.Statistical;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class StatisticController{
    @Autowired
    Statistical statistical;
    @GetMapping("/admin/statistic/byYear")
    public ResponseEntity<?>getAdminStatisticByYear(Authentication authentication,@RequestParam int year){
        if(authentication!=null){
            UserDetails userDetails=(UserDetails) authentication.getPrincipal();
            if(userDetails.getAuthorities().stream().anyMatch((grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN")))){
                Statistic statistic=statistical.getStatisticalAdminByYear(year);
                return ResponseEntity.ok(new ResponseObject(true,"Success!",statistic));
            }
            else return ResponseEntity.status(403).body(new ResponseObject(false,"Only Admin can access!",""));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseObject(false,"Unauthorized!",""));

    }
    @GetMapping("/admin/statistic/byMonth")
    public ResponseEntity<?>getAdminStatisticByMonth(Authentication authentication,@RequestParam int year, @RequestParam int month){
        if(authentication!=null){
            UserDetails userDetails=(UserDetails) authentication.getPrincipal();
            if(userDetails.getAuthorities().stream().anyMatch((grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN")))){
                Statistic statistic=statistical.getStatisticalAdminByMonth(year,month);
                return ResponseEntity.ok(new ResponseObject(true,"Success!",statistic));
            }
            else return ResponseEntity.status(403).body(new ResponseObject(false,"Only Admin can access!",""));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseObject(false,"Unauthorized!",""));

    }
    @GetMapping("user/tke")
    public ResponseEntity<?>getTK(Authentication authentication, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate){
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.OK).body(statistical.getProfits(startDate,endDate,userDetails.getUsername()));
    }
    @GetMapping("/admin/statistic/userAge")
    public ResponseEntity<?> getUserRegistrationCountByMonth() {
        return ResponseEntity.ok(statistical.getUserAgeDistribution());
    }
    @GetMapping("/admin/comicTrending")
    List<Object[]> getTrending2() {
        return statistical.getComicTrending();
    }
    @GetMapping("/user/comicTrendingActor")
    List<ComicViewCount> getTrendingByActor(Authentication authentication) {
        UserDetails userDetails= (UserDetails) authentication.getPrincipal();
        return statistical.getComicTrendingByActor(userDetails.getUsername());
    }
    @GetMapping("test")
    List<Announce>test(){
        return statistical.test();
    }
}
