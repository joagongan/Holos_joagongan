package com.HolosINC.Holos.reports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long>{
    boolean existsByMadeByIdAndWorkIdAndReportTypeId(Long madeById, Long workId, Long reportTypeId);
}
