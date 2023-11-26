package vn.hcmute.tlcn.model;

import vn.hcmute.tlcn.entity.PackagePremium;
import vn.hcmute.tlcn.entity.User;

import java.util.Date;

public class UsePremiumDTO {

    private int id;
    private UserDTO user;

    private PackagePremiumDTO packagePremium;

    private Date startDate;

    public UsePremiumDTO() {
    }

    public UsePremiumDTO(int id,UserDTO user, PackagePremiumDTO packagePremium, Date startDate) {
        this.id=id;
        this.user = user;
        this.packagePremium = packagePremium;
        this.startDate = startDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserDTO getUserDTO() {
        return user;
    }

    public void setUserDTO(UserDTO user) {
        this.user = user;
    }

    public PackagePremiumDTO getPackagePremiumDTO() {
        return packagePremium;
    }

    public void setPackagePremiumDTO(PackagePremiumDTO packagePremium) {
        this.packagePremium = packagePremium;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
}
