package com.example.realtimemessageapp.DTO;

import java.beans.ConstructorProperties;

public class friendListDTO {
    

    private String displayName;
    private String FriendId;
    private String roomId;

    public friendListDTO(){};

    @ConstructorProperties({"FriendId", "displayName", "roomId"})
    public friendListDTO(String friendId, String friendDisplayName, String roomId){
        this.displayName = friendDisplayName;
        this.FriendId = friendId;
        this.roomId = roomId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getFriendId() {
        return FriendId;
    }

    public void setFriendId(String friendId) {
        FriendId = friendId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    
}
