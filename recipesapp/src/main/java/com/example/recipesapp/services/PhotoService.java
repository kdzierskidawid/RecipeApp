package com.example.recipesapp.services;

import com.example.recipesapp.CRUDService;
import com.example.recipesapp.domain.Photo;
import com.example.recipesapp.domain.Recipe;
import com.example.recipesapp.repository.PhotoRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PhotoService implements CRUDService<Photo> {

    @Autowired
    PhotoRepository photoRepository;

    public Photo save(Photo photo) throws IOException {
        return photoRepository.save(photo);
    }

    public Photo findOne(String name) {
        return photoRepository.findByName(name);
    }

    public Photo exists(String name) {
        return photoRepository.findByName(name);
    }

    public Photo findOneLarge(String name) {
        return photoRepository.findByLargeImage(name);
    }

    @Override
    public Photo addOne(Photo photo) {
        return photoRepository.save(photo);
    }

    @Override
    public Photo getOne(String id) {
        return photoRepository.findById(id).orElse(null);
    }

    @Override
    public List<Photo> getAll() {
        return photoRepository.findAll();
    }

    @Override
    public Photo updateOne(Photo photo) {
        return photoRepository.save(photo);
    }


    public List<Photo> findAll() {
        return photoRepository.findAll();
    }

    @Override
    public void deleteOne(Photo photo) {
        photoRepository.delete(photo);
    }

    @Override
    public void deleteAll(List<Photo> movementMapList) {

    }
}
