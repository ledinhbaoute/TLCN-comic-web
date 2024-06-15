package vn.hcmute.tlcn.model;

public class Statistic {
    private int n_user;
    private int n_comic;
    private int n_userPremium;
    private int n_wallet;
    private int n_genre;
    private int[] data;

    public Statistic() {
    }

    public Statistic(int n_user, int n_comic, int n_userPremium, int n_wallet, int n_genre,int[] data) {
        this.n_user = n_user;
        this.n_comic = n_comic;
        this.n_userPremium = n_userPremium;
        this.n_wallet = n_wallet;
        this.n_genre = n_genre;
        this.data=data;
    }

    public int[] getData() {
        return data;
    }

    public void setData(int[] data) {
        this.data = data;
    }

    public int getN_user() {
        return n_user;
    }

    public void setN_user(int n_user) {
        this.n_user = n_user;
    }

    public int getN_comic() {
        return n_comic;
    }

    public void setN_comic(int n_comic) {
        this.n_comic = n_comic;
    }

    public int getN_userPremium() {
        return n_userPremium;
    }

    public void setN_userPremium(int n_userPremium) {
        this.n_userPremium = n_userPremium;
    }

    public int getN_wallet() {
        return n_wallet;
    }

    public void setN_wallet(int n_wallet) {
        this.n_wallet = n_wallet;
    }

    public int getN_genre() {
        return n_genre;
    }

    public void setN_genre(int n_genre) {
        this.n_genre = n_genre;
    }
}
