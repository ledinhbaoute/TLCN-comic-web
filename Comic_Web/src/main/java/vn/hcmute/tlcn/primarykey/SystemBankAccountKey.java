package vn.hcmute.tlcn.primarykey;

import java.io.Serializable;

public class SystemBankAccountKey implements Serializable {
    private String bank_Account;
    private String bank_Name;

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
