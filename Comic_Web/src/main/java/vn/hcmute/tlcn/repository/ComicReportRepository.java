package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.ComicReport;

@Repository
public interface ComicReportRepository extends JpaRepository<ComicReport,Integer> {
}
