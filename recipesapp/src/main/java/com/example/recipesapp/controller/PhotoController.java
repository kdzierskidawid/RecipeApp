package com.example.recipesapp.controller;

import com.example.recipesapp.domain.Photo;
import com.example.recipesapp.domain.Recipe;
import com.example.recipesapp.domain.User;
import com.example.recipesapp.repository.PhotoRepository;
import com.example.recipesapp.services.PhotoService;
import com.example.recipesapp.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/photos")
public class PhotoController {

    @Autowired
    PhotoService photoService;

    @Autowired
    RecipeService recipeService;

    @Autowired
    PhotoRepository photoRepository;

    @GetMapping("/all")
    public List<Photo> getAll() {
        System.out.println("Serwis obrazu");
        return photoService.getAll();
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Photo photo) {
        photoService.deleteOne(photo);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Photo add(@RequestBody @Valid Photo photo) {
        return photoRepository.save(photo);    }

    /*@PostMapping("/upload")
    public Photo upload(@RequestParam("name") String name) throws IOException {
        return photoService.save(name);
    }
*/
    @GetMapping("/{id}")
    public Photo getOne(@PathVariable String id) {
        return photoService.getOne(id);
    }

/*    @GetMapping(value = "/image/{recipeName}")
    public String getImageByUser(@PathVariable String recipeName){
        Recipe recipe = new Recipe(null, null, null, null, null, null, null, null, null, null);
        List<Photo> photos = new ArrayList<>();
        photos = photoService.getAll();
        String photourl = "";
        for(int i=0; i < photos.size(); i++){
            if(photos.get(i).getRecipeId().equals(recipeName)){
                recipe = recipeService.findOne(recipeName);
                photourl = photos.get(i).getPhoto();
            }
        }
        return photourl;
    }*/

    @GetMapping("/image/{recipeName}")
    public Photo getImageByUser(@PathVariable String recipeName) {
        return photoService.findOne(recipeName);
    }

    @GetMapping("/largeimage/{recipeName}")
    public Photo getLargeImageByUser(@PathVariable String recipeName) {
        return photoService.findOneLarge(recipeName);
    }

    @GetMapping("/exists/{name}")
    public Photo photoExists(@PathVariable String name) {
        return photoService.exists(name);
    }
   /* @GetMapping("/all")
    public List<Photo> getPhotos(){
        return photoService.findAll();
    }

*/
}
