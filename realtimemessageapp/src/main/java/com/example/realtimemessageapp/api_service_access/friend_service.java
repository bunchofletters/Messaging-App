package com.example.realtimemessageapp.api_service_access;

import java.util.List;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.realtimemessageapp.CRUD.accountHandling;
import com.example.realtimemessageapp.CRUD.chatServerHandling;
import com.example.realtimemessageapp.CRUD.friendHandling;
import com.example.realtimemessageapp.CRUD.friendRelationHandling;
import com.example.realtimemessageapp.DTO.friendRequestDTO;
import com.example.realtimemessageapp.database_scheme.friendChatServer;
import com.example.realtimemessageapp.database_scheme.friend_info;
import com.example.realtimemessageapp.database_scheme.friend_relation;
import com.example.realtimemessageapp.database_scheme.user_info;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



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
    private chatServerHandling chatserverhandler; //creating a server id between two people

    @Autowired
    private cookie_service c_s;


    /**
     * Create a friend request between two users
     * @param friendInfo the id of the friend as a string
     * @param response for cookie which has the user's id
     * @return 400 bad request if a issue arises or 200 ok on success
     * calls {@link #addFriend}
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
            .map(info -> new friendRequestDTO(info.getFriendId().toHexString(), accountHander.findById(info.getFriendId()).getDsiplayName()))
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
            .map(info -> new friendRequestDTO(info.getUserId().toHexString(), accountHander.findById(info.getUserId()).getDsiplayName()))
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
        //check if id_1 == id_2 and return if they are
        if (id_1 == id_2) // can't friend yourself : we can have this as a default relationship if we want
            return false;

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

    /**
     * Create a entry in the friend_relation table and delete the request entry in the friend_info table
     * @param friendRelation the friendDTO object that is set by the body of the fetch
     * @param request for user id
     * @return
     */
    @PutMapping("/handle")
    public ResponseEntity<Void> friendRequestHandle(
        @RequestBody friendRequestDTO friendRelation,
        HttpServletRequest request
    ){
        String id = c_s.getId(request); //id of the user
        String compareObj = friendRelation.getFriendId();
        ObjectId smallerId = null;
        ObjectId biggerId = null;
        int compare = id.compareTo(compareObj);
        if (compare < 0) { //user id is smaller
            smallerId = new ObjectId(id);
            biggerId = new ObjectId(friendRelation.getFriendId());
        }
        else if(compare > 0){ //user id is bigger
            biggerId  = new ObjectId(id);
            smallerId = new ObjectId(friendRelation.getFriendId()); 
        }
        else{ //if somehow the two id are the same
            return ResponseEntity.badRequest().build();
        }

        friend_relation fr = new friend_relation(smallerId, biggerId, friendRelation.getdisplayName());

        try{
            relationshiphandler.save(fr);
            friendHandler.deleteByUserIdAndFriendId(smallerId, biggerId);
            friendHandler.deleteByUserIdAndFriendId(biggerId, smallerId);

            friendChatServer fcs = new friendChatServer(smallerId, biggerId);
            chatserverhandler.save(fcs);
        } catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(500).build();
        }

        
        return ResponseEntity.ok().build();
    }

    /**
     * delete the entry in the friend_info table for friend request
     * @implNote untested api endpoint
     * @param request for user id
     * @param friendRelation the friendDTO object that is set by the body of the fetch
     * @return
     */
    @DeleteMapping("/handle")
    public ResponseEntity<Void> friendRequestHandle(
        HttpServletRequest request,
        @RequestBody friendRequestDTO friendRelation
    ){
        ObjectId id = new ObjectId(c_s.getId(request));
        ObjectId friend = new ObjectId(friendRelation.getFriendId());

        try{
            friendHandler.deleteByUserIdAndFriendId(id, friend);
            friendHandler.deleteByUserIdAndFriendId(friend, id);
        } catch(Exception e){
            System.out.println(e);
            return ResponseEntity.status(500).build();
        }

        return ResponseEntity.ok().build();
    }

    /**
     * Get the friend list of a user given their id
     * @param request for cookies to get userid
     * @return either 500 error or 200 ok with the friend list
     */
    @PostMapping("/getFriend")
    public ResponseEntity<List<friendRequestDTO>> getFriends(
        HttpServletRequest request
    ){
        String id = c_s.getId(request); //id of the user
        try{
            List<friend_relation> data = relationshiphandler.findByFriendIdOrUserId(new ObjectId(id), new ObjectId(id));
            List<friendRequestDTO> friendRelation = data.stream()
                .map(info -> {
                    String first = info.getUserId().toString();
                    String second = info.getFriendId().toString();

                    //if the first is the user id we do not need to do a look up. if the second is we do need a look up
                    if (first == id){
                        return new friendRequestDTO(second, info.getFriendDisplayName());
                    }
                    else{
                        user_info friend_info = accountHander.findById(new ObjectId(first));
                        return new friendRequestDTO(first, friend_info.getDsiplayName());
                    }
                }).collect(Collectors.toList());
            
            return ResponseEntity.ok(friendRelation);
        } catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }
    
}
