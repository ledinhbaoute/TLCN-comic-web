package vn.hcmute.tlcn.entity;

import javax.persistence.*;

@Entity
@Table(name = "package_premium")
public class PackagePremium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int cost;
    private int duration;

    public PackagePremium(int cost, int duration) {
        this.cost = cost;
        this.duration = duration;
    }

    public PackagePremium() {
    }

    public int getId() {
        return id;
    }


    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

}
