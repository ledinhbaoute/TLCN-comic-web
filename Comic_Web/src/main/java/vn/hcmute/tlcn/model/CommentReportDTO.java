package vn.hcmute.tlcn.model;

import vn.hcmute.tlcn.entity.Comment;
import vn.hcmute.tlcn.entity.ReportReason;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CommentReportDTO {
    private int id;

    private CommentDTO comment;

    private Date reportDate;
    private int status;
    List<ReportReason> reportReason=new ArrayList<>();

    public CommentReportDTO() {
    }

    public CommentReportDTO(int id,CommentDTO comment, Date reportDate, int status) {
        this.id=id;
        this.comment = comment;
        this.reportDate = reportDate;
        this.status = status;
    }

    public void setId(int id) {
        this.id = id;
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

    public CommentDTO getComment() {
        return comment;
    }

    public void setComment(CommentDTO comment) {
        this.comment = comment;
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
