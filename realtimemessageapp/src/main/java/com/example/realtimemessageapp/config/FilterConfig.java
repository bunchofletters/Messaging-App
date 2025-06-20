package com.example.realtimemessageapp.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.realtimemessageapp.otherclasses.FilterFrontend;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<FilterFrontend> filterBean() {

        FilterRegistrationBean<FilterFrontend> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new FilterFrontend());
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(Integer.MIN_VALUE);
        return registrationBean;
    }

}
