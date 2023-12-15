package vn.hcmute.tlcn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.hcmute.tlcn.entity.ReportReason;
import vn.hcmute.tlcn.model.ReportReasonDTO;
import vn.hcmute.tlcn.serviceimple.ReportReasonServiceImple;
import vn.hcmute.tlcn.serviceimple.ReportServiceImple;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ReportController {
    @Autowired
    ReportServiceImple reportServiceImple;
    @Autowired
    ReportReasonServiceImple reportReasonServiceImple;

    @PostMapping("/user/report_comic")
    ResponseEntity<?> reportComic(@RequestParam("comicId") String comicId, @RequestParam("reasonIds") List<Integer> reasonIds) {

        return ResponseEntity.ok(reportServiceImple.reportComic(comicId, reasonIds));

    }

    @PostMapping("/user/report_comment")
    ResponseEntity<?> reportComment(@RequestParam("commentId") int commentId,
                                    @RequestParam("reasonId") List<Integer> reasonIds) {

        return ResponseEntity.ok(reportServiceImple.reportComment(commentId, reasonIds));
    }
    @GetMapping("report_comic_reason")
    List<ReportReasonDTO> getReportComicReasons(){
        return reportReasonServiceImple.getReasonReportForComic();
    }
    @GetMapping("report_comment_reason")
    List<ReportReasonDTO> getReportCommentReasons(){
        return reportReasonServiceImple.getReasonReportForComment();
    }
    @GetMapping("admin/report_comic")
    ResponseEntity<?>getAllReportComic(){
        return ResponseEntity.ok(reportServiceImple.getAllComicReport());
    }
    @GetMapping("admin/report_comment")
    ResponseEntity<?>getAllReportComment(){
        return ResponseEntity.ok(reportServiceImple.getAllCommentReport());
    }
    @DeleteMapping("admin/report_comic")
    ResponseEntity<?>deleteReportComic(@RequestParam int id,Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            boolean isAdmin=userDetails.getAuthorities().stream().anyMatch(authority->authority.getAuthority().equals("ROLE_ADMIN"));
            if(isAdmin){
                reportServiceImple.deleteReportComic(id);
                return ResponseEntity.ok("Success!");
            }
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
    @DeleteMapping("admin/report_comment")
    ResponseEntity<?>deleteReportComment(@RequestParam int id,Authentication authentication){
        if(authentication!=null){
            UserDetails userDetails= (UserDetails) authentication.getPrincipal();
            boolean isAdmin=userDetails.getAuthorities().stream().anyMatch(authority->authority.getAuthority().equals("ROLE_ADMIN"));
            if(isAdmin){
                reportServiceImple.deleteReportComment(id);
                return ResponseEntity.ok("Success!");
            }
        }
        return ResponseEntity.status(401).body("Unauthorized!");
    }
}
