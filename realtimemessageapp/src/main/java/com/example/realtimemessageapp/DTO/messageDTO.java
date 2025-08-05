package com.example.realtimemessageapp.DTO;

public class messageDTO {
    
    private String content;
    private String side; //true if the message is from the user false otherwise [enforce that side is either a 0 or 1]:: 0 = side or 1 = fromFriend.
    private int order;
    private String displayName;

    public messageDTO() {}

    public messageDTO(String messContent, String side, int order, String displayName){
        this.content = messContent;
        this.side = side;
        this.order = order;
        this.displayName = displayName;
    }

    public String getcontent() {
        return content;
    }

    public void setcontent(String content) {
        this.content = content;
    }

    public void setside(String side) {
        this.side = side;
    }

    public String getside() {
        return side;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    
    

}
