package com.example.realtimemessageapp.database_scheme;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document("Friend_Info")
@CompoundIndexes({ //enforcing pair uniqueness
    @CompoundIndex(name="unique_friend_pair", def = "{'userId':1, 'friendId:1'}", unique = true)
})
public class friend_info {

    private ObjectId userId;
    @JsonProperty("friend_id")
    private ObjectId friendId;

    public friend_info(){}

    // @ConstructorProperties({"userid, friendid"})
    // public friend_info(ObjectId userid, ObjectId friendid){
    //     this.userId = userid;
    //     this.friendId = friendid;
    // }

    public void setUserid(ObjectId userid) {
        this.userId = userid;
    }

    public void setFriendid(ObjectId friendid) {
        this.friendId = friendid;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public ObjectId getFriendId() {
        return friendId;
    }

}
