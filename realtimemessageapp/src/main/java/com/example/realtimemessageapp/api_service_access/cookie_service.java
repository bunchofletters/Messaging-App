package com.example.realtimemessageapp.api_service_access;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.realtimemessageapp.CRUD.accountHandling;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Cookie;

@RestController
@RequestMapping("/cookie")
public class cookie_service {

    @Autowired
    private accountHandling accountHandler;

    @PostMapping("/check_cookie")
    public boolean confirmCookie(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        boolean exist = false;
        //No cookies
        if (cookies == null)
            return false;
        for (Cookie cookie : cookies){
            if("id".equals(cookie.getName())){
                exist = accountHandler.existsById(cookie.getValue());
            }
            if (exist)
                return true;
        }
        return false;
    }

    public String getId(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        boolean exist = false;
        String CookieValue = null;
        for (Cookie cookie : cookies){
            if("id".equals(cookie.getName())){
                exist = accountHandler.existsById(cookie.getValue());
            }
            if (exist){
                CookieValue = cookie.getValue();
                break;
            }
        }
        return CookieValue;
    }
}
