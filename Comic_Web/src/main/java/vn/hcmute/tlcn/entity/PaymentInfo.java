package vn.hcmute.tlcn.entity;

public class PaymentInfo {
	private String vnpAmount;
    private String vnpPayDate;
    private String vnpResponseCode;
    private String vnpTransactionStatus;
    private String vnpTransactionNo;
    
	public PaymentInfo() {
		super();
	}
	public PaymentInfo(String vnpAmount, String vnpPayDate, String vnpResponseCode, String vnpTransactionStatus,
			String vnpTransactionNo) {
		super();
		this.vnpAmount = vnpAmount;
		this.vnpPayDate = vnpPayDate;
		this.vnpResponseCode = vnpResponseCode;
		this.vnpTransactionStatus = vnpTransactionStatus;
		this.vnpTransactionNo = vnpTransactionNo;
	}
	public String getVnpAmount() {
		return vnpAmount;
	}
	public void setVnpAmount(String vnpAmount) {
		this.vnpAmount = vnpAmount;
	}
	public String getVnpPayDate() {
		return vnpPayDate;
	}
	public void setVnpPayDate(String vnpPayDate) {
		this.vnpPayDate = vnpPayDate;
	}
	public String getVnpResponseCode() {
		return vnpResponseCode;
	}
	public void setVnpResponseCode(String vnpResponseCode) {
		this.vnpResponseCode = vnpResponseCode;
	}
	public String getVnpTransactionStatus() {
		return vnpTransactionStatus;
	}
	public void setVnpTransactionStatus(String vnpTransactionStatus) {
		this.vnpTransactionStatus = vnpTransactionStatus;
	}
	public String getVnpTransactionNo() {
		return vnpTransactionNo;
	}
	public void setVnpTransactionNo(String vnpTransactionNo) {
		this.vnpTransactionNo = vnpTransactionNo;
	}
}
