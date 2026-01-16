package com.greenport.config;

import com.greenport.model.CarbonMetric;
import com.greenport.model.Project;
import com.greenport.repository.CarbonMetricRepository;
import com.greenport.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * Seeds the database with sample data for demo purposes
 */
@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private CarbonMetricRepository carbonMetricRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        carbonMetricRepository.deleteAll();
        projectRepository.deleteAll();
        
        // Create sample projects
        Project project1 = new Project();
        project1.setName("E-commerce Store");
        project1.setUrl("https://example-ecommerce.com");
        project1.setType("E-commerce Store");
        project1.setStatus(Project.ProjectStatus.ONLINE);
        project1.setEcoRating(Project.EcoRating.A);
        
        Project project2 = new Project();
        project2.setName("Customer Portal");
        project2.setUrl("https://portal.example.com");
        project2.setType("Customer Portal");
        project2.setStatus(Project.ProjectStatus.MAINTENANCE);
        project2.setEcoRating(Project.EcoRating.B);
        
        Project project3 = new Project();
        project3.setName("Marketing Site");
        project3.setUrl("https://marketing.example.com");
        project3.setType("Marketing Site");
        project3.setStatus(Project.ProjectStatus.ONLINE);
        project3.setEcoRating(Project.EcoRating.A_PLUS);
        
        List<Project> projects = projectRepository.saveAll(Arrays.asList(project1, project2, project3));
        
        // Create sample carbon metrics for each project
        for (Project project : projects) {
            createSampleMetrics(project);
        }
        
        System.out.println("\n✅ Database seeded with " + projects.size() + " projects and sample metrics\n");
    }
    
    private void createSampleMetrics(Project project) {
        LocalDateTime now = LocalDateTime.now();
        double baseCO2 = getBaseCO2ForRating(project.getEcoRating());
        
        // Create metrics for the last 30 days
        for (int i = 30; i >= 0; i--) {
            CarbonMetric metric = new CarbonMetric();
            metric.setProject(project);
            
            // Add some variation to the data
            double variation = (Math.random() - 0.5) * 0.2;
            metric.setCo2Grams(baseCO2 + variation);
            metric.setEnergyKwh(metric.getCo2Grams() * 0.0005);
            metric.setPageWeight((int)(1500000 + Math.random() * 1000000));
            metric.setCleanerThanPercentage(50.0 + Math.random() * 40);
            metric.setMeasuredAt(now.minusDays(i));
            
            carbonMetricRepository.save(metric);
        }
    }
    
    private double getBaseCO2ForRating(Project.EcoRating rating) {
        switch (rating) {
            case A_PLUS: return 0.05;
            case A: return 0.2;
            case B: return 0.4;
            case C: return 0.65;
            case D: return 1.0;
            case E: return 1.5;
            case F: return 2.5;
            default: return 0.5;
        }
    }
}
