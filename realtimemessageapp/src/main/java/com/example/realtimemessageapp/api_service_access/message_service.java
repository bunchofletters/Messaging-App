package com.example.realtimemessageapp.api_service_access;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.realtimemessageapp.CRUD.chatServerHandling;
import com.example.realtimemessageapp.CRUD.messageHandling;
import com.example.realtimemessageapp.database_scheme.Message;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/message")
public class message_service {
    
    @Autowired
    private chatServerHandling chatserverhandler;

    @Autowired
    private messageHandling messagehandler;

    @Autowired
    private cookie_service cookieHandler;

    /**
     * Svae a message to the db to be retrieve when the covnersation is opened again
     * @param entity the body of the json
     * @param cookie the credentials
     * @return
     */
    @PostMapping("/saveMessage")
    public ResponseEntity<Void> saveMessage(
        @RequestBody Message entity,
        HttpServletRequest cookie
    ) {
        String id = cookieHandler.getId(cookie);
        entity.setSender(id);
        try{
            //Catch if server id is not send up with the messageContent. Server Id must not be null
            if(entity.getServerId() == null || entity.getServerId().equals("")){
                throw new Exception("Server Id Not Present") ;
            }
            //No point in saving an empty message, allows this to ignore saving empty messages
            if(entity.getMessageContent() == null || entity.getMessageContent().equals("")){
                throw new Exception("Message is Empty");
            }
            messagehandler.save(entity);
        } catch(Exception e){
            System.out.println("Issue saving Message w/ error: " + e);
            return ResponseEntity.status(500).build();
        }

        return ResponseEntity.ok().build();
    }

    
    // @PostMapping("/retreiveMessage")
    // public ResponseEntity<messageDTO> retrieveMessage(
    //     @RequestBody String entity, //this should be a body with just the id
    //     HttpServletRequest cookie
    // ) {
    //     String id = cookieHandler.getId(cookie);
    //     String server = entity.
        
    // }
    
    
    
    
}
