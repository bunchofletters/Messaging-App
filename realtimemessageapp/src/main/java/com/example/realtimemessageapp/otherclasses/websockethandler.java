package com.example.realtimemessageapp.otherclasses;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class websockethandler extends TextWebSocketHandler{
    
    @SuppressWarnings("null") //to suppress the nonnull warning
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        System.out.println("web message receive");
        session.sendMessage(message);
    }
}
