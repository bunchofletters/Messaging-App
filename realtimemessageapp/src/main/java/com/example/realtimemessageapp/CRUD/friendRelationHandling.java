package com.example.realtimemessageapp.CRUD;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.friend_relation;

@Repository
public interface friendRelationHandling extends MongoRepository<friend_relation, String>{
    
}
