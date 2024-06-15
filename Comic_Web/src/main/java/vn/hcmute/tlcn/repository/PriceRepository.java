package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.hcmute.tlcn.entity.Price;

public interface PriceRepository extends JpaRepository<Price,Integer> {
    Price findOneByType(int type);

}
