package vn.hcmute.tlcn.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vn.hcmute.tlcn.entity.*;
import vn.hcmute.tlcn.model.ComicViewCount;
import vn.hcmute.tlcn.model.Statistic;
import vn.hcmute.tlcn.repository.*;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class Statistical {
    @Autowired
    UserRepository userRepository;
    @Autowired
    DonateRepository donateRepository;
    @Autowired
    ComicBookRepository comicBookRepository;
    @Autowired
    UserPremiumRepo userPremiumRepo;
    @Autowired
    WalletRepository walletRepository;
    @Autowired
    GenreRepository genreRepository;
    @Autowired
    AnnounceRepository announceRepository;
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    HistoryIncreaseViewRepo historyIncreaseViewRepo;

    public Statistic getStatisticalAdminByYear(int year){
        Statistic statistic=new Statistic();
        int numberUsers=userRepository.findAll().size();
        int numberUsersPremiums=userPremiumRepo.findAll().size();
        int numberComics=comicBookRepository.findAll().size();
        int numberWallets=walletRepository.findAll().size();
        int numberGenres=genreRepository.findAll().size();
        statistic.setN_comic(numberComics);
        statistic.setN_genre(numberGenres);
        statistic.setN_user(numberUsers);
        statistic.setN_userPremium(numberUsersPremiums);
        statistic.setN_wallet(numberWallets);
        int[] registrationByYears=getUserRegistrationCountByMonth(year);
        statistic.setData(registrationByYears);
        return statistic;
    }
    public Statistic getStatisticalAdminByMonth(int year,int month){
        Statistic statistic=new Statistic();
        int numberUsers=userRepository.findAll().size();
        int numberUsersPremiums=userPremiumRepo.findAll().size();
        int numberComics=comicBookRepository.findAll().size();
        int numberWallets=walletRepository.findAll().size();
        int numberGenres=genreRepository.findAll().size();
        statistic.setN_comic(numberComics);
        statistic.setN_genre(numberGenres);
        statistic.setN_user(numberUsers);
        statistic.setN_userPremium(numberUsersPremiums);
        statistic.setN_wallet(numberWallets);
        int[] registrationByMonths=getUserRegistrationCountByDay(year,month);
        statistic.setData(registrationByMonths);
        return statistic;
    }
    public int[] getUserRegistrationCountByMonth(int year) {
       int[] counts=new int[12];
         List<Object[]>objects=userRepository.findUserRegistrationCountByMonth(year);
         for (Object[] object:objects){
             int month=(int)object[0];
             long count=(long)object[1];
            counts[month-1]=(int)count;
         }
         return counts;
    }
    public int[] getUserRegistrationCountByDay(int year,int month) {
        List<Object[]>objects=userRepository.findUserRegistrationCountByDay(year,month);
        int daysInMonth=YearMonth.of(year,month).lengthOfMonth();
        int[]counts=new int[daysInMonth];
        for (Object[] object:objects){
            int day=(int)object[0];
            long count=(long)object[1];
            counts[day-1]=(int)count;
        }
        return counts;
    }
    public int[] getUserAgeDistribution() {
        List<Object[]> results = userRepository.findAgeDistribution();
        int[] ageDistribution = new int[4];
        if (!results.isEmpty()) {
            Object[] result = results.get(0);
            ageDistribution[0] = ((Number) result[0]).intValue();
            ageDistribution[1] = ((Number) result[1]).intValue();
            ageDistribution[2] = ((Number) result[2]).intValue();
            ageDistribution[3] = ((Number) result[3]).intValue();
        }
        return ageDistribution;
    }
    public List<Announce> test(){
        return announceRepository.findAll();
    }
    public List<Integer> getProfits(Date startDate, Date endDate, String username){
        List<Integer> profits=new ArrayList<>();
        List<Transaction> transactions=transactionRepository.findAllByWallet_User_UserNameOrderByCreatedAtDesc(username);
        List<Transaction>transactionsIn=transactions.stream().filter(t->t.getCreatedAt().after(startDate)&&t.getCreatedAt().before(endDate)&&(t.getType()==1||t.getType()==4||t.getType()==5)).
        sorted((t1,t2)->t2.getCreatedAt().compareTo(t1.getCreatedAt())).collect(Collectors.toList());
        List<Transaction>transactionsOut=transactions.stream().filter(t->t.getCreatedAt().after(startDate)&& t.getCreatedAt().before(endDate)&&(t.getType()==2||t.getType()==3)).
                sorted((t1,t2)->t2.getCreatedAt().compareTo(t1.getCreatedAt())).collect(Collectors.toList());
        int moneyIn=0;
        int moneyOut=0;

        for (Transaction transaction:transactionsIn
             ) {
            moneyIn=moneyIn+transaction.getAmount();
        }

        for (Transaction transaction:transactionsOut
        ) {
            moneyOut=moneyOut+transaction.getAmount();
        }
        profits.add(moneyIn);
        profits.add(moneyOut);
        return profits;
    }
    public List<Object[]> getComicTrending() {
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.WEEK_OF_YEAR, -1);
        Date oneWeekAgo = calendar.getTime();
        List<Object[]>trendingList=historyIncreaseViewRepo.getTrending2(oneWeekAgo,currentDate);
        return trendingList.size()>10?trendingList.subList(0,9):trendingList;
    }
    public List<ComicViewCount>getComicTrendingByActor(String username){
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.WEEK_OF_YEAR, -1);
        Date oneWeekAgo = calendar.getTime();
        List<Object[]>trendingList=historyIncreaseViewRepo.getTrending2(oneWeekAgo,currentDate);
        List<ComicViewCount>comicViewCounts=trendingList.stream().map(objects -> new ComicViewCount((ComicBook) objects[0],(long) objects[1])).collect(Collectors.toList());
        List<ComicViewCount>comicViewCountsByActor=comicViewCounts.stream().filter(cvc->cvc.getComicBook().getActorId().getUserName().equals(username)).collect(Collectors.toList());
        return comicViewCountsByActor.size()>5?comicViewCountsByActor.subList(0,5):comicViewCountsByActor;
    }
}
