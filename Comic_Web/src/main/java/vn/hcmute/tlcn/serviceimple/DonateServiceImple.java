package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.hcmute.tlcn.entity.*;
import vn.hcmute.tlcn.model.DonateDTO;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.repository.*;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.utils.GenerateId;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DonateServiceImple {
    @Autowired
    DonateRepository donateRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    WalletRepository walletRepository;
    @Autowired
    GenerateId generateId;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    AnnounceRepository announceRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    Converter converter;
    @Autowired
    TransactionRepository transactionRepository;
    @Transactional
    public ResponseObject donate(String dnt_username, String rcv_username, int amount, String message, String password) {

        Optional<Wallet> optionalWallet = walletRepository.findOneByUser_UserName(dnt_username);
        if (!optionalWallet.isPresent())
            return new ResponseObject(false, "You need Wallet to Donate", "");

        Optional<User> optionalUser = userRepository.findById(rcv_username);
        if (!optionalUser.isPresent()) {
            return new ResponseObject(false, "Receiver not exist", "");
        }
        Optional<Wallet> optional = walletRepository.findOneByUser_Id(rcv_username);
        if (!optional.isPresent())
            return new ResponseObject(false, "You cannot donate for this user because this user don't have Wallet",
                    "");
        Wallet donateWallet = optionalWallet.get();
        Wallet receiverWallet = optional.get();
        if (donateWallet.getBalance() < amount)
            return new ResponseObject(false, "Số dư ví không đủ", "");
        if (!passwordEncoder.matches(password, donateWallet.getUser().getPassword()))
            return new ResponseObject(false, "Mật khẩu không đúng", "");
        Donate donate = new Donate(generateId.generateId(), donateWallet, receiverWallet, donateWallet.getUser().getName() +
                " donated to " + receiverWallet.getUser().getName(), message, amount, new Date());
        donateRepository.save(donate);
        donateWallet.setBalance(donateWallet.getBalance() - amount);
        receiverWallet.setBalance(receiverWallet.getBalance() + amount);
        Transaction transactionIn=new Transaction(receiverWallet,"Nhận donate từ "+ donateWallet.getUser().getName(),donate.getMessage(),amount,new Date(),4,receiverWallet.getBalance());
        Transaction transactionOut=new Transaction(donateWallet,"Donate cho "+ receiverWallet.getUser().getName(),donate.getMessage(),amount,new Date(),3,donateWallet.getBalance());
        transactionRepository.save(transactionOut);
        transactionRepository.save(transactionIn);
        try {
            String content=donateWallet.getUser().getName() +" đã gửi tặng bạn "+donate.getAmount()+"VND";
            Announce announce=new Announce();
            announce.setRead(false);
            announce.setCreatedAt(new Date());
            announce.setUser(receiverWallet.getUser());
            announce.setContent(content);
            announce.setType("dn");
            announce.setLinkTo("/wallet");
            announce.setId(generateId.generateId());
            simpMessagingTemplate.convertAndSendToUser(receiverWallet.getUser().getUserName(),"/queue/notifications",
                   announce );
            announceRepository.save(announce);
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

        return new ResponseObject(true, "Donate thành công!", converter.convertEntityToDto(donate));
    }

    public List<DonateDTO> getDonateHistory(String username) {
        return donateRepository.findAllByDonateWallet_User_UserNameOrderByDonateDateDesc(username).stream().map(d->converter.convertEntityToDto(d)).toList();
    }

    public List<DonateDTO> getReceivedDonateHistory(String username) {
        return donateRepository.findAllByReceiverWallet_User_UserNameOrderByDonateDateDesc(username).stream().map(d ->converter.convertEntityToDto(d)).toList();
    }
    public List<DonateDTO>getAll(){
        return donateRepository.findAll().stream().map(donate -> converter.convertEntityToDto(donate)).collect(Collectors.toList());
    }
}
