package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.Donate;

import java.util.List;

@Repository
public interface DonateRepository extends JpaRepository<Donate,String> {
    List<Donate>findAllByDonateWallet_User_UserNameOrderByDonateDateDesc(String username);
    List<Donate>findAllByReceiverWallet_User_UserNameOrderByDonateDateDesc(String username);
}
