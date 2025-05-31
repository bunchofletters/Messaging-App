package com.example.realtimemessageapp.CRUD;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.friend_info;

@Repository
public interface friendHandling extends MongoRepository<friend_info, String>{
    boolean existsByUserIdAndFriendId(ObjectId userId, ObjectId friendId);    
}
