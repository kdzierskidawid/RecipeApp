package com.example.recipesapp.services;

import com.example.recipesapp.domain.User;
import com.example.recipesapp.domain.VerificationToken;
import com.example.recipesapp.repository.UserRepository;
import com.example.recipesapp.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    VerificationTokenRepository verificationTokenRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    public boolean exists(String email) {
        return !userRepository.findUserByEmail(email).isEmpty();
    }

    public void createVerificationToken(final User user, final String token) {
        final VerificationToken myToken = new VerificationToken(user, token);
        verificationTokenRepository.save(myToken);
    }

    public VerificationToken getVerificationToken(String verificationToken) {
        return verificationTokenRepository.findByToken(verificationToken);
    }


}
