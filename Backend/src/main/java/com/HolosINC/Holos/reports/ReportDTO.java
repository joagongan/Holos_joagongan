package com.HolosINC.Holos.reports;
import com.HolosINC.Holos.work.Work;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {
    
    private String name;

    private String description;
    
    private Long workId;

    private String reportType;

    public Report createReport(Work work, ReportType reportType) {
        Report report = new Report();
        report.setName(this.getName());
        report.setDescription(this.getDescription());
        report.setWork(work);
        report.setReportType(reportType);
        return report;
    }
        
}
