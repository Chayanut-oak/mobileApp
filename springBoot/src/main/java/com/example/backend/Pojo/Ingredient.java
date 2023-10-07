package com.example.backend.Pojo;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("Ingredient")
public class Ingredient  implements Serializable {
    @Id
    private String _id;
    private String ingredientId;
    private String ingredientCategory;
    private String ingredientName;

    public Ingredient(String _id, String ingredientId, String ingredientCategory, String ingredientName) {
        this._id = _id;
        this.ingredientId = ingredientId;
        this.ingredientCategory = ingredientCategory;
        this.ingredientName = ingredientName;
    }
}
