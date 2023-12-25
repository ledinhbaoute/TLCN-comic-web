package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.hcmute.tlcn.entity.Donate;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.entity.Wallet;
import vn.hcmute.tlcn.model.DonateDTO;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.repository.DonateRepository;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.repository.WalletRepository;
import vn.hcmute.tlcn.utils.Converter;
import vn.hcmute.tlcn.utils.GenerateId;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    PasswordEncoder passwordEncoder;
    @Autowired
    Converter converter;
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
            return new ResponseObject(false, "Balance not enough", "");
        if (!passwordEncoder.matches(password, donateWallet.getUser().getPassword()))
            return new ResponseObject(false, "Password incorrect!", "");
        Donate donate = new Donate(generateId.generateId(), donateWallet, receiverWallet, donateWallet.getUser().getName() +
                " donated to " + receiverWallet.getUser().getName(), message, amount, new Date());
        donateRepository.save(donate);
        donateWallet.setBalance(donateWallet.getBalance() - amount);
        receiverWallet.setBalance(receiverWallet.getBalance() + amount);
        return new ResponseObject(true, "Donate Success!", converter.convertEntityToDto(donate));
    }

    public List<DonateDTO> getDonateHistory(String username) {
        return donateRepository.findAllByDonateWallet_User_UserNameOrderByDonateDateDesc(username).stream().map(d->converter.convertEntityToDto(d)).toList();
    }

    public List<DonateDTO> getReceivedDonateHistory(String username) {
        return donateRepository.findAllByReceiverWallet_User_UserNameOrderByDonateDateDesc(username).stream().map(d ->converter.convertEntityToDto(d)).toList();
    }
}
