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

    private String photo;
    private String name;
    private String largeImage;


    public Photo(String name, String photo, String largeImage) {
        this.photo = photo;
        this.name = name;
        this.largeImage = largeImage;
    }


}
