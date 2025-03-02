package com.HolosINC.Holos.commision;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommisionRepository extends JpaRepository<Commision, Long>{
    
}
