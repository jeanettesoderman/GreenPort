package com.greenport.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Project entity representing a client's web project
 * Tracks project status and associated carbon metrics
 */
@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String url;
    
    @Column(nullable = false)
    private String type; // e.g., "E-commerce Store", "Customer Portal", "Marketing Site"
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EcoRating ecoRating;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CarbonMetric> carbonMetrics = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum ProjectStatus {
        ONLINE,
        MAINTENANCE,
        OFFLINE,
        DEVELOPMENT
    }
    
    public enum EcoRating {
        A_PLUS("A+", 0.0, 0.1),
        A("A", 0.1, 0.3),
        B("B", 0.3, 0.5),
        C("C", 0.5, 0.8),
        D("D", 0.8, 1.2),
        E("E", 1.2, 2.0),
        F("F", 2.0, Double.MAX_VALUE);
        
        private final String displayName;
        private final double minCO2;
        private final double maxCO2;
        
        EcoRating(String displayName, double minCO2, double maxCO2) {
            this.displayName = displayName;
            this.minCO2 = minCO2;
            this.maxCO2 = maxCO2;
        }
        
        public String getDisplayName() {
            return displayName;
        }
        
        public static EcoRating fromCO2Value(double co2Grams) {
            for (EcoRating rating : values()) {
                if (co2Grams >= rating.minCO2 && co2Grams < rating.maxCO2) {
                    return rating;
                }
            }
            return F;
        }
    }
}
