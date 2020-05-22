package com.example.recipesapp.controller;

import com.example.recipesapp.domain.Recipe;
import com.example.recipesapp.repository.RecipeRepository;
import com.example.recipesapp.services.RecipeService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    RecipeService recipeService;

    @Autowired
    RecipeRepository recipeRepository;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Recipe addRecipe (@RequestBody @Valid Recipe recipe){
        recipe.setId(new ObjectId().toString());
        return recipeRepository.save(recipe);
    }
}
