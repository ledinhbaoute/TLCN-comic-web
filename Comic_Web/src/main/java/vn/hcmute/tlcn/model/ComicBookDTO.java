package vn.hcmute.tlcn.model;

import org.springframework.format.annotation.DateTimeFormat;
import vn.hcmute.tlcn.entity.User;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ComicBookDTO {
    private String id;
    private String name;
    private Boolean isPremium;

    private UserDTO actor;
    private int view;
    private int preview;
    private float rate;
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private Date publishDate;
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private Date updateDate;
    private int status;
    private String image;
    private String discription;
    private boolean open;


    private List<GenreDTO> genres=new ArrayList<>();

    public List<GenreDTO> getGenres() {
        return genres;
    }

    public void setGenres(List<GenreDTO> genres) {
        this.genres = genres;
    }

    public ComicBookDTO() {
    }

    public ComicBookDTO(String id, String name, Boolean isPremium, UserDTO actorId, int view, float rate, Date publishDate, Date updateDate, int status,String discription,String image,int preview) {
        this.id = id;
        this.name = name;
        this.isPremium = isPremium;
        this.actor = actorId;
        this.view = view;
        this.rate = rate;
        this.publishDate = publishDate;
        this.updateDate = updateDate;
        this.status = status;
        this.image=image;
        this.discription=discription;
        this.preview=preview;
    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getPremium() {
        return isPremium;
    }

    public void setPremium(Boolean premium) {
        isPremium = premium;
    }

    public UserDTO getActorId() {
        return actor;
    }

    public void setActorId(UserDTO actorId) {
        this.actor = actorId;
    }

    public int getView() {
        return view;
    }

    public void setView(int view) {
        this.view = view;
    }

    public float getRate() {
        return rate;
    }

    public void setRate(float rate) {
        this.rate = rate;
    }

    public String getPublishDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        return formatter.format(publishDate);
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public String getUpdateDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        return formatter.format(updateDate);
    }
    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getPreview() {
        return preview;
    }

    public void setPreview(int preview) {
        this.preview = preview;
    }
}
