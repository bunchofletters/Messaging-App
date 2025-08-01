package com.example.realtimemessageapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class securityConfig {
    @Bean
    public PasswordEncoder encodePassword(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .cors(cors ->{})
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/account/**", "/cookie/**", "/friend/**", "/ws/chat/**", "/message/**").permitAll()
                .anyRequest().authenticated()
            ).build();
    }

    //disable security filter allows for testing to see if security is blocking request
    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // return http
    //     .csrf(csrf -> csrf.disable())
    //     .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()).build();
            
    // }
    
}
