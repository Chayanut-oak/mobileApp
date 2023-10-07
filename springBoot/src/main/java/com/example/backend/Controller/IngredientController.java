package com.example.backend.Controller;

import com.example.backend.Pojo.Ingredient;
import com.example.backend.Service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IngredientController {
    @Autowired
    private IngredientService ingredientService;

    @PostMapping(value = "/addIngredient")
    public void addIngredient(@RequestBody Ingredient ingredient){
        ingredientService.addIngredient(ingredient);
    }
}
