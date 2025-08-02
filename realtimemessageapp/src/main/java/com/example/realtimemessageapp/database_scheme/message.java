package com.example.realtimemessageapp.database_scheme;

import java.beans.ConstructorProperties;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.lang.NonNull;

@Document("Message")
public class Message {

    private String messageContent; //content of the message
    private String sender; //the sender objectid
    private int MessageNumber; //for display order
    private String serverId; //this is the serverid from another scheme. using this instead of directly storing the friend id

    public Message(){}

    @ConstructorProperties({"message", "order", "server"})
    public Message(String message, int order, String server){
        this.messageContent = message;
        this.MessageNumber = order;
        this.serverId = server;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
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
