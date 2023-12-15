package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.Transaction;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,String> {
    List<Transaction>findAllByWallet_User_UserNameOrderByCreatedAtDesc(String userName);
    List<Transaction>findAllByTypeOrderByCreatedAtDesc(int type);
}
