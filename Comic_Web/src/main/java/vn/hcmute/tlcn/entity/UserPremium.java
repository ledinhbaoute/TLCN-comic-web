package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_premium")
public class UserPremium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "user_id",unique = true)
    private User user;
    @ManyToOne
    @JoinColumn(name = "package_id")
    private PackagePremium packagePremium;
    @Column(name = "start_date")
    private Date startDate;

    public UserPremium() {
    }

    public int getId() {
        return id;
    }

    public UserPremium(User user, PackagePremium packagePremium, Date startDate) {
        this.user = user;
        this.packagePremium = packagePremium;
        this.startDate = startDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PackagePremium getPackagePremium() {
        return packagePremium;
    }

    public void setPackagePremium(PackagePremium packagePremium) {
        this.packagePremium = packagePremium;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
}
