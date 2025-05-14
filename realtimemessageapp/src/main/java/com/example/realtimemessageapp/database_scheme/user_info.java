package com.example.realtimemessageapp.database_scheme;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("User_Info")
public class user_info {
    @Id
    private String id;

    private String username;
    private String password;

    public user_info(String username, String password) {
        super();
        this.username = username;
        this.password = password;
    }
    public user_info(){}

    public String getID(){
        return id;
    }

    public String getUsername(){
        return username;
    }

    public String getPassword(){
        return password;
    }
}
