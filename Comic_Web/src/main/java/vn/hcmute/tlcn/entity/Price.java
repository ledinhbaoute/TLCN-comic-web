package vn.hcmute.tlcn.entity;

public class Price {
    private int id;
    private String type;
    private int cost;

    public Price() {
    }

    public Price(int id, String type, int cost) {
        this.id = id;
        this.type = type;
        this.cost = cost;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }
}
