package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.Price;
import vn.hcmute.tlcn.serviceimple.PriceService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PriceController {
    @Autowired
    PriceService priceService;
    @GetMapping("/admin/price")
    List<Price>getAllPrice(){
        return priceService.getAllPrice();
    }
    @PostMapping("/admin/price")
    ResponseEntity<?>updatePrice(@RequestParam int id,@RequestParam int newView,@RequestParam int newCost){
        return ResponseEntity.ok(priceService.updatePrice(id,newView,newCost));
    }
}
