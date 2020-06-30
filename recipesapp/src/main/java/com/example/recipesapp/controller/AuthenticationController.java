package com.example.recipesapp.controller;

import com.example.recipesapp.config.JwtToken;
import com.example.recipesapp.domain.LoginUser;
import com.example.recipesapp.domain.Token;
import com.example.recipesapp.domain.User;
import com.example.recipesapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/token")
public class AuthenticationController {

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private UserService userService;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @RequestMapping(value = "/generate-token", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody LoginUser loginUser) {
        final User user = userService.findOne(loginUser.getEmail());
        if(user != null){
            if(passwordEncoder.matches(loginUser.getPassword(), user.getPassword())){
                System.out.println("register: " + user);
                final String token = jwtToken.generateToken(user);
                return ResponseEntity.ok(Token.of(token));
            }
            else return null;
        }
        else return null;

    }
}
