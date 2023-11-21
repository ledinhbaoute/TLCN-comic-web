package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.ReportReason;

import java.util.List;

@Repository
public interface ReportReasonRepository extends JpaRepository<ReportReason,Integer> {
    List<ReportReason>findAllByType(int type);
}
