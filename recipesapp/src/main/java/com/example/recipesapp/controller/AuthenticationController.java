package com.example.recipesapp.controller;

import com.example.recipesapp.config.JwtToken;
import com.example.recipesapp.domain.LoginUser;
import com.example.recipesapp.domain.Token;
import com.example.recipesapp.domain.User;
import com.example.recipesapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/token")
public class AuthenticationController {

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/generate-token", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody LoginUser loginUser) {
        final User user = userService.findOne(loginUser.getEmail());
        System.out.println("register: " + user);
        final String token = jwtToken.generateToken(user);
        return ResponseEntity.ok(Token.of(token));
    }
}
