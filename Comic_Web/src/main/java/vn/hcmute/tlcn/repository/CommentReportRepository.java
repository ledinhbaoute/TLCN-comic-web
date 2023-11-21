package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.hcmute.tlcn.entity.CommentReport;

public interface CommentReportRepository extends JpaRepository<CommentReport,Integer> {
}
