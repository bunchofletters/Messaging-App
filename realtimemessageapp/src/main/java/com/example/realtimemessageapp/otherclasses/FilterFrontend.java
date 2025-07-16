package com.example.realtimemessageapp.otherclasses;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

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

            //skip WebSocket prevent filter from blocking websocket connection
            if("websocket".equalsIgnoreCase(req.getHeader("Upgrade"))) { //websocket will reqeust to upgrade http connection to a websocket connection
                chain.doFilter(request, response);
                return;
            }

            //for stomp websocket: stomp may not have websocket since it's "http://..."
            if(req.getRequestURI().startsWith("/ws/")){
                chain.doFilter(request, response);
                System.out.println("pass");
                return;
            }

            //Prevents request that doesn't have the require header. Good for Authorization
            String frontEndHeader = req.getHeader(REQUIRE_HEADER);
            if (frontEndHeader == null || !frontEndHeader.equals(HEADER_VALUE)) {
                res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                res.getWriter().write("Blocked By Filter: Missing Required Header");
                return;
            } 

            String decodeurl = java.net.URLDecoder.decode(req.getRequestURL().toString(), StandardCharsets.UTF_8); //decode the url to only utf-8 characters [unencode the url if it was being encoded]

            //Prevent Traversal Attack. Good for Security
            if(decodeurl.contains("../")) {
                res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                res.getWriter().write("Blocked By Filter: Potential Traversal Attack");
            }


        chain.doFilter(request, response);
    }

}
