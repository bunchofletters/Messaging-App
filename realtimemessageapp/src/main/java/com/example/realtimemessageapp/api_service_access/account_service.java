package com.example.realtimemessageapp.api_service_access;

import org.springframework.web.bind.annotation.RestController;

import com.example.realtimemessageapp.CRUD.accountHandling;
import com.example.realtimemessageapp.DTO.userDTO;
import com.example.realtimemessageapp.database_scheme.user_info;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@RequestMapping("/account")
public class account_service {

    @Autowired
    private accountHandling accountHandler;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // public account_service(accountHandling accountHandler){
    //     this.accountHandler = accountHandler;
    // }
    /**
     * Creates an acccount for an user
     * @param entity 
     * {
     *  username: example,
     *  displayname: dot,
     *  password: com
     * }
     * @param response this is to store cookies
     * @return probably don't need to reutrn anything, for now a result of the created user id
     * change to just a confimration message or ok in the future and not ok on failure
     */
    @PostMapping("/create_account")
    public String postMethodName(@RequestBody user_info entity, HttpServletResponse response) {
        System.out.println("creating Account " + entity.getPassword());
        String encryptedPassword = passwordEncoder.encode(entity.getPassword());
        entity.setPassword(encryptedPassword);
        user_info saveuser = accountHandler.save(entity);
        //Cookies
        Cookie cookie = new Cookie("id", saveuser.getID());
        cookie.setHttpOnly(true); //prevent modification clientside
        cookie.setSecure(false); //allow over http
        cookie.setMaxAge(60 * 60 * 24 * 3); //seconds * minutes * hours * days
        cookie.setPath("/");
        response.addCookie(cookie);
        return "New Account Created with ID: " + saveuser.getID();
    }
    
    /**
     * Checks if the user exist alread in the DB
     * @param username ?username should be included in the url header. querying for the value set in username
     * @return 404 not found on failure and 200 ok on success
     */
    @GetMapping("/user")
    public ResponseEntity<Void> findByUsername(@RequestParam("username") String username){
        user_info user = accountHandler.findByUsername(username);
        if(user == null)
            return ResponseEntity.notFound().build(); //return a 404 not found | user not found valid
        return ResponseEntity.ok().build(); //return a 200 ok | user found invalid <--does nothing
    }

    /**
     * Login in mapping, check if the user is in the db and the password match if it does
     * set the cookie with the id of the user
     * @param entity should contain a username and password
     * @param response for storing cookies
     * @return 404 not found on failure and 200 ok on success
     */
    @PostMapping("/login")
    public ResponseEntity<Void> loginIn(@RequestBody userDTO entity, HttpServletResponse response) {
        System.out.println(entity.getUsername() + " " + entity.getPassword());
        user_info user = accountHandler.findByUsername(entity.getUsername());

        if (user == null)
            return ResponseEntity.notFound().build();
            
        boolean match = passwordEncoder.matches(entity.getPassword(), user.getPassword());

        if(!match)
            return ResponseEntity.notFound().build();

        //cookies
        Cookie cookie = new Cookie("id", user.getID());
        cookie.setHttpOnly(true); //prevent modification clientside
        cookie.setSecure(false); //allow over http
        cookie.setMaxAge(60 * 60 * 24 * 3); //seconds * minutes * hours * days
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }
}
