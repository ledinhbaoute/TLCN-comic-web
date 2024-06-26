package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import vn.hcmute.tlcn.entity.*;
import vn.hcmute.tlcn.model.OTP;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.UserDTO;
import vn.hcmute.tlcn.model.UsePremiumDTO;
import vn.hcmute.tlcn.repository.*;
import vn.hcmute.tlcn.service.IUserService;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.utils.GenerateId;
import vn.hcmute.tlcn.utils.OTPManager;
import vn.hcmute.tlcn.utils.ValidatePassword;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class UserServiceImple implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Converter converter;
    @Autowired
    private GenerateId generateId;
    @Autowired
    ValidatePassword validatePassword;
    @Autowired
    ImageStorageService imageStorageService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    PackagePremiumRepository packagePremiumRepository;
    @Autowired
    UserPremiumRepo userPremiumRepo;
    @Autowired
    WalletRepository walletRepository;
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    EmailService emailService;
    @Autowired
    OTPManager otpManager;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    FollowRepository followRepository;
    @Autowired
    AnnounceRepository announceRepository;

    @Override
    public UserDTO getUser(String username) {
        UserDTO userDTO = null;
        Optional<User> user = userRepository.findOneByUserName(username);
        if (user.isPresent())
            userDTO = converter.convertEntityToDto(user.get());
        return userDTO;
    }
    
    @Override
    public UserDTO getUserbyId(String userId) {
        UserDTO userDTO = null;
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent())
            userDTO = converter.convertEntityToDto(user.get());
        return userDTO;
    }

    @Override
    public int checkRegisterCondition(String userName, String password, String confirmPass, String email) {
        int check = 0;
        if (checkUserExist(userName, email))
            check = 1;
        else if (!validatePassword.checkPasswordValid(password).isStatus())
            check = 3;

        else if (!password.equals(confirmPass))
            check = 2;
        return check;
    }
    @Override
    public ResponseObject register(String name, String email, String username,Date birthDate, String pass, String conFirmPass) {
        User user;
        UserDTO userDTO = new UserDTO();
        int check = checkRegisterCondition(username, pass, conFirmPass, email);
        if (check == 0) {
            String passwordEncode = passwordEncoder.encode(pass);
            user = new User(generateId.generateId(), name, "", email, "+84xxx",
                    username, passwordEncode,false,new Date(),birthDate);
//            userDTO = converter.convertEntityToDto(userRepository.saveAndFlush(user));
            OTP otp = emailService.generateOtp();
            emailService.sendOtpEmail(email, "Verification OTP!", otp);
            for (OTP o : OTPManager.userTemporary.keySet()) {
                if (o.getReceivedMail().equals(otp.getReceivedMail())) {
                    OTPManager.userTemporary.remove(o);
                }
            }
            otpManager.removeExpiredOTP();
            OTPManager.userTemporary.put(otp, user);
            System.out.println("User Tempo Size:"+OTPManager.userTemporary.size());
            return new ResponseObject(true, "OTP has seen to your email, verify to complete registration!", "");
        } else if (check == 1) {
            return new ResponseObject(false, "Tên đăng nhập hoặc email đã tồn tại!", "");
        } else if (check == 2)
            return new ResponseObject(false, "Mật khẩu và xác thực mật khẩu không khớp!", "");
        else return validatePassword.checkPasswordValid(pass);
    }

    public ResponseObject verifyRegister(String otpCode, String email) {
        OTP otp = null;
        for (OTP o : OTPManager.userTemporary.keySet()) {
            if (o.getReceivedMail().equals(email) && o.getCode().equals(otpCode)) {
                otp = o;
                break;
            }
        }
        if (otp == null) {
            return new ResponseObject(false, "OTP Invalid!", "");
        }
        if (otp.getExpireTime() < Instant.now().getEpochSecond())
            return new ResponseObject(false, "OTP Expired!", "");
        User user = OTPManager.userTemporary.get(otp);
        OTPManager.userTemporary.remove(otp);
        System.out.println("User Tempo Size:"+OTPManager.userTemporary.size());
        return new ResponseObject(true, "Verify Otp Success,Account has been created!", converter.convertEntityToDto(userRepository.save(user)));
    }

    @Override
    public boolean checkUserExist(String username, String email) {

        Optional<User> user = userRepository.findOneByUserName(username);
        Optional<User> user1 = userRepository.findOneByEmail(email);
        if ((user.isPresent()))
            return true;
        if (user1.isPresent())
            return true;
        return false;
    }

    @Override
    public int changePassword(String username, String password, String newPass, String confirmPass) {
        int check = 0;
        Optional<User> optionalUser = userRepository.findOneByUserName(username);
        User user = optionalUser.get();
        if (!passwordEncoder.matches(password, user.getPassword()))
            return check;
        if (!validatePassword.checkPasswordValid(newPass).isStatus())
            check = 3;
        else if (!newPass.equals(confirmPass))
            check = 1;
        else {
            check = 2;
            user.setPassword(passwordEncoder.encode(confirmPass));
            userRepository.saveAndFlush(user);
        }
        return check;
    }
    public ResponseObject forgotPassword(String username, String email) {
        User user = userRepository.findOneByUserName(username).orElse(null);
        if (user == null)
            return new ResponseObject(false, "Người dùng không tồn tại!", "");
        if (!user.getEmail().equals(email))
            return new ResponseObject(false, "Tên người dùng với email không khớp!!", "");
        OTP otp = emailService.generateOtp();
        emailService.sendOtpEmail(email, "Verification OTP!", otp);
        for (OTP o : OTPManager.otpList.keySet()) {
            if (o.getReceivedMail().equals(otp.getReceivedMail()))
                OTPManager.otpList.remove(o);
        }
        otpManager.removeExpiredOTP();
        OTPManager.otpList.put(otp,false);
        System.out.println("Otp List Size:"+OTPManager.otpList.size());
        return new ResponseObject(true, "OTP has seen to your email!", "");
    }

    public ResponseObject verifyResetPassword(String otpCode, String email) {
        OTP otp = null;
        for (OTP o : OTPManager.otpList.keySet()
        ) {
            if (o.getReceivedMail().equals(email)) {
                otp = o;
                break;
            }
        }
        if (otp != null) {
            int check=emailService.verifyOtp(otpCode, email, otp);
            if(check==2){
                OTPManager.otpList.put(otp,true);

                return new ResponseObject(true,"Verify OTP Success!","");
            }
            else if(check==1)
                return new ResponseObject(false,"OTP Expired!","");
            else return new ResponseObject(false,"OTP Invalid!","");

        }return new ResponseObject(false,"OTP Invalid!","");
    }
    public ResponseObject resetPassword(String email,String newPass,String confirmPass){
        boolean f=false;
        OTP otp=null;
        for (OTP o:OTPManager.otpList.keySet()) {
            if(o.getReceivedMail().equals(email) && OTPManager.otpList.get(o)){
                otp=o;
                f=true;
                break;
            }
        }
        if(f && otp!=null){
            User user=userRepository.findOneByEmail(email).orElse(null);
            if (!validatePassword.checkPasswordValid(newPass).isStatus())
                return validatePassword.checkPasswordValid(newPass);
            else if(!newPass.equals(confirmPass))
                return new ResponseObject(false,"Password and Confirm Password not match!","");
            user.setPassword(passwordEncoder.encode(confirmPass));
            userRepository.save(user);
            OTPManager.otpList.remove(otp);
            System.out.println("OTP List size:"+OTPManager.otpList.size());
            return new ResponseObject(true,"Reset Password Success!","");
        }
        return new ResponseObject(false,"You have not verified otp!","");
    }
    @Override
    public ResponseEntity<ResponseObject> uploadAvatar(String username, MultipartFile file) {
        Optional<User> optionalUser = userRepository.findOneByUserName(username);
        User user = optionalUser.get();
        List<Follower>followers=followRepository.findByUser_UserName(username);
        try {
                String newAvt = imageStorageService.storeToCloudinary(file);
                user.setAvatar(newAvt);
                user = userRepository.save(user);
                User finalUser1 = user;
                followers.forEach(follower ->
                {
                    String content=username+ "vừa cập nhật ảnh đại diện";
                    Announce announce=new Announce();
                    announce.setId(generateId.generateId());
                    announce.setUser(follower.getFollower());
                    announce.setContent(content);
                    announce.setCreatedAt(new Date());
                    announce.setRead(false);
                    announce.setType("avt");
                    announce.setLinkTo("/user/"+ finalUser1.getId());
                    simpMessagingTemplate.convertAndSendToUser(follower.getFollower().getUserName(),"/queue/notifications",announce);

                    announceRepository.save(announce);
                });

                return ResponseEntity.ok(new ResponseObject(true, "Update Avatar Success!", user));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(new ResponseObject(false, e.getMessage(), ""));
        }
    }
    
    @Override
    public UserPremium getUserPremium(String username) {
    	Optional<UserPremium> user = userPremiumRepo.findOneByUser_UserName(username);
    	if(user.isPresent()) {
    		return user.get();
    	}
    	return null;
    }

    public List<UserDTO> searchUser(String input) {
        List<User> users = userRepository.searchByInput(input);
        List<UserDTO> userDTOS = users.stream().map(u -> converter.convertEntityToDto(u)).toList();
        return userDTOS;
    }

    public ResponseObject updatePremium(String username, int packageId) {
        User user = userRepository.findOneByUserName(username).get();
        Optional<PackagePremium> optionalPackagePremium = packagePremiumRepository.findById(packageId);
        if (!optionalPackagePremium.isPresent())
            return new ResponseObject(false, "Gói không tồn tại!", "");
        PackagePremium packagePremium = optionalPackagePremium.get();
        Optional<Wallet> optional = walletRepository.findOneByUser_UserName(username);
        if (!optional.isPresent())
            return new ResponseObject(false, "Bạn cần mở ví để thực hiện đăng ký!", "");
        Wallet wallet = optional.get();
        if (wallet.getBalance() < packagePremium.getCost())
            return new ResponseObject(false, "Số dư ví không đủ để đăng ký!", "");

        try {

            UserPremium userPremium = new UserPremium(user, packagePremium, new Date());
            userPremiumRepo.saveAndFlush(userPremium);

            wallet.setBalance(wallet.getBalance() - packagePremium.getCost());
            walletRepository.save(wallet);
            Transaction transaction = new Transaction(wallet, "Đăng ký gói premium " + packagePremium.getDuration() + " ngày", "", packagePremium.getCost(), new Date(), 2,wallet.getBalance());
            transactionRepository.save(transaction);
            return new ResponseObject(true, "Đăng ký premium thành công!", userPremium);
        } catch (Exception e) {

            return new ResponseObject(false, e.getMessage(), "");
        }
    }

    public void updateProfile(String username,String newName,String newPhoneNumber,String newIntro,Date newBirthDate){
        User user=userRepository.findOneByUserName(username).orElse(null);
        user.setName(newName);
        user.setPhoneNumber(newPhoneNumber);
        user.setIntro(newIntro);
        user.setBirthDate(newBirthDate);
        userRepository.save(user);
    }
    public void updateStatusOnline(String username){
        User user=userRepository.findOneByUserName(username).orElse(null);
        user.setOnline(!user.isOnline());
        userRepository.save(user);
    }

    public void deleteExpiredPremiumPackage(String username) {
        UserPremium userPremium = userPremiumRepo.findOneByUser_UserName(username).orElse(null);
        if (userPremium != null) {
            PackagePremium packagePremium = userPremium.getPackagePremium();
            Date startDate = userPremium.getStartDate();
            Instant startInstant = startDate.toInstant();
            long expireTime = startInstant.getEpochSecond() + TimeUnit.DAYS.toSeconds(packagePremium.getDuration());
            System.out.println(Instant.now().getEpochSecond());
            System.out.println(expireTime);
            if (expireTime < Instant.now().getEpochSecond()) {
                userPremiumRepo.delete(userPremium);
            }
        }
    }
}
