package com.example.realtimemessageapp.database_scheme;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("friend_server")
public class friendChatServer {
    
    @Id
    private ObjectId id;

    private ObjectId friend1;
    
    private ObjectId friend2;

    public friendChatServer() {}

    public friendChatServer(ObjectId friend1, ObjectId friend2){
        this.friend1 = friend1;
        this.friend2 = friend2;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getFriend1() {
        return friend1;
    }

    public void setFriend1(ObjectId friend1) {
        this.friend1 = friend1;
    }

    public ObjectId getFriend2() {
        return friend2;
    }

    public void setFriend2(ObjectId friend2) {
        this.friend2 = friend2;
    }

    
    
}
