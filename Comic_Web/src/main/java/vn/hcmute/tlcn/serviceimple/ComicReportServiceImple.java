package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.PrimaryKey.ResponseObject;
import vn.hcmute.tlcn.entity.ComicBook;
import vn.hcmute.tlcn.entity.ComicReport;
import vn.hcmute.tlcn.entity.ReportReason;
import vn.hcmute.tlcn.model.ComicReportDTO;
import vn.hcmute.tlcn.repository.ComicBookRepository;
import vn.hcmute.tlcn.repository.ComicReportRepository;
import vn.hcmute.tlcn.repository.ReportReasonRepository;
import vn.hcmute.tlcn.service.IComicReportService;
import vn.hcmute.tlcn.utils.Converter;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ComicReportServiceImple implements IComicReportService {
    @Autowired
    ComicBookRepository comicBookRepository;
    @Autowired
    ComicReportRepository comicReportRepository;
    @Autowired
    ReportReasonRepository reportReasonRepository;
    @Autowired
    Converter converter;
    public ResponseObject reportComic(String comicId, List<Integer>reasons){

        Optional<ComicBook> optionalComicBook=comicBookRepository.findById(comicId);
        if (!optionalComicBook.isPresent())
            return new ResponseObject(false,"Comic not exist!","");
        ComicBook comicBook=optionalComicBook.get();
        List<ReportReason>reportReasons=reasons.stream().map(r->reportReasonRepository.findById(r).get()).toList();

        ComicReport comicReport=new ComicReport(comicBook,new Date(),1);
        try {
            comicReport.setReportReasons(reportReasons);
           ComicReportDTO comicReportDTO=converter.convertEntityToDto( comicReportRepository.save(comicReport));
           return new ResponseObject(true,"Report Comic Success!",comicReportDTO);
        }catch (Exception e){
            return new ResponseObject(false,e.getMessage(),"");
        }

    }
}
