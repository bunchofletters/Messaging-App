package com.example.realtimemessageapp.config;

import com.example.realtimemessageapp.filter.FilterFrontend;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<FilterFrontend> filterBean() {
        System.out.println("Registering Filter ...");
        FilterRegistrationBean<FilterFrontend> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new FilterFrontend());
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(Integer.MIN_VALUE);
        return registrationBean;
    }
}
