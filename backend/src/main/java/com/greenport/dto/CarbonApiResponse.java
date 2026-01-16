package com.greenport.dto;

import lombok.Data;

/**
 * DTO for Website Carbon API response
 */
@Data
public class CarbonApiResponse {
    private String url;
    private Boolean green;
    private Double bytes;
    private Double cleanerThan;
    private Statistics statistics;
    
    @Data
    public static class Statistics {
        private Double adjustedBytes;
        private Double energy;
        private Co2 co2;
        
        @Data
        public static class Co2 {
            private Grid grid;
            private Renewable renewable;
            
            @Data
            public static class Grid {
                private Double grams;
                private Double litres;
            }
            
            @Data
            public static class Renewable {
                private Double grams;
                private Double litres;
            }
        }
    }
}
