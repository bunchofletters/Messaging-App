package com.example.realtimemessageapp.CRUD;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.friendChatServer;

@Repository
public interface chatServerHandling extends MongoRepository<friendChatServer, ObjectId>{
    
    @Query("{$or: [ {'friend1': ?0, 'friend2': ?1}, {'friend1': ?1, 'friend2': ?0} ]}")
    friendChatServer findByFriend1AndFriend2(ObjectId f1, ObjectId f2);
}
