package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.PackagePremium;
import vn.hcmute.tlcn.repository.PackagePremiumRepository;

import java.util.List;

@Service
public class PackagePremiumService {
    @Autowired
    PackagePremiumRepository packagePremiumRepository;
    public List<PackagePremium> getAllPackage(){
        return packagePremiumRepository.findAll();
    }
}
