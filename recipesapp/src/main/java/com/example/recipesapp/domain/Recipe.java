package com.example.recipesapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private String category;
    private HashMap<String, String> ingredients;
    private User userId;
    private Photo photo;

    protected Recipe() {
        this.ingredients = new HashMap<>();
    }


    public Recipe(String id, String name, String preparationTime, String portion, String description,
                  HashMap<String, String> ingredients, User userId, String category, Photo photo) {
        this.id = id;
        this.name = name;
        this.preparationTime = preparationTime;
        this.portion = portion;
        this.description = description;
        this.category = category;
        this.ingredients = ingredients;
        this.userId = userId;
        this.photo = photo;
    }
}
