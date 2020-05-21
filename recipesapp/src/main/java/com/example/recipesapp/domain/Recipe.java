package com.example.recipesapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Data
/*
@Entity
*/
@Document(collection = "recipes")
public class Recipe {
    @Id
    private String id;

    private String name;
    private String preparationTime;
    private String portion;
    private String description;
    private HashMap<String, String> recipes = new HashMap<String, String>();

    protected Recipe() {
        this.recipes = new HashMap<>();
    }


    public Recipe(String id, String name, String preparationTime, String portion, String description, HashMap<String, String> recipes) {
        this.id = id;
        this.name = name;
        this.preparationTime = preparationTime;
        this.portion = portion;
        this.description = description;
        this.recipes = recipes;
    }


}
