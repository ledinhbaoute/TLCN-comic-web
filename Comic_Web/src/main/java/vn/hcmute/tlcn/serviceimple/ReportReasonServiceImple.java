package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.ReportReason;
import vn.hcmute.tlcn.model.ReportReasonDTO;
import vn.hcmute.tlcn.repository.ReportReasonRepository;
import vn.hcmute.tlcn.service.IReportResonService;
import vn.hcmute.tlcn.utils.Converter;

import java.util.List;
@Service
public class ReportReasonServiceImple implements IReportResonService {
    @Autowired
    ReportReasonRepository reportReasonRepository;
    @Autowired
    Converter converter;
    public List<ReportReasonDTO> getReasonReportForComic(){

         return reportReasonRepository.findAllByType(1).stream().map(p->converter.convertEntityToDto(p)).toList();
    }
    public List<ReportReasonDTO>getReasonReportForComment(){
        return reportReasonRepository.findAllByType(2).stream().map(p->converter.convertEntityToDto(p)).toList();
    }
}
