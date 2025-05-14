package com.example.realtimemessageapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class greet {
    
    @GetMapping("greet")
    public String getGreet(){
        return "Hello World";
    }
}
