package vn.hcmute.tlcn.model;

public class PackagePremiumDTO {

    private int id;
    private int cost;
    private int duration;

    public PackagePremiumDTO(int cost, int duration) {
        this.cost = cost;
        this.duration = duration;
    }
    public PackagePremiumDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
