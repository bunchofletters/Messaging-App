package com.example.realtimemessageapp.DTO;

public class userDTO {
    private String username;
    private String password;

    public userDTO() {};

    public userDTO(String username, String password) {
        this.password = password;
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }
}
