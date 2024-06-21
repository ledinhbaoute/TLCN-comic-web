package vn.hcmute.tlcn.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import vn.hcmute.tlcn.entity.*;
import vn.hcmute.tlcn.repository.*;

import java.util.Date;
import java.util.List;

@Component
public class ScheduledTask {
    @Autowired
    ComicBookRepository comicBookRepository;
    @Autowired
    PriceRepository priceRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    WalletRepository walletRepository;
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    AnnounceRepository announceRepository;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    GenerateId generateId;

    @Scheduled(fixedRate = 120000) //2 phút
    public void paymentMonthly() {

        List<User> users = userRepository.findAll();
        Price standardPrice=priceRepository.findOneByType(1);
        Price premiumPrice=priceRepository.findOneByType(2);


        for (User user : users
        ) {
            Wallet wallet = walletRepository.findOneByUser_Id(user.getId()).orElse(null);
            if (wallet != null) {
                double profits = 0;
                double[] totalView = getTotalViewIncrease((user.getId()));
                if (totalView[0] > 0|| totalView[1]>0) {
                    profits = profits + (totalView[0] / standardPrice.getView() * standardPrice.getCost())+ totalView[1]/premiumPrice.getView()*premiumPrice.getCost();
                    System.out.println(profits);
                    wallet.setBalance(wallet.getBalance() + (int) Math.ceil(profits));
                    walletRepository.save(wallet);
                    if (profits > 0) {
                        Transaction transaction = new Transaction(wallet, "Lợi nhuận hằng tháng", "", (int) Math.ceil(profits),
                                new Date(), 5, wallet.getBalance());
                        transactionRepository.save(transaction);
                        String content="Bạn vừa nhận được lợi nhuận tháng số tiền "+(int) Math.ceil(profits) +"VND";
                        Announce announce=new Announce();
                        announce.setContent(content);
                        announce.setUser(user);
                        announce.setType("prf");
                        announce.setCreatedAt(new Date());
                        announce.setId(generateId.generateId());
                        announce.setLinkTo("/wallet");
                        try {
                            simpMessagingTemplate.convertAndSendToUser(user.getUserName(),"/queue/notifications",announce);
                            announceRepository.save(announce);
                        }
                        catch (Exception e){
                            throw new RuntimeException(e.getMessage());
                        }
                    }
                }
            }
        }
    }
    public double[] getTotalViewIncrease(String userId) {
        List<ComicBook> comicBooks = comicBookRepository.findByActor_Id(userId);
        double total1 = 0;
        double total2 = 0;
        double[] totalViews=new double[2];
        for (ComicBook comicBook : comicBooks
        ) {
            if (comicBook.getView() >= 10) {
                if(!comicBook.getPremium()){
                    total1 = total1 + (comicBook.getView() - comicBook.getPreview());
                }
                else {
                    total2=total2+(comicBook.getView() - comicBook.getPreview());
                }
                comicBook.setPreview(comicBook.getView());
                comicBookRepository.save(comicBook);
            }
        }
        totalViews[0]=total1;
        totalViews[1]=total2;
        return totalViews;
    }
}
