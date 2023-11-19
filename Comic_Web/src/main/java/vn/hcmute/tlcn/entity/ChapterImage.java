package vn.hcmute.tlcn.entity;

import javax.persistence.*;

@Entity
@Table(name = "images")
public class ChapterImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;
    private String link;
    @Column(name = "ordinal_number")
    private int ordinalNumber;

    public ChapterImage() {
    }
    public ChapterImage(Chapter chapters, String link, int ordinalNumber) {
        this.chapter = chapters;
        this.link = link;
        this.ordinalNumber = ordinalNumber;
    }

    public int getId() {
        return id;
    }

    public Chapter getChapter() {
        return chapter;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public int getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(int ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }
}
