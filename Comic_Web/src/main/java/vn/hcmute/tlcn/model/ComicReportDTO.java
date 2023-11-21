package vn.hcmute.tlcn.model;

import java.util.Date;

public class ComicReportDTO {
    private int id;

    private ComicBookDTO comicBook;

    private Date reportDate;
    private int status;

    public ComicReportDTO() {
    }
    public ComicReportDTO(ComicBookDTO comicBook, Date reportDate, int status) {
        this.comicBook = comicBook;
        this.reportDate = reportDate;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public ComicBookDTO getComicBook() {
        return comicBook;
    }

    public void setComicBook(ComicBookDTO comicBook) {
        this.comicBook = comicBook;
    }

    public Date getReportDate() {
        return reportDate;
    }

    public void setReportDate(Date reportDate) {
        this.reportDate = reportDate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
