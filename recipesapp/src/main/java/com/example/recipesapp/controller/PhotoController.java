package com.example.recipesapp.controller;

import com.example.recipesapp.domain.Photo;
import com.example.recipesapp.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/photos")
public class PhotoController {

    @Autowired
    PhotoService photoService;

    @GetMapping("/all")
    public List<Photo> getAll() {
        return photoService.getAll();
    }

    @PostMapping("/add")
    public Photo add(@RequestBody @Valid Photo photo) {
        return photoService.addOne(photo);
    }

    @PostMapping("/upload")
    public Photo upload(@RequestParam("name") String name, @RequestParam("mapImage") MultipartFile mapImage) throws IOException {
        return photoService.addPhoto(name, mapImage);
    }

    @GetMapping("/{id}")
    public Photo getOne(@PathVariable String id) {
        return photoService.getOne(id);
    }

    @GetMapping(value = "/jpg/{id}")
    public @ResponseBody
    String getImage(@PathVariable String id, HttpServletResponse response) throws IOException {
        Photo photo = photoService.getOne(id);
        response.addHeader("map-name", photo.getName());
        return Base64.getEncoder().encodeToString((photo.getMapImage().getData()));
    }


}
