package com.example.realtimemessageapp.DTO;

import java.beans.ConstructorProperties;

public class chatDTO {

    private String message;
    private String room;
    private String side;
    private int order;
    private String displayName;

    public chatDTO(){}

    @ConstructorProperties({"message", "room", "side", "order","displayName"})
    public chatDTO(String message, String room, String side, int order, String dname){
        this.message = message;
        this.room = room;
        this.side = side;
        this.order = order;
        this.displayName = dname;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getRoom() {
        return room;
    }
    public void setRoom(String room) {
        this.room = room;
    }

    public String getSide() {
        return side;
    }

    public void setSide(String side) {
        this.side = side;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getdName() {
        return displayName;
    }

    public void setdName(String dName) {
        this.displayName = dName;
    }

    

    
    
}
