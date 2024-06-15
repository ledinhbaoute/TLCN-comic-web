package vn.hcmute.tlcn.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="comicbooks")
public class ComicBook {

    @Id
    private String id;
    private String name;
    private Boolean isPremium;
    @ManyToOne
    @JoinColumn(name="actor_id")
    private User actor;
    private int view;
    @Column(name = "pre_view")
    private int preview;
    private float rate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    @Column(name = "publish_date")
    private Date publishDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    @Column(name="update_date")
    private Date updateDate;
    private int status;
    private String image;
    private String discription;
    @Column(name = "public")
    private boolean open;
    @ManyToMany()
    @JoinTable(name="comicbooks_genres",joinColumns = @JoinColumn(name = "comicbook_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))

    private List<Genre> genres=new ArrayList<>();

    @OneToMany(mappedBy = "comicBook",cascade = CascadeType.ALL)
    private List<Chapter>chapters;
    @OneToMany(mappedBy = "comicBook",cascade = CascadeType.ALL)
    private List<ComicReport>comicReports;
    @OneToMany(mappedBy = "comicBook",cascade = CascadeType.ALL)
    private List<Rating>ratings;
    @OneToMany(mappedBy = "comicBook",cascade = CascadeType.ALL)
    private List<HistoryIncreaseView>historyIncreaseViews;
    @OneToMany(mappedBy = "comicBook",cascade = CascadeType.ALL)
    private List<FavoriteComic>favoriteComics;
    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public ComicBook() {
    }

    public ComicBook(String id, String name, Boolean isPremium, User actorId, int view, float rate, Date publishDate, Date updateDate, int status,String image,String discription) {
        this.id = id;
        this.name = name;
        this.isPremium = isPremium;
        this.actor = actorId;
        this.view = view;
        this.rate = rate;
        this.publishDate = publishDate;
        this.updateDate = updateDate;
        this.status = status;
        this.discription=discription;
        this.image=image;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
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

    public User getActorId() {
        return actor;
    }

    public void setActorId(User actorId) {
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

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public Date getUpdateDate() {
        return updateDate;
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

    public int getPreview() {
        return preview;
    }

    public void setPreview(int preview) {
        this.preview = preview;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
