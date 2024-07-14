package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.Price;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.repository.PriceRepository;

import java.util.List;

@Service
public class PriceService {
    @Autowired
    PriceRepository priceRepository;
    public List<Price> getAllPrice(){
        return priceRepository.findAll();
    }
    public ResponseObject updatePrice(int id,int newView,int newCost){
        Price price=priceRepository.findById(id).orElse(null);
        if(price==null)
            return new ResponseObject(false,"Không tồn tại","");

        price.setCost(newCost);
        price.setView(newView);
        return new ResponseObject(true,"Cập nhật thành công",priceRepository.save(price));

    }
}
