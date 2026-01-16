package com.greenport.repository;

import com.greenport.model.CarbonMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CarbonMetricRepository extends JpaRepository<CarbonMetric, Long> {
    List<CarbonMetric> findByProjectIdOrderByMeasuredAtDesc(Long projectId);
    List<CarbonMetric> findByProjectIdAndMeasuredAtBetween(Long projectId, LocalDateTime start, LocalDateTime end);
}
