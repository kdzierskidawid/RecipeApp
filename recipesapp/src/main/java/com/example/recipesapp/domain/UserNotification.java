package com.example.recipesapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class UserNotification implements Serializable {
    private String email;
    private String verificationToken;
}
