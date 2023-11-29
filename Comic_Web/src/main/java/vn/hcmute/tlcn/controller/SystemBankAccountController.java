package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.entity.SystemBankAccount;
import vn.hcmute.tlcn.repository.SystemBankAccountRepository;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/system-bank-account")
public class SystemBankAccountController {
    @Autowired
    private SystemBankAccountRepository systemBankAccountRepository;

    @GetMapping("")

    ResponseEntity<ResponseObject> getSystemBankAccount(){
        List<SystemBankAccount> systemBankAccounts=systemBankAccountRepository.findAll();
        if(!systemBankAccounts.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(true,"Query Successful!",systemBankAccounts));
        }
        else return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false,"Not executed!",""));
        }


    }

