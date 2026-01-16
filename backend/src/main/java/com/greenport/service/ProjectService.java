package com.greenport.service;

import com.greenport.dto.CarbonApiResponse;
import com.greenport.model.CarbonMetric;
import com.greenport.model.Project;
import com.greenport.repository.CarbonMetricRepository;
import com.greenport.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service for managing projects and their carbon metrics
 */
@Service
@Transactional
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private CarbonMetricRepository carbonMetricRepository;
    
    @Autowired
    private CarbonApiService carbonApiService;
    
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
    
    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        
        project.setName(projectDetails.getName());
        project.setUrl(projectDetails.getUrl());
        project.setType(projectDetails.getType());
        project.setStatus(projectDetails.getStatus());
        project.setEcoRating(projectDetails.getEcoRating());
        
        return projectRepository.save(project);
    }
    
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    
    /**
     * Updates carbon metrics for a project by fetching fresh data from the API
     */
    public CarbonMetric updateCarbonMetrics(Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));
        
        CarbonApiResponse apiResponse = carbonApiService.getCarbonData(project.getUrl());
        
        CarbonMetric metric = new CarbonMetric();
        metric.setProject(project);
        metric.setCo2Grams(apiResponse.getStatistics().getCo2().getGrid().getGrams());
        metric.setEnergyKwh(apiResponse.getStatistics().getEnergy());
        metric.setPageWeight(apiResponse.getBytes().intValue());
        metric.setCleanerThanPercentage(apiResponse.getCleanerThan());
        metric.setMeasuredAt(LocalDateTime.now());
        
        // Update project eco rating based on latest CO2 measurement
        Project.EcoRating newRating = Project.EcoRating.fromCO2Value(metric.getCo2Grams());
        project.setEcoRating(newRating);
        projectRepository.save(project);
        
        return carbonMetricRepository.save(metric);
    }
    
    /**
     * Gets carbon metrics history for a project
     */
    public List<CarbonMetric> getProjectMetrics(Long projectId) {
        return carbonMetricRepository.findByProjectIdOrderByMeasuredAtDesc(projectId);
    }
}
