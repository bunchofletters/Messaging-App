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

    /**
     * Check if a cookie exist
     * @param request credientials to be able to check for the associated cookies
     * @return false if cookie not found or true if found
     */
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

    /**
     * Query for the string value in the cookie and return it: in this case it should be the user's id 
     * @param request credientials to be able to check for the associated cookies
     * @return the users id store in the cookie on account creation or login
     */
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
