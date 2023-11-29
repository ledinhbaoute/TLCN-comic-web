package vn.hcmute.tlcn.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import vn.hcmute.tlcn.primarykey.SystemBankAccountKey;

@Entity
@Table(name = "system_bank_account")
@IdClass(SystemBankAccountKey.class)
public class SystemBankAccount {
    @Id
    private String bank_Account;
    @Id
    private String bank_Name;

    public SystemBankAccount() {
    }

    public SystemBankAccount(String bankAccount, String bankName) {
        this.bank_Account = bankAccount;
        this.bank_Name = bankName;
    }

    public String getBankAccount() {
        return bank_Account;
    }

    public void setBankAccount(String bankAccount) {
        this.bank_Account = bankAccount;
    }

    public String getBankName() {
        return bank_Name;
    }

    public void setBankName(String bankName) {
        this.bank_Name = bankName;
    }
}
