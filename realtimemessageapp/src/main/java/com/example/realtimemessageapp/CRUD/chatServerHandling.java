package com.example.realtimemessageapp.CRUD;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.friendChatServer;

@Repository
public interface chatServerHandling extends MongoRepository<friendChatServer, String>{
    
    friendChatServer findByFriend1AndFriend2(ObjectId f1, ObjectId f2);
}
