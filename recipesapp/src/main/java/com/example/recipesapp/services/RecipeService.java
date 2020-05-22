package com.example.recipesapp.services;

import com.example.recipesapp.domain.Recipe;
import com.example.recipesapp.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service(value = "recipeService")
public class RecipeService {

    @Autowired
    RecipeRepository recipeRepository;

    public Recipe save(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe findOne(String name) {
        return recipeRepository.findByName(name);
    }

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(String id) {
        return recipeRepository.findById(id);
    }


}
