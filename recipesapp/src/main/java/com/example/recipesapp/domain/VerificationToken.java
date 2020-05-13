package com.example.recipesapp.domain;

import org.springframework.data.mongodb.core.mapping.Document;

/*
import javax.persistence.*;
*/
import java.util.Date;
import java.util.Calendar;

@Document(collection = "verificationtokens")
/*
@Entity
*/
public class VerificationToken {
    private static final int EXPIRATION = 60 * 24;

/*
    @Id
*/
    private String id;

    private String token;
/*
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(nullable = false, name = "user_id")*/
    private User user;

    private java.util.Date expiryDate;

    public VerificationToken(final User user, final String token) {
        super();

        this.token = token;
        this.user = user;
        this.expiryDate = calculateExpiryDate(EXPIRATION);
    }

    public VerificationToken() {
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new java.util.Date(cal.getTime().getTime());
    }

    public static int getEXPIRATION() {
        return EXPIRATION;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public java.util.Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
