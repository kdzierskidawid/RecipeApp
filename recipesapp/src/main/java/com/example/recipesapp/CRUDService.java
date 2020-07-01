package com.example.recipesapp;

import java.util.List;

public interface CRUDService<T extends Object> {

    T addOne(T t);

    T getOne(String id);

    List<T> getAll();

    T updateOne(T t);

    void deleteOne(T t);

    void deleteAll(List<T> t);
}
