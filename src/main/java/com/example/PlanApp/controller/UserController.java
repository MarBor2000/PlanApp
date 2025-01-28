package com.example.PlanApp.controller;

import com.example.PlanApp.models.Measurement;
import com.example.PlanApp.models.User;
import com.example.PlanApp.models.WorkoutPlan;
import com.example.PlanApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/{userId}/plans")
    public String addPlan(@PathVariable("userId") String userId, @RequestBody WorkoutPlan plan) {
        plan.setDayNumber(plan.getDayNumber());
        boolean isAdded = userService.addPlanToUser(userId, plan);

        if (isAdded) {
            return "Plan został dodany";
        } else {
            return "Nie udało się dodać planu";
        }
    }


    @GetMapping("/{userId}/plans")
    public List<WorkoutPlan> getUserPlans(@PathVariable String userId) {
        return userService.getUserPlans(userId);
    }

    @PutMapping("/{id}/plans")
    public User updatePlan(@PathVariable String id, @RequestBody WorkoutPlan plan) {
        return userService.updatePlan(id, plan);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }


    @DeleteMapping("/{id}/plans")
    public User deletePlans(@PathVariable String id) {
        return userService.deletePlans(id);
    }

    @PostMapping("/{userId}/measurements")
    public String addMeasurement(@PathVariable String userId, @RequestBody Measurement measurement) {
        boolean isAdded = userService.addMeasurementToUser(userId, measurement);

        if (isAdded) {
            return "Pomiar został dodany";
        } else {
            return "Nie udało się dodać pomiaru";
        }
    }

    @GetMapping("/{userId}/measurements")
    public List<Measurement> getMeasurements(@PathVariable String userId) {
        return userService.getMeasurementsByUserId(userId);
    }


    @DeleteMapping("/{userId}/plans/{goal}")
    public String deletePlanByGoal(@PathVariable String userId, @PathVariable String goal) {
        boolean isDeleted = userService.deletePlanByGoal(userId, goal);

        if (isDeleted) {
            return "Plan o celu '" + goal + "' został usunięty.";
        } else {
            return "Plan o celu '" + goal + "' nie został znaleziony.";
        }
    }

    @PutMapping("/{userId}/plans/{goal}")
    public String updatePlan(
            @PathVariable String userId,
            @PathVariable String goal,
            @RequestBody WorkoutPlan updatedPlan) {
        boolean isUpdated = userService.updateUserPlan(userId, goal, updatedPlan);

        if (isUpdated) {
            return "Plan został zaktualizowany.";
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono planu o celu: " + goal);
        }
    }



}


