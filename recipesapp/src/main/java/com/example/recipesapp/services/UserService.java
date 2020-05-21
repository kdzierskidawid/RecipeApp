package com.example.recipesapp.services;

import com.example.recipesapp.domain.User;
import com.example.recipesapp.domain.VerificationToken;
import com.example.recipesapp.repository.UserRepository;
import com.example.recipesapp.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service(value = "userService")
public class UserService implements UserDetailsService {

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

    public User findOne(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority());
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }



}
