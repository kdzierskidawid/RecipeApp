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
    private String userId;
    private String photo;
    private List<String> gallery;

    protected Recipe() {
        this.ingredients = new HashMap<>();
        this.gallery = new ArrayList<>();
    }


    public Recipe(String id, String name, String preparationTime, String portion, String description,
                  HashMap<String, String> ingredients, String userId, String category, String photo, List<String> gallery) {
        this.id = id;
        this.name = name;
        this.preparationTime = preparationTime;
        this.portion = portion;
        this.description = description;
        this.category = category;
        this.ingredients = ingredients;
        this.userId = userId;
        this.photo = photo;
        this.gallery = gallery;
    }
}
