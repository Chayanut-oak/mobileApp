package com.example.backend.Pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@Document("Meal")
public class Meal implements Serializable {
    @Id
    private String _id;
    private String mealId;
    private Object createdBy;
    private String mealImage;
    private String mealName;
    private String mealCategory;
    private Long like;
    private List<Ingredient> tags;
    private List<Object> steps;
    private List<Object> reviews;
    private String timestamp;

    public Meal(){}

    public Meal(String _id, String mealId, String createdBy, String mealImage, String mealName, String mealCategory, Long like, List<Ingredient> tags, List<Object> steps, List<Object> reviews, String timestamp) {
        this._id = _id;
        this.mealId = mealId;
        this.createdBy = createdBy;
        this.mealImage = mealImage;
        this.mealName = mealName;
        this.mealCategory = mealCategory;
        this.like = like;
        this.tags = tags;
        this.steps = steps;
        this.reviews = reviews;
        this.timestamp = timestamp;
    }
}
