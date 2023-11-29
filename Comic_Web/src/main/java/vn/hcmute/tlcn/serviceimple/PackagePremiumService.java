package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.PackagePremium;
import vn.hcmute.tlcn.model.PackagePremiumDTO;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.repository.PackagePremiumRepository;
import vn.hcmute.tlcn.utils.Converter;

import java.util.List;

@Service
public class PackagePremiumService {
    @Autowired
    PackagePremiumRepository packagePremiumRepository;
    @Autowired
    Converter converter;
    public List<PackagePremiumDTO> getAllPackage(){
        return packagePremiumRepository.findAll().stream().map(p->converter.convertEntityToDto(p)).toList();
    }
    public ResponseObject addPackagePremium( PackagePremiumDTO packagePremiumDTO){
        PackagePremium packagePremium=new PackagePremium();
        packagePremium.setCost(packagePremiumDTO.getCost());
        packagePremium.setDuration(packagePremiumDTO.getDuration());
        return new ResponseObject(true,"Success!",packagePremiumRepository.save(packagePremium));
    }
    public ResponseObject updatePackagePremium(int id, int newCost, int newDuration){
        PackagePremium packagePremium=packagePremiumRepository.findById(id).orElse(null);
        if(packagePremium==null)
            return new ResponseObject(false,"Package not exist!","");
        packagePremium.setDuration(newDuration);
        packagePremium.setCost(newCost);
        return new ResponseObject(true,"Success!",converter.convertEntityToDto(packagePremiumRepository.save(packagePremium)));
    }
}
