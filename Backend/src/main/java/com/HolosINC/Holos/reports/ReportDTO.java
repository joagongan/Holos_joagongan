package com.HolosINC.Holos.reports;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ReportDTO {
    
    @Size(max = 50)
    @NotNull
    private String name;

    @Size(max = 255)
    @NotNull
    private String description;

    @NotNull
    private ReportStatus status;
    
    @NotNull
    private Long workId;

    @Size(max = 50)
    @NotNull
    private String reportType;
}
