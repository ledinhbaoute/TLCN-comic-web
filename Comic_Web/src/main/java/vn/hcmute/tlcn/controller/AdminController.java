package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.hcmute.tlcn.entity.ResponseObject;
import vn.hcmute.tlcn.model.AdminDTO;
import vn.hcmute.tlcn.service.IAdminService;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {
    @Autowired
    private IAdminService service;
    @PostMapping("/login")
    ResponseEntity<ResponseObject> adminLogin(@RequestParam("adUsername")String adUsername,@RequestParam("password")String password){
        AdminDTO adminDTO=service.getInfoAdmin(adUsername,password);
        if(service.checkAdmin(adminDTO)){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Login Success!",adminDTO));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseObject(false,"Login Failed!",""));
    }
}
