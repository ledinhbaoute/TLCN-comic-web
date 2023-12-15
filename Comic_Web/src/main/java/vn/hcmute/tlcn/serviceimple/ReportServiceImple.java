package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.model.CommentReportDTO;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.entity.*;
import vn.hcmute.tlcn.model.ComicReportDTO;
import vn.hcmute.tlcn.repository.*;
import vn.hcmute.tlcn.service.IReportService;
import vn.hcmute.tlcn.utils.Converter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReportServiceImple implements IReportService {
    @Autowired
    ComicBookRepository comicBookRepository;
    @Autowired
    ComicReportRepository comicReportRepository;
    @Autowired
    ReportReasonRepository reportReasonRepository;
    @Autowired
    CommentReportRepository commentReportRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    Converter converter;

    public ResponseObject reportComic(String comicId, List<Integer> reasons) {

        Optional<ComicBook> optionalComicBook = comicBookRepository.findById(comicId);
        if (!optionalComicBook.isPresent())
            return new ResponseObject(false, "Comic not exist!", "");

        List<ReportReason> reasonList = reasons.stream().map(r -> reportReasonRepository.findById(r).get())
                .filter(reportReason -> reportReason.getType() == 1).toList();
      //  List<ReportReason>reasonList=new ArrayList<>();
//        for (Integer i:reasons
//             ) {
//            Optional<ReportReason> optionalReportReason=reportReasonRepository.findById(i);
//            if(optionalComicBook.isPresent()&& optionalReportReason.get().getType()==1)
//                reasonList.add(optionalReportReason.get());
//        }
//        for (int i=0;i<reasons.size();i++){
//            Optional<ReportReason> optionalReportReason=reportReasonRepository.findById(reasons.get(i));
//            if(optionalReportReason.isPresent()&& optionalReportReason.get().getType()==1)
//                reasonList.add(optionalReportReason.get());
//        }
        if (reasonList.size() == 0)
            return new ResponseObject(false, "Report Failed!", "");
        ComicBook comicBook = optionalComicBook.get();
        ComicReport comicReport = new ComicReport(comicBook, new Date(), 1);
        try {
            comicReport.setReportReasons(reasonList);
            comicReportRepository.save(comicReport);
            return new ResponseObject(true, "Report Comic Success!", "");
        } catch (Exception e) {
            return new ResponseObject(false, e.getMessage(), "");
        }
    }

    public ResponseObject reportComment(int commentId, List<Integer> reasonIds) {
        Optional<Comment> optional = commentRepository.findById(commentId);
        if (!optional.isPresent())
            return new ResponseObject(false, "Comment not exist!", "");
        Comment comment = optional.get();
        List<ReportReason> reportReasons = reasonIds.stream().map(r -> reportReasonRepository.findById(r).get())
                .filter(reportReason -> reportReason.getType() == 2).toList();
        if (reportReasons.size() == 0)
            return new ResponseObject(false, "Report Failed!", "");
        CommentReport commentReport = new CommentReport(comment, new Date(), 1);
        try {
            commentReport.setReportReasons(reportReasons);
            commentReportRepository.save(commentReport);
            return new ResponseObject(true, "Report Comment Success!", "");
        } catch (Exception e) {
            return new ResponseObject(false, e.getMessage(), "");
        }
    }
    public List<ComicReportDTO> getAllComicReport() {
        List<ComicReport> comicReports = comicReportRepository.findAll();
        List<ComicReportDTO> comicReportDTOS = comicReports.stream().map(r -> converter.convertEntityToDto(r)).toList();
        return comicReportDTOS;
    }
    public List<CommentReportDTO> getAllCommentReport() {
        return commentReportRepository.findAll().stream().map(r->converter.convertEntityToDto(r)).toList();
    }
    public void deleteReportComic(int id){
        ComicReport comicReport=comicReportRepository.findById(id).orElse(null);
        if(comicReport==null)
            return;
        try {
            comicReportRepository.deleteById(id);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }
    public void deleteReportComment(int id){
        CommentReport commentReport=commentReportRepository.findById(id).orElse(null);
        if(commentReport==null)
            return;
        try {
            commentReportRepository.deleteById(id);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }

}