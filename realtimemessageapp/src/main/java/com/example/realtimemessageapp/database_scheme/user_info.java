package com.example.realtimemessageapp.database_scheme;

import java.beans.ConstructorProperties;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("User_Info")
public class user_info {
    @Id
    private String id;

    @Indexed(unique = true)
    private String username;
    private String displayname;
    private String password;

    // FIXME: [not a acutally issue using this as an indicator for VSCODE] Use ConstructorProperties or else querying won't work
    @ConstructorProperties({"username", "displayname", "password"})
    public user_info(String username, String displayname, String password
    ) {
        // super();
        this.username = username;
        this.displayname = displayname;
        this.password = password;
    }

    public user_info(){}

    public String getID(){
        return id;
    }

    public String getDsiplayName(){
        return displayname;
    }

    public String getUsername(){
        return username;
    }

    public String getPassword(){
        return password;
    }
}
