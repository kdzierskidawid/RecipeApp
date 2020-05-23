package com.example.recipesapp.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "photos")
public class Photo {

    @Id
    private String id;

    private String name;
    private Binary mapImage;


    public Photo(String name, Binary mapImage) {
        this.name = name;
        this.mapImage = mapImage;
    }


}
