package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.hcmute.tlcn.entity.Transaction;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.entity.Wallet;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.TransactionDTO;
import vn.hcmute.tlcn.repository.TransactionRepository;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.repository.WalletRepository;
import vn.hcmute.tlcn.utils.Converter;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImple {

    @Autowired
    UserRepository userRepository;
    @Autowired
    WalletRepository walletRepository;
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    Converter converter;

    @Transactional
    public ResponseObject topUpMoneyToWallet(String username, int amount, String password) {
        User user = userRepository.findOneByUserName(username).get();
        if (passwordEncoder.matches(password,user.getPassword())){
            Optional<Wallet> optionalWallet = walletRepository.findOneByUser_UserName(username);
            if (!optionalWallet.isPresent())
                return new ResponseObject(false,"You don't have Wallet to Top up","");
            Wallet wallet=optionalWallet.get();
            Transaction transaction = new Transaction(wallet, "Deposit " + amount + " to the wallet ", "", amount, new Date(), 1);
            try {
                transactionRepository.save(transaction);
                wallet.setBalance(wallet.getBalance()+amount);
                return new ResponseObject(true, "Success!",converter.convertEntityToDto(transaction));

            } catch (Exception e) {
                return new ResponseObject(false, e.getMessage(), "");
            }
        }
        return new ResponseObject(false, "Password incorrect!", "");
    }
    public List<TransactionDTO>getAllTransactionByUser(String username){
        return transactionRepository.findAllByWallet_User_UserNameOrderByCreatedAtDesc(username).stream().map(t->converter.convertEntityToDto(t)).toList();
    }
}
