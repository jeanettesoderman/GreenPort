package com.greenport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * GreenPort - Green IT Client Portal and Sustainability Tool
 * 
 * Main application class for the Spring Boot backend.
 * This application provides a client portal with real-time CO2 footprint tracking
 * for websites, helping businesses achieve their sustainability goals.
 */
@SpringBootApplication
@EnableScheduling
public class GreenPortApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreenPortApplication.class, args);
        System.out.println("\n" +
            "  ██████╗ ██████╗ ███████╗███████╗███╗   ██╗██████╗  ██████╗ ██████╗ ████████╗\n" +
            " ██╔════╝ ██╔══██╗██╔════╝██╔════╝████╗  ██║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝\n" +
            " ██║  ███╗██████╔╝█████╗  █████╗  ██╔██╗ ██║██████╔╝██║   ██║██████╔╝   ██║   \n" +
            " ██║   ██║██╔══██╗██╔══╝  ██╔══╝  ██║╚██╗██║██╔═══╝ ██║   ██║██╔══██╗   ██║   \n" +
            " ╚██████╔╝██║  ██║███████╗███████╗██║ ╚████║██║     ╚██████╔╝██║  ██║   ██║   \n" +
            "  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   \n" +
            "\n" +
            " 🌱 Green IT Client Portal - Backend Running on http://localhost:8080\n" +
            " 📊 H2 Console: http://localhost:8080/h2-console\n" +
            "\n");
    }
}
