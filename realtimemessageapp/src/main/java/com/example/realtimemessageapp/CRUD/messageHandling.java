package com.example.realtimemessageapp.CRUD;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.Message;

@Repository
public interface messageHandling extends MongoRepository<Message, String>{
    
    Message findByServerId(String serverId);
}
