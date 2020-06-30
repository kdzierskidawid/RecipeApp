package com.example.recipesapp.repository;

import com.example.recipesapp.domain.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository  extends MongoRepository<Photo, String> {

    Photo findByName(String name);
    Photo findByLargeImage(String largeImage);
}
