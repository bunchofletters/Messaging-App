package com.example.realtimemessageapp.otherclasses;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class chatController {
    
    private final SimpMessagingTemplate message;

    public chatController(SimpMessagingTemplate m){
        this.message = m;
    }

    @MessageMapping("/chat/send")
    public void sendMessage(String roomId, String message){
        this.message.convertAndSend("/chat/" + roomId, message);
    }
}
