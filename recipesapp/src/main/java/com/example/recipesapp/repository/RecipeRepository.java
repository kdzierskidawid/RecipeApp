package com.example.recipesapp.repository;

import com.example.recipesapp.domain.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {

    Recipe findByName(String name);

    @Query("{ 'name' : ?0 }")
    List<Recipe> findRecipeByName(String name);
}
