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
	public void topUpMoneyToWallet(String username, int amount) {
		User user = userRepository.findOneByUserName(username).get();
		Optional<Wallet> optionalWallet = walletRepository.findOneByUser_UserName(username);
		if (!optionalWallet.isPresent())
			return;
		Wallet wallet = optionalWallet.get();
		try {
			wallet.setBalance(wallet.getBalance() + amount);
			Transaction transaction = new Transaction(wallet, "Nạp tiền vào ví " , "", amount,
					new Date(), 1,wallet.getBalance());
			transactionRepository.save(transaction);

		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	public List<TransactionDTO> getAllTransactionByUser(String username) {
		return transactionRepository.findAllByWallet_User_UserNameOrderByCreatedAtDesc(username).stream()
				.map(t -> converter.convertEntityToDto(t)).toList();
	}

	public List<TransactionDTO> getAllTransactionRegisterPremium() {
		return transactionRepository.findAllByTypeOrderByCreatedAtDesc(2).stream().map(converter::convertEntityToDto)
				.toList();
	}



}
