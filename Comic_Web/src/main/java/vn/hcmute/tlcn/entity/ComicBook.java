package vn.hcmute.tlcn.entity;

import jakarta.persistence.*;
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
    private float rate;
    @Column(name = "publish_date")
    private Date publishDate;
    @Column(name="update_date")
    private Date updateDate;
    private int status;

    @ManyToMany()
    @JoinTable(name="comicbooks_genres",joinColumns = @JoinColumn(name = "comicbook_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))

    private List<Genre> genres=new ArrayList<>();


    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public ComicBook() {
    }

    public ComicBook(String id, String name, Boolean isPremium, User actorId, int view, float rate, Date publishDate, Date updateDate, int status) {
        this.id = id;
        this.name = name;
        this.isPremium = isPremium;
        this.actor = actorId;
        this.view = view;
        this.rate = rate;
        this.publishDate = publishDate;
        this.updateDate = updateDate;
        this.status = status;
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
}
