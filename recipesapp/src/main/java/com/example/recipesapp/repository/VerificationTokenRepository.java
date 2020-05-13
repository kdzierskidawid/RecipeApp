package com.example.recipesapp.repository;

import com.example.recipesapp.domain.User;
import com.example.recipesapp.domain.VerificationToken;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface VerificationTokenRepository extends MongoRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);

    VerificationToken findByUser(User appUser);
}
