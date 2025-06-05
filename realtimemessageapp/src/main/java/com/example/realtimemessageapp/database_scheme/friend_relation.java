package com.example.realtimemessageapp.database_scheme;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Friend_Relation")
@CompoundIndexes({ //enforcing pair uniqueness
    @CompoundIndex(name="unique_friend_pair", def = "{'userId':1, 'friendId:1'}", unique = true)
})
public class friend_relation {
    
    private ObjectId userId;
    private ObjectId friendId;
    private String friendDisplayName;

    public friend_relation(){}

    public ObjectId getUserId() {
        return userId;
    }

    public ObjectId getFriendId() {
        return friendId;
    }

    public String getFriendDisplayName() {
        return friendDisplayName;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public void setFriendId(ObjectId friendId) {
        this.friendId = friendId;
    }

    public void setFriendDisplayName(String friendDisplayName) {
        this.friendDisplayName = friendDisplayName;
    }
    
}
