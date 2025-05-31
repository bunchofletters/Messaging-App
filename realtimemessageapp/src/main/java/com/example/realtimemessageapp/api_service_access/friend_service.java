package com.example.realtimemessageapp.api_service_access;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.realtimemessageapp.CRUD.friendHandling;
import com.example.realtimemessageapp.database_scheme.friend_info;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/friend")
public class friend_service {
    
    @Autowired
    private friendHandling friendHandler;

    @Autowired
    private cookie_service c_s;

    @PostMapping("/add_friend")
    public ResponseEntity<String> getMethodName(
        @RequestBody friend_info friendInfo, 
        HttpServletRequest response
    ){
        String id = c_s.getId(response);
        boolean result = addFriend(new ObjectId(id), friendInfo.getFriendId()); //expecting the body to have "Friend_id" 
        if (!result)
            return ResponseEntity.badRequest().body("You may already be friends with them");
        return ResponseEntity.status(200).body("Friend Added");
    }

    private boolean addFriend(ObjectId id_1, ObjectId id_2){
        boolean exist = friendHandler.existsByUserIdAndFriendId(id_1, id_2);
        if (exist) //do not add this pair
            return false;
        friend_info friendPair1 = new friend_info();
        friend_info friendPair2 = new friend_info();

        friendPair1.setUserid(id_1);
        friendPair2.setUserid(id_2);
        friendPair1.setFriendid(id_2);
        friendPair2.setFriendid(id_1);

        try{
            friendHandler.save(friendPair1);
            friendHandler.save(friendPair2);
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
        return true; //pair added
    }
    
}
