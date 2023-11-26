package vn.hcmute.tlcn.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "report_reasons")
public class ReportReason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String reason;
    private int type;

    @ManyToMany(mappedBy ="reportReasons" )
    private List<ComicReport>comicReports=new ArrayList<>();
    @ManyToMany(mappedBy = "reportReason")
    private List<CommentReport>commentReports=new ArrayList<>();

    public ReportReason() {
    }

    public ReportReason(String reason, int type) {
        this.reason = reason;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
