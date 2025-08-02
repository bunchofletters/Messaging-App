package com.example.realtimemessageapp.DTO;

public class messageDTO {
    
    private String messageContent;
    private String fromUser; //true if the message is from the user false otherwise [enforce that fromuser is either a 0 or 1]:: 0 = fromUser or 1 = fromFriend.

    public messageDTO() {}

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public String isFromUser() {
        return fromUser;
    }

    public void setFromUser(String fromUser) {
        this.fromUser = fromUser;
    }

}
