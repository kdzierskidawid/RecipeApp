package com.example.recipesapp.controller;


import com.example.recipesapp.domain.User;
import com.example.recipesapp.domain.UserNotification;
import com.example.recipesapp.domain.VerificationToken;
import com.example.recipesapp.repository.UserRepository;
import com.example.recipesapp.services.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JavaMailSender javaMailSender;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public User addStudent (@RequestBody @Valid User user){
        //user.setFirstname("Dawidos");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @GetMapping("/all")
    public List<User> getStudents(){
        return userService.findAll();
    }

    @GetMapping("/getByEmail/{email}")
    public User getStudent(@PathVariable String email){
        return userRepository.findByEmail(email);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/hello", produces = "application/json")
    public ResponseEntity<String> hello() {
        System.out.println("Hit me!");
        return new ResponseEntity<String>("Hello, you!", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable String id) {
        return userService.findById(id)
                .map(student -> ResponseEntity.ok().body(student)).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/update")
    public User updateUser(@RequestBody @Valid User user) {
        return userService.save(user);
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody @Valid User user, HttpServletRequest request) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setId(new ObjectId().toString());
        user.setRole(Arrays.asList("ROLE_USER"));
        sendUserNotificationRabbit(user);
        return userService.save(user);
    }

    private void sendUserNotificationRabbit(User user) {
        String token = UUID.randomUUID().toString();
        userService.createVerificationToken(user,token);
        UserNotification notification = new UserNotification(user.getEmail(), token);
        System.out.println(user.getEmail());
        System.out.println(token);
        registration(notification);
    }

    @RequestMapping(value = "/confirm/registrationConfirm", method = RequestMethod.GET)
    public boolean confirmRegistration(WebRequest request, Model model, @RequestParam("token") String token) {
        VerificationToken verificationToken = userService.getVerificationToken(token);
        if (verificationToken == null) {
            System.out.println("Invalid");
            return false;
        }
        User user = verificationToken.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - calendar.getTime().getTime()) <= 0) {
            System.out.println("Expired");
            return false;
        }
        user.setActive(true);
        userService.save(user);
        return true;
    }


    private void registration(UserNotification userNotification) {
        String recipient = userNotification.getEmail();
        String subject = "Registration Confirmation";
        String message = "Thank you for creating account in our system. Click on the link below to activate your account.";

        SimpleMailMessage email = new SimpleMailMessage();
//        email.setFrom("HMS Account Created");
        email.setTo(recipient);
        email.setSubject(subject);
        email.setText(message + "http://localhost:8089/users/confirm/registrationConfirm?token=" + userNotification.getVerificationToken());
        javaMailSender.send(email);
    }


    @GetMapping("/exists/{email}")
    public boolean userExists(@PathVariable String email) {
        return userService.exists(email);
    }


}
