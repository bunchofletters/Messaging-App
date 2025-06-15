package com.example.realtimemessageapp.DTO;

public class messageDTO {
    
    private String messageContent;
    private boolean fromUser; //true if the message is from the user false otherwise

    public messageDTO() {}

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public boolean isFromUser() {
        return fromUser;
    }

    public void setFromUser(boolean fromUser) {
        this.fromUser = fromUser;
    }

}
