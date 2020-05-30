package com.example.recipesapp.controller;

import com.example.recipesapp.domain.Recipe;
import com.example.recipesapp.repository.RecipeRepository;
import com.example.recipesapp.services.RecipeService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
        //recipe.setId(new ObjectId().toString());
        return recipeRepository.save(recipe);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getUserByID(@PathVariable String id) {
        return recipeService.findById(id)
                .map(recipe -> ResponseEntity.ok().body(recipe)).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public List<Recipe> listRecipes() {
        return recipeService.findAll();
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Recipe recipe) {
        recipeService.deleteOne(recipe);
    }

}
