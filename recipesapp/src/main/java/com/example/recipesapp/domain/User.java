package com.example.recipesapp.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;*/
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
/*
@Entity
*/
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String firstname;
    private String surname;
    private String phoneNumber;
    private String email;
    private String password;
    private boolean isActive;
    private List<String> role;

/*
    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
*/

    protected User() {
        this.role = new ArrayList<>();
    }

    private VerificationToken verificationToken;

    public User(String firstname, String surname, String phoneNumber, String email, String password, List<String> role, boolean isActive) {
        this.firstname = firstname;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
    }
}
