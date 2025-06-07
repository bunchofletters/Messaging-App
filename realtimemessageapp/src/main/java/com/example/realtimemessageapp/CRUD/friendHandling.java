package com.example.realtimemessageapp.CRUD;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.friend_info;
import java.util.List;


@Repository
public interface friendHandling extends MongoRepository<friend_info, String>{
    boolean existsByUserIdAndFriendId(ObjectId userId, ObjectId friendId);

    List<friend_info> findByUserId(ObjectId userId);

    List<friend_info> findByFriendId(ObjectId friendId);

    void deleteByUserIdAndFriendId(ObjectId userId, ObjectId friendId);
}
