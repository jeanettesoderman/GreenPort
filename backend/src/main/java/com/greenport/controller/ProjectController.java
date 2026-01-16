package com.greenport.controller;

import com.greenport.model.CarbonMetric;
import com.greenport.model.Project;
import com.greenport.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for Project management
 * Provides endpoints for CRUD operations and carbon metrics
 */
@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project created = projectService.createProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        try {
            Project updated = projectService.updateProject(id, project);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/metrics")
    public ResponseEntity<CarbonMetric> updateMetrics(@PathVariable Long id) {
        try {
            CarbonMetric metric = projectService.updateCarbonMetrics(id);
            return ResponseEntity.ok(metric);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}/metrics")
    public ResponseEntity<List<CarbonMetric>> getProjectMetrics(@PathVariable Long id) {
        List<CarbonMetric> metrics = projectService.getProjectMetrics(id);
        return ResponseEntity.ok(metrics);
    }
}
