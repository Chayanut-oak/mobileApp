package com.example.backend.Controller;


import com.example.backend.Pojo.Meal;
import com.example.backend.Service.MealService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@RestController
public class MealController {
    @Autowired
    private MealService mealService;

    @PostMapping(value = "/addMeal")
    public String addMeal(@RequestBody Meal meal) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        meal.setTimestamp(LocalDate.now().format(formatter));
//        Meal newMeal = new Meal();
//        BeanUtils.copyProperties(meal, newMeal);
        mealService.addMeal(meal);
        return meal.toString();
    }
    @CrossOrigin
    @GetMapping(value = "/getAllMealsForShow")
    public List<Meal> getAllMealsForShow(){
        System.out.println(mealService.getAllMealsForShow());
        return mealService.getAllMealsForShow();
    }
    @GetMapping(value = "/getMealById")
    public String getMealById(){
        return "success";
    }
}
