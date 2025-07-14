package com.example.realtimemessageapp.api_service_access;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.realtimemessageapp.CRUD.chatServerHandling;
import com.example.realtimemessageapp.CRUD.messageHandling;

@RestController
@RequestMapping("/message")
public class message_service {
    
    @Autowired
    private chatServerHandling chatserverhandler;

    @Autowired
    private messageHandling messagehandler;
    
    
}
