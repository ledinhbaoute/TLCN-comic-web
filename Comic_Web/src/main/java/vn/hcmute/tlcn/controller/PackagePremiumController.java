package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.PackagePremium;
import vn.hcmute.tlcn.model.PackagePremiumDTO;
import vn.hcmute.tlcn.serviceimple.PackagePremiumService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PackagePremiumController {
    @Autowired
    PackagePremiumService packagePremiumService;
    @GetMapping("/package_premium")
    List<PackagePremiumDTO>getAllPackage(){
        return packagePremiumService.getAllPackage();
    }
    @PostMapping("admin/package_premium")
    ResponseEntity<?>addPackagePremium(Authentication authentication, @RequestBody PackagePremiumDTO packagePremiumDTO){
        if(authentication!=null){
            return ResponseEntity.ok(packagePremiumService.addPackagePremium(packagePremiumDTO));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @PutMapping("admin/package_premium")
    ResponseEntity<?>updatePackagePremium(Authentication authentication, @RequestParam int packageId,@RequestParam int newCost,
                                          @RequestParam int newDuration){
        if(authentication!=null){
            return ResponseEntity.ok(packagePremiumService.updatePackagePremium(packageId,newCost,newDuration));
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
}
