package vn.hcmute.tlcn.model;

import vn.hcmute.tlcn.entity.ReportReason;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ComicReportDTO {
    private int id;

    private ComicBookDTO comicBook;

    private Date reportDate;
    private int status;

    public void setId(int id) {
        this.id = id;
    }

    public ComicReportDTO() {
    }
    public ComicReportDTO(ComicBookDTO comicBook, Date reportDate, int status) {
        this.comicBook = comicBook;
        this.reportDate = reportDate;
        this.status = status;
    }
    List<ReportReason> reportReasons=new ArrayList<>();

    public List<ReportReason> getReportReasons() {
        return reportReasons;
    }

    public void setReportReasons(List<ReportReason> reportReasons) {
        this.reportReasons = reportReasons;
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

    public String getReportDate() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        return formatter.format(reportDate);
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
