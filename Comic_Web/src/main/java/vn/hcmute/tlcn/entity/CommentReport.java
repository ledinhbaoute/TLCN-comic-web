package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "comment_report")
public class CommentReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;
    @Column(name = "report_date")
    private Date reportDate;
    private int status;
    @ManyToMany
    @JoinTable(name="comment_report_reasons",joinColumns = @JoinColumn(name = "report_id"),
            inverseJoinColumns = @JoinColumn(name = "reason_id"))
    List<ReportReason>reportReason=new ArrayList<>();

    public CommentReport() {
    }

    public CommentReport(Comment comment, Date reportDate, int status) {
        this.comment = comment;
        this.reportDate = reportDate;
        this.status = status;
    }

    public List<ReportReason> getReportReasons() {
        return reportReason;
    }

    public void setReportReasons(List<ReportReason> reportReasons) {
        this.reportReason = reportReasons;
    }

    public int getId() {
        return id;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
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
