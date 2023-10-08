package com.example.backend.Repostory;

import com.example.backend.Pojo.Meal;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends MongoRepository<Meal, String> {
    @Query(value = "{mealName: '?0'}")
    Meal getMealByName(String name);
    @Aggregation(pipeline = {
            "{'$match': { mealId : '?0' }}",
            "{'$lookup': { 'from' : 'Ingredient', 'localField' : 'tags', 'foreignField': 'ingredientId', 'as' : 'tags' } }",
    })
    Meal findMealsWithIngredients(String id);


    @Query(value = "{}",fields = "{_id: 1, mealImage: 1, mealName: 1, mealCategory: 1, like: 1}")
    List<Meal> getAllMealsForShow();
    @Query(value = "{mealId:'?0'}")
    Meal getMealById(String id);
}
