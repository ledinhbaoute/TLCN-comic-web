package vn.hcmute.tlcn.model;

public class SystemBankAccountDTO {

    private String bank_Account;

    private String bank_Name;

    public SystemBankAccountDTO() {
    }

    public SystemBankAccountDTO(String bankAccount, String bankName) {
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
