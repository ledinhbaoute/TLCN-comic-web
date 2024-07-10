package vn.hcmute.tlcn.model;

import java.util.Date;

public class ChapterDTO {
    private String id;
    private String chapterName;
     private ComicBookDTO comicBookDTO;

     private Date publishDate;

    private int ordinalNumber;
    private boolean open;
    private  boolean isAccepted;

    public ChapterDTO() {
    }

    public ChapterDTO(String id, String chapterName, ComicBookDTO comicBook_Id, Date publishDate, int ordinalNumber,boolean isAccepted) {
        this.id = id;
        this.chapterName = chapterName;
        this.comicBookDTO = comicBook_Id;
        this.publishDate = publishDate;
        this.ordinalNumber = ordinalNumber;
        this.isAccepted=isAccepted;
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

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }

    public String getChapterName() {
        return chapterName;
    }

    public void setChapterName(String chapterName) {
        this.chapterName = chapterName;
    }

    public ComicBookDTO getComicBook_Id() {
        return comicBookDTO;
    }

    public void setComicBook_Id(ComicBookDTO comicBook_Id) {
        this.comicBookDTO = comicBook_Id;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public int getOrdinalNumber() {
        return ordinalNumber;
    }

    public void setOrdinalNumber(int ordinalNumber) {
        this.ordinalNumber = ordinalNumber;
    }
}
