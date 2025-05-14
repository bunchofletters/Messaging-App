package com.example.realtimemessageapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class configuration implements WebMvcConfigurer{

    @SuppressWarnings("null") //to suppress the nonnull warning
    @Override
    public void addCorsMappings(CorsRegistry registry){
        System.out.println("Cors Initalized");
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("*")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
