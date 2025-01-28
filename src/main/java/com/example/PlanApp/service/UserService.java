package com.example.PlanApp.service;


import com.example.PlanApp.models.Measurement;
import com.example.PlanApp.models.User;
import com.example.PlanApp.models.WorkoutPlan;
import com.example.PlanApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean addPlanToUser(String userId, WorkoutPlan plan) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPlans() == null) {
                user.setPlans(new ArrayList<>());
            }

            plan.setDayNumber(plan.getDayNumber());

            user.getPlans().add(plan);
            userRepository.save(user);
            return true;
        }

        return false;
    }


    public List<WorkoutPlan> getUserPlans(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getPlans() != null ? user.getPlans() : new ArrayList<>();
        } else {
            throw new RuntimeException("Użytkownik o ID " + userId + " nie został znaleziony.");
        }
    }


    public User updatePlan(String userId, WorkoutPlan newPlan) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.getPlans().add(newPlan);
        return userRepository.save(user);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public User deletePlans(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPlans(null);
        return userRepository.save(user);
    }


    public boolean addMeasurementToUser(String userId, Measurement measurement) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getMeasurements() == null) {
                user.setMeasurements(new ArrayList<>());
            }

            user.getMeasurements().add(measurement);
            userRepository.save(user);
            return true;
        }

        return false;
    }

    public List<Measurement> getMeasurementsByUserId(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getMeasurements() != null ? user.getMeasurements() : new ArrayList<>();
        } else {
            throw new RuntimeException("Użytkownik o ID " + userId + " nie został znaleziony.");
        }
    }

    public boolean deletePlanByGoal(String userId, String goal) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPlans() != null) {
                List<WorkoutPlan> plans = user.getPlans();
                boolean removed = plans.removeIf(plan -> plan.getGoal().equals(goal));

                if (removed) {
                    userRepository.save(user);
                    return true;
                }
            }
        }
        return false;
    }

    public boolean updateUserPlan(String userId, String goal, WorkoutPlan updatedPlan) {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<WorkoutPlan> plans = user.getPlans();

            for (WorkoutPlan plan : plans) {
                if (plan.getGoal().equals(goal)) {
                    plan.setDaysPerWeek(updatedPlan.getDaysPerWeek());
                    plan.setDayPlans(updatedPlan.getDayPlans());
                    userRepository.save(user);
                    return true;
                }
            }
        }
        return false;
    }





}
