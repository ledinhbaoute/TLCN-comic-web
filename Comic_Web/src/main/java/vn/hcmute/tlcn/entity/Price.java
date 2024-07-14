package vn.hcmute.tlcn.entity;

import javax.persistence.*;

@Entity
@Table(name = "price")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int view;
    private int cost;
    private int type;

    public Price() {
    }

    public Price(int id, int view, int cost,int type) {
        this.id = id;
        this.view=view;
        this.cost = cost;
        this.type=type;
    }

    public int getId() {
        return id;
    }

    public int getView() {
        return view;
    }

    public void setView(int view) {
        this.view = view;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }
}
