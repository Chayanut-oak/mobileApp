package com.example.backend.Service;

import com.example.backend.Pojo.Meal;
import com.example.backend.Repostory.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MealService {
    @Autowired
    private MealRepository mealRepository;

    public List<Meal> getAllMeal() {
        return mealRepository.findAll();
    }

    //    public Meal getMealByName(String name){
//        return mealRepository.getMealByName(name);
//    }
    public Meal addMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    public List<Meal> getAllMealsForShow() {
        return mealRepository.getAllMealsForShow();
    }

    public Meal getMealById(String id) {
        return mealRepository.getMealById(id);
    }

    public Meal findMealsWithIngredients(String id) {
        System.out.println("From service");
        return mealRepository.findMealsWithIngredients(id);
    }
}
