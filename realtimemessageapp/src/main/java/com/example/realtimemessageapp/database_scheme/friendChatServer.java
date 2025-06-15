package com.example.realtimemessageapp.database_scheme;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("friend_server")
public class friendChatServer {
    
    @Id
    private String id;

    public friendChatServer() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    
}
