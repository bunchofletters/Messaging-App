package com.example.realtimemessageapp.database_scheme;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("Message")
public class message {

    private String messageContent; //content of the message
    private String sender; //the sender objectid
    private int MessageNumber; //for display order
    private String serverId; //this is the serverid from another scheme. using this instead of directly storing the friend id

    public message(){}

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
