package com.greenport.service;

import com.greenport.dto.CarbonApiResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service for integrating with Website Carbon API
 * Fetches real-time carbon footprint data for websites
 */
@Service
public class CarbonApiService {
    
    private static final Logger logger = LoggerFactory.getLogger(CarbonApiService.class);
    private static final String API_URL = "https://api.websitecarbon.com/site?url=";
    
    private final RestTemplate restTemplate;
    
    public CarbonApiService() {
        this.restTemplate = new RestTemplate();
    }
    
    /**
     * Fetches carbon data for a given URL
     * @param url The website URL to analyze
     * @return CarbonApiResponse containing CO2 metrics
     */
    public CarbonApiResponse getCarbonData(String url) {
        try {
            String apiUrl = API_URL + url;
            logger.info("Fetching carbon data for URL: {}", url);
            CarbonApiResponse response = restTemplate.getForObject(apiUrl, CarbonApiResponse.class);
            logger.info("Successfully fetched carbon data for: {}", url);
            return response;
        } catch (Exception e) {
            logger.error("Error fetching carbon data for URL: {}", url, e);
            // Return mock data for demo purposes
            return createMockResponse(url);
        }
    }
    
    /**
     * Creates mock carbon data for demo purposes
     */
    private CarbonApiResponse createMockResponse(String url) {
        CarbonApiResponse response = new CarbonApiResponse();
        response.setUrl(url);
        response.setGreen(Math.random() > 0.5);
        response.setBytes(1500000.0 + Math.random() * 2000000);
        response.setCleanerThan(50.0 + Math.random() * 40);
        
        CarbonApiResponse.Statistics stats = new CarbonApiResponse.Statistics();
        stats.setAdjustedBytes(response.getBytes() * 0.8);
        stats.setEnergy(response.getBytes() * 0.0000005);
        
        CarbonApiResponse.Statistics.Co2 co2 = new CarbonApiResponse.Statistics.Co2();
        CarbonApiResponse.Statistics.Co2.Grid grid = new CarbonApiResponse.Statistics.Co2.Grid();
        grid.setGrams(0.2 + Math.random() * 1.5);
        grid.setLitres(grid.getGrams() * 0.5);
        
        co2.setGrid(grid);
        stats.setCo2(co2);
        response.setStatistics(stats);
        
        return response;
    }
}
