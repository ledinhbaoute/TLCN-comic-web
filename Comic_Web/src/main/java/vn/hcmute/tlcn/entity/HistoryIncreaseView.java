package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "history_increase_view")
public class HistoryIncreaseView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "comic_id")
    private ComicBook comicBook;
    @Column(name = "date_increase")
    private Date increaseDate;

    public HistoryIncreaseView() {
    }

    public HistoryIncreaseView(ComicBook comicBook, Date increaseDate) {
        this.comicBook = comicBook;
        this.increaseDate = increaseDate;
    }

    public int getId() {
        return id;
    }



    public ComicBook getComicBook() {
        return comicBook;
    }

    public void setComicBook(ComicBook comicBook) {
        this.comicBook = comicBook;
    }

    public Date getIncreaseDate() {
        return increaseDate;
    }

    public void setIncreaseDate(Date increaseDate) {
        this.increaseDate = increaseDate;
    }
}
