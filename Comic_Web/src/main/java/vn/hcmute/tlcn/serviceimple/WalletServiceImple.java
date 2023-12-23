package vn.hcmute.tlcn.serviceimple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.hcmute.tlcn.entity.User;
import vn.hcmute.tlcn.entity.Wallet;
import vn.hcmute.tlcn.model.ResponseObject;
import vn.hcmute.tlcn.model.WalletDTO;
import vn.hcmute.tlcn.repository.UserRepository;
import vn.hcmute.tlcn.repository.WalletRepository;
import vn.hcmute.tlcn.utils.Converter;

import java.util.Date;

@Service
public class WalletServiceImple {
    @Autowired
    WalletRepository walletRepository;
    @Autowired
    Converter converter;
    @Autowired
    UserRepository userRepository;
    public ResponseObject registerWallet(String username){
        User user=userRepository.findOneByUserName(username).get();
        Wallet wallet=new Wallet(user,0,new Date());
        try {
            return new ResponseObject(true,"Register Wallet Success!"
                    ,converter.convertEntityToDto(walletRepository.save(wallet)));
        }
        catch (Exception e){
            return new ResponseObject(false,e.getMessage(),"");
        }
    }
    public WalletDTO getWalletByUser(String username){

    	WalletDTO walletDTO = null;
    	Wallet wallet = walletRepository.findOneByUser_UserName(username).orElse(null);
    	if (wallet != null) {
    	  walletDTO = converter.convertEntityToDto(wallet);
    	}
    	return walletDTO;
    }
}
