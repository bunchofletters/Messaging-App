package com.example.realtimemessageapp.CRUD;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.message;

@Repository
public interface messageHandling extends MongoRepository<message, String>{
    
    message findByServerId(String serverId);
}
