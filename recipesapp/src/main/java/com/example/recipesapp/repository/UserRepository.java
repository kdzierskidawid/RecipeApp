package com.example.recipesapp.repository;


import com.example.recipesapp.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);

    @Query("{ 'email' : ?0 }")
    List<User> findUserByEmail(String email);

}
