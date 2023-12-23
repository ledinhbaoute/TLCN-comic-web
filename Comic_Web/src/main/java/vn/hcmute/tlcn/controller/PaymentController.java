package vn.hcmute.tlcn.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import vn.hcmute.tlcn.config.VNPAYConfig;
import vn.hcmute.tlcn.model.ResponseObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class PaymentController {

    @PostMapping("user/create_payment")
    public ResponseEntity<?>createPayment( @RequestParam ("amount") long amount) throws UnsupportedEncodingException {
        String orderType = "other";
        String bankCode="NCB";
        String vnp_TxnRef = VNPAYConfig.getRandomNumber(8);
//        String vnp_IpAddr = VNPAYConfig.getIpAddress(req);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VNPAYConfig.vnp_TmnCode;
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPAYConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPAYConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount*100));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");

        vnp_Params.put("vnp_ReturnUrl", VNPAYConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPAYConfig.hmacSHA512(VNPAYConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPAYConfig.vnp_PayUrl + "?" + queryUrl;
        ResponseObject responseObject=new ResponseObject(true,"Success!",paymentUrl);
        return ResponseEntity.ok(responseObject);
    }
    @GetMapping("/payment_info")
    public RedirectView handleTransaction(@RequestParam(value = "vnp_Amount")String amount,
                                    @RequestParam(value = "vnp_PayDate")String date,
                                    @RequestParam(value = "vnp_ResponseCode")String responseCode,
                                    @RequestParam(value = "vnp_TransactionStatus")String transactionStatus,
                                    @RequestParam(value = "vnp_TransactionNo")String transactionNo) throws ParseException {

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:3000/wallet/payment-info");

        redirectView.addStaticAttribute("vnp_Amount", amount);
        redirectView.addStaticAttribute("vnp_PayDate", date);
        redirectView.addStaticAttribute("vnp_ResponseCode",responseCode);
        redirectView.addStaticAttribute("vnp_TransactionStatus",transactionStatus);
        redirectView.addStaticAttribute("vnp_TransactionNo",transactionNo);
        return redirectView;
    }

//    @PostMapping("/IPN")
//    public String getIPN(@RequestParam Map<String, String> requestParams) throws UnsupportedEncodingException {
////        Map fields = new HashMap();
////        for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
////            String fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
////            String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
////            if ((fieldValue != null) && (fieldValue.length() > 0)) {
////                fields.put(fieldName, fieldValue);
////            }
////        }
//
//        String vnp_SecureHash = requestParams.get("vnp_SecureHash");
//        if (requestParams.containsKey("vnp_SecureHashType")) {
//            requestParams.remove("vnp_SecureHashType");
//        }
//        if (requestParams.containsKey("vnp_SecureHash")) {
//            requestParams.remove("vnp_SecureHash");
//        }
//
//        // Check checksum
//        String signValue = VNPAYConfig.hashAllFields(requestParams);
//        if (signValue.equals(vnp_SecureHash)) {
//
//            boolean checkOrderId = true; // vnp_TxnRef exists in your database
//            boolean checkAmount = true; // vnp_Amount is valid (Check vnp_Amount VNPAY returns compared to the amount of the code (vnp_TxnRef) in the Your database).
//            boolean checkOrderStatus = true; // PaymentStatus = 0 (pending)
//
//            if (checkOrderId) {
//                if (checkAmount) {
//                    if (checkOrderStatus) {
//                        if ("00".equals(requestParams.get("vnp_ResponseCode"))) {
//
//                            //Here Code update PaymentStatus = 1 into your Database
//                        } else {
//
//                            // Here Code update PaymentStatus = 2 into your Database
//                        }
//                        System.out.print("{\"RspCode\":\"00\",\"Message\":\"Confirm Success\"}");
//                    } else {
//
//                        System.out.print("{\"RspCode\":\"02\",\"Message\":\"Order already confirmed\"}");
//                    }
//                } else {
//                    System.out.print("{\"RspCode\":\"04\",\"Message\":\"Invalid Amount\"}");
//                }
//            } else {
//                System.out.print("{\"RspCode\":\"01\",\"Message\":\"Order not Found\"}");
//            }
//        } else {
//            System.out.print("{\"RspCode\":\"97\",\"Message\":\"Invalid Checksum\"}");
//        }
//        return null;
//    }

}
