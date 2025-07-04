package com.example.realtimemessageapp.CRUD;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.friend_relation;
import java.util.List;
import org.bson.types.ObjectId;


@Repository
public interface friendRelationHandling extends MongoRepository<friend_relation, String>{
    List<friend_relation> findByFriendIdOrUserId(ObjectId userId, Object friendId);
}
