package com.example.realtimemessageapp.api_service_access;

import org.springframework.web.bind.annotation.RestController;

import com.example.realtimemessageapp.CRUD.accountHandling;
import com.example.realtimemessageapp.database_scheme.user_info;
import com.example.realtimemessageapp.DTO.userDTO;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@RequestMapping("/account")
public class account_service {

    private final accountHandling accountHandler;

    public account_service(accountHandling accountHandler){
        this.accountHandler = accountHandler;
    }
    
    @PostMapping("/create_account")
    public String postMethodName(@RequestBody user_info entity) {
        /*entity should contain and password
        Example:
        {
            username: example,
            password: com
        }
        */
        user_info saveuser = accountHandler.save(entity);
        return "New Account Created with ID: " + saveuser.getID();
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<userDTO>> findByUsername(@RequestParam("username") String username){
        System.out.println("finding user: " + username);
        List<user_info> users = accountHandler.findByUsername(username);

        if(users.isEmpty())
            return ResponseEntity.notFound().build();
        

        List<userDTO> userDTO = users.stream()
                                .map(user -> new userDTO(user.getID(), user.getUsername()))
                                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTO);
    }
    
}
