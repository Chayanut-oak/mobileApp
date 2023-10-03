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
    private String userImage;
    private String email;
    private String userFullName;
    private List<Meal> meals;
    private List<Meal> favoriteMeals;
    private List<User> followed;
    private List<User> follower;
}
