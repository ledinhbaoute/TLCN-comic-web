package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.hcmute.tlcn.primaryKey.SystemBankAccountKey;
import vn.hcmute.tlcn.entity.SystemBankAccount;

public interface SystemBankAccountRepository extends JpaRepository<SystemBankAccount, SystemBankAccountKey> {
}
