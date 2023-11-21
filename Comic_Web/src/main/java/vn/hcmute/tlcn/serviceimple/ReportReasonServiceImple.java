package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.ReportReason;
import vn.hcmute.tlcn.repository.ReportReasonRepository;
import vn.hcmute.tlcn.service.IReportResonService;

import java.util.List;
@Service
public class ReportReasonServiceImple implements IReportResonService {
    @Autowired
    ReportReasonRepository reportReasonRepository;
    public List<ReportReason> getReasonReportForComic(){
        return reportReasonRepository.findAllByType(1);
    }
    public List<ReportReason>getReasonReportForComment(){
        return reportReasonRepository.findAllByType(2);
    }
}
