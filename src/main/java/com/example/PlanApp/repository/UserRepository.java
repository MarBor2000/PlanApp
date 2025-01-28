package com.example.PlanApp.repository;

import com.example.PlanApp.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
