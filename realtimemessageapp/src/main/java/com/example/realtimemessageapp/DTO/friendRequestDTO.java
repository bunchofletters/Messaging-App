package com.example.realtimemessageapp.DTO;

import org.bson.types.ObjectId;

public class friendRequestDTO {
    
    private String displayName;
    private ObjectId FriendId;

    public friendRequestDTO(){};

    public friendRequestDTO(ObjectId friendId, String friendDisplayName){
        this.displayName = friendDisplayName;
        this.FriendId = friendId;
    }

    public String getdisplayName() {
        return displayName;
    }

    public ObjectId getFriendId() {
        return FriendId;
    }

    public void setdisplayName(String friendDisplayName) {
        displayName = friendDisplayName;
    }

    public void setFriendId(ObjectId friendId) {
        FriendId = friendId;
    }

    
}
