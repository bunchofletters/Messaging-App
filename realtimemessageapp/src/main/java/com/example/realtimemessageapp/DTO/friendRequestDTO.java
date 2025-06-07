package com.example.realtimemessageapp.DTO;

import java.beans.ConstructorProperties;

public class friendRequestDTO {
    
    private String displayName;
    private String FriendId;

    public friendRequestDTO(){};

    @ConstructorProperties({"FriendId", "displayName"})
    public friendRequestDTO(String friendId, String friendDisplayName){
        this.displayName = friendDisplayName;
        this.FriendId = friendId;
    }

    public String getdisplayName() {
        return displayName;
    }

    public String getFriendId() {
        return FriendId;
    }

    public void setdisplayName(String friendDisplayName) {
        displayName = friendDisplayName;
    }

    public void setFriendId(String friendId) {
        FriendId = friendId;
    }

    
}
