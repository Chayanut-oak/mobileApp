package com.example.backend.Service;

import com.example.backend.Pojo.Ingredient;
import com.example.backend.Repostory.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    @Autowired
    private IngredientRepository ingredientRepository;
    public void addIngredient(Ingredient ingredient){
        ingredientRepository.save(ingredient);
    }
    public List<Ingredient> getAllIngredient(){
        return ingredientRepository.findAll();
    }
}
