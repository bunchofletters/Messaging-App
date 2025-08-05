package com.example.realtimemessageapp.database_scheme;

import java.beans.ConstructorProperties;

import org.springframework.data.mongodb.core.mapping.Document;


@Document("Message")
public class Message {

    private String content; //content of the message
    private String sender; //the sender objectid
    private int MessageNumber; //for display order
    private String serverId; //this is the serverid from another scheme. using this instead of directly storing the friend id

    public Message(){}

    @ConstructorProperties({"message", "order", "server"})
    public Message(String message, int order, String server){
        this.content = message;
        this.MessageNumber = order;
        this.serverId = server;
    }

    public String getcontent() {
        return content;
    }

    public void setcontent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public int getMessageNumber() {
        return MessageNumber;
    }

    public void setMessageNumber(int messageNumber) {
        MessageNumber = messageNumber;
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) { //this function probably does nothing since it'll probably never be used
        this.serverId = serverId;
    }

    
    
    
    
}
