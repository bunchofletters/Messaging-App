package com.example.realtimemessageapp.CRUD;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.realtimemessageapp.database_scheme.user_info;

@Repository
public interface accountHandling extends MongoRepository<user_info, String>{   
    List<user_info> findByUsername(String username);
}
