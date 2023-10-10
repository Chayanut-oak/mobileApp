package com.example.backend.Pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@Document("User")
public class User implements Serializable {
    @Id
    private String _id;
    private String userId;
    private String firstName;
    private String lastName;
    private String displayName;
    private String userImage;
    private String email;
    private List<String> favoriteMeals;
    private List<String> followed;
    private List<String> follower;

    public User(String _id, String userId, String firstName, String lastName, String displayName, String userImage, String email, List<String> favoriteMeals, List<String> followed, List<String> follower) {
        this._id = _id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
        this.userImage = userImage;
        this.email = email;
        this.favoriteMeals = favoriteMeals;
        this.followed = followed;
        this.follower = follower;
    }
}
