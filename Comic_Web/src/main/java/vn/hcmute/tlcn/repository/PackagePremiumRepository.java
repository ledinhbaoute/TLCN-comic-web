package vn.hcmute.tlcn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.hcmute.tlcn.entity.PackagePremium;

@Repository
public interface PackagePremiumRepository extends JpaRepository<PackagePremium,Integer> {
}
