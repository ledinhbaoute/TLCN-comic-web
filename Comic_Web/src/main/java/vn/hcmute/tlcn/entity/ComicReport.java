package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "comic_report")
public class ComicReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "comic_id")
    private ComicBook comicBook;
    @Column(name = "report_date")
    private Date reportDate;
    private int status;
    @ManyToMany()
    @JoinTable(name="comic_report_reasons",joinColumns = @JoinColumn(name = "report_id"),
            inverseJoinColumns = @JoinColumn(name = "reason_id"))
    List<ReportReason>reportReasons=new ArrayList<>();
    public List<ReportReason> getReportReasons() {
        return reportReasons;
    }

    public void setReportReasons(List<ReportReason> reportReasons) {
        this.reportReasons = reportReasons;
    }
    public ComicReport() {
    }

    public ComicReport(ComicBook comicBook, Date reportDate, int status) {
        this.comicBook = comicBook;
        this.reportDate = reportDate;
        this.status = status;
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
