package com.greenport.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * CarbonMetric entity representing CO2 measurements for a project
 * Stores historical carbon footprint data for trend analysis
 */
@Entity
@Table(name = "carbon_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarbonMetric {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @Column(nullable = false)
    private Double co2Grams; // CO2 per page view in grams
    
    @Column(nullable = false)
    private Double energyKwh; // Energy consumption in kWh
    
    @Column(nullable = false)
    private Integer pageWeight; // Page size in bytes
    
    @Column(name = "measured_at", nullable = false)
    private LocalDateTime measuredAt;
    
    @Column(name = "cleaner_than_percentage")
    private Double cleanerThanPercentage; // Percentage of websites this is cleaner than
    
    @PrePersist
    protected void onCreate() {
        if (measuredAt == null) {
            measuredAt = LocalDateTime.now();
        }
    }
}
