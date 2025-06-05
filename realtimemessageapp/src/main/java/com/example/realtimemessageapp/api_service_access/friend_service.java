package com.example.realtimemessageapp.api_service_access;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.realtimemessageapp.CRUD.accountHandling;
import com.example.realtimemessageapp.CRUD.friendHandling;
import com.example.realtimemessageapp.CRUD.friendRelationHandling;
import com.example.realtimemessageapp.DTO.friendRequestDTO;
import com.example.realtimemessageapp.database_scheme.friend_info;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/friend")
public class friend_service {

    @Autowired
    private accountHandling accountHander; //this is used to grab the displayname linked with a id
    
    @Autowired
    private friendHandling friendHandler; //this is used for the intital request | handles friend request

    @Autowired
    private friendRelationHandling relationshiphandler; //this is for the actually friend relationship when a request is accepted

    @Autowired
    private cookie_service c_s;

    /**
     * Create a friend request between two users
     * @param friendInfo the id of the friend as a string
     * @param response for cookie which has the user's id
     * @return 400 bad request if a issue arises or 200 ok on success
     */
    @PostMapping("/add_friend")
    public ResponseEntity<String> makeFriendRequest(
        @RequestBody friend_info friendInfo, 
        HttpServletRequest response
    ){
        String id = c_s.getId(response);
        boolean result = addFriend(new ObjectId(id), friendInfo.getFriendId()); //expecting the body to have "Friend_id" 
        if (!result)
            return ResponseEntity.badRequest().body("You may already be friends with them");
        return ResponseEntity.status(200).body("Friend Added");
    }

    /**
     * Retrive all the friend request the user has made that hasn't been accepted or decline yet
     * @param request user's cookie to grab their id
     * @return 404 not found if no user request is found in the DB or 200 ok with the list of request
     */
    @PostMapping("/OutgoingRequest")    
    public ResponseEntity<List<friendRequestDTO>> getOutgoingRequest(HttpServletRequest request){
        String id = c_s.getId(request);
        List<friend_info> query_list = friendHandler.findByUserId(new ObjectId(id));
        
        if (query_list.isEmpty())
            return ResponseEntity.notFound().build();

        List<friendRequestDTO> friendDTO = query_list.stream()
            .map(info -> new friendRequestDTO(info.getFriendId(), accountHander.findById(info.getFriendId()).getDsiplayName()))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(friendDTO);
    }

    /**
     * Retrive all the friend request the user is receving that hasn't been removed yet from teh DB
     * @param request the user cookie for their id
     * @return 404 not found if not request for the user or 200 ok of the list of request
     */
    @PostMapping("/IncomingRequest")
    public ResponseEntity<List<friendRequestDTO>> getIncomingRequest(HttpServletRequest request){
        String id = c_s.getId(request);
        List<friend_info> query_list = friendHandler.findByFriendId(new ObjectId(id));
        
        if (query_list.isEmpty())
            return ResponseEntity.notFound().build();
        
        List<friendRequestDTO> friendDTO = query_list.stream()
            .map(info -> new friendRequestDTO(info.getUserId(), accountHander.findById(info.getUserId()).getDsiplayName()))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(friendDTO);

    }

    /**
     * creates the data to be inserted into the DB
     * @param id_1 the sender of the friend request
     * @param id_2 the receiver of teh friend request
     * @return
     */
    private boolean addFriend(ObjectId id_1, ObjectId id_2){
        boolean exist = friendHandler.existsByUserIdAndFriendId(id_1, id_2);
        if (exist) //do not add this pair
            return false;
        friend_info friendPair1 = new friend_info();
        // friend_info friendPair2 = new friend_info();

        friendPair1.setUserid(id_1);
        // friendPair2.setUserid(id_2);
        friendPair1.setFriendid(id_2);
        // friendPair2.setFriendid(id_1);

        try{
            friendHandler.save(friendPair1);
            // friendHandler.save(friendPair2);
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
        return true; //pair added
    }
    
}
