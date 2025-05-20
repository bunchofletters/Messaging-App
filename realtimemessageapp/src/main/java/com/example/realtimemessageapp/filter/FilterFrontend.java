package com.example.realtimemessageapp.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

import java.io.IOException;

public class FilterFrontend implements Filter{
    
    private static String REQUIRE_HEADER = "FE_XP";
    private static String HEADER_VALUE = "react-frontend";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("Filter initialized");
    }


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException{
            HttpServletRequest req = (HttpServletRequest) request;
            HttpServletResponse res = (HttpServletResponse) response;

            //skip OPTION method to prevent filter from stopping intital option preflight
            if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
                chain.doFilter(request, response);
                return;
            }

            String frontEndHeader = req.getHeader(REQUIRE_HEADER);
            if (frontEndHeader == null || !frontEndHeader.equals(HEADER_VALUE)) {
                res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                res.getWriter().write("Forbidden: Invalid Access");
                return;
            } 


        chain.doFilter(request, response);
    }

}
