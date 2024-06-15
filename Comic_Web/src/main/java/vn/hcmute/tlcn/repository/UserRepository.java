package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.hcmute.tlcn.entity.User;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findOneByUserNameAndPassword(String username,String password);
    Optional<User> findOneByUserName(String username);
    Optional<User>findOneByEmail(String email);
    @Query("SELECT t FROM User t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%', :input, '%'))")
    List<User> searchByInput(String input);

    @Query("SELECT FUNCTION('MONTH', u.createdAt) AS month, COUNT(u) AS count " +
            "FROM User u " +
            "WHERE FUNCTION('YEAR', u.createdAt) = :year " +
            "GROUP BY FUNCTION('MONTH', u.createdAt)")
    List<Object[]> findUserRegistrationCountByMonth(int year);

    @Query("SELECT FUNCTION('DAY', u.createdAt) AS day, COUNT(u) AS count " +
            "FROM User u " +
            "WHERE FUNCTION('YEAR', u.createdAt) = :year AND FUNCTION('MONTH', u.createdAt) = :month " +
            "GROUP BY FUNCTION('DAY', u.createdAt)")
    List<Object[]> findUserRegistrationCountByDay(int year, int month);

    @Query("SELECT " +
            "SUM(CASE WHEN FUNCTION('TIMESTAMPDIFF', YEAR, u.birthDate, CURRENT_DATE) < 16 THEN 1 ELSE 0 END) as under16, " +
            "SUM(CASE WHEN FUNCTION('TIMESTAMPDIFF', YEAR, u.birthDate, CURRENT_DATE) BETWEEN 16 AND 22 THEN 1 ELSE 0 END) as from16To22, " +
            "SUM(CASE WHEN FUNCTION('TIMESTAMPDIFF', YEAR, u.birthDate, CURRENT_DATE) BETWEEN 22 AND 30 THEN 1 ELSE 0 END) as from22To30, " +
            "SUM(CASE WHEN FUNCTION('TIMESTAMPDIFF', YEAR, u.birthDate, CURRENT_DATE) > 30 THEN 1 ELSE 0 END) as over30 " +
            "FROM User u")
    List<Object[]> findAgeDistribution();
}
