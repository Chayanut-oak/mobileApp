package com.example.backend.Repostory;

import com.example.backend.Pojo.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends MongoRepository<Meal, String> {
    @Query(value = "{mealName: '?0'}")
    public Meal getMealByName(String name);

    @Query(value = "{}",fields = "{_id: 1, mealImage: 1, mealName: 1, mealCategory: 1, like: 1}")
    public List<Meal> getAllMealsForShow();
    @Query(value = "{_id:'?0'}")
    public Meal getMealById(String id);
}
