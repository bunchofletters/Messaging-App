package com.example.realtimemessageapp.CRUD;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.user_info;

@Repository
public interface accountHandling extends MongoRepository<user_info, String>{
    user_info findByUsername(@Param("username") String username);
}
