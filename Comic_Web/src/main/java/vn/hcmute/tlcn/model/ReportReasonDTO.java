package vn.hcmute.tlcn.model;

import vn.hcmute.tlcn.entity.ComicReport;
import vn.hcmute.tlcn.entity.CommentReport;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;

public class ReportReasonDTO {

    private int id;
    private String reason;
    private int type;

    public ReportReasonDTO() {
    }

    public ReportReasonDTO(int id, String reason, int type) {
        this.id = id;
        this.reason = reason;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
