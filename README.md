# Training Plan Management Application

## Introduction
This application is designed to manage users' training plans. It allows users to add, view, edit, and delete training plans, as well as store information about users and their measurements.

---

## Application Architecture

### Technologies
- **Backend**: Java 17, Spring Boot (REST API, Spring Data JPA)
- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **Database**: MongoDB
- **Dependency Management**: Maven
- **Styling**: Bootstrap 5

### Main Components
- **Model**: `User`, `WorkoutPlan`, `DayPlan`, `Exercise`, `Measurement`
- **Controller**: Handles HTTP requests
- **Service**: Application logic
- **Repository**: Database operations

---

## API

### User Endpoints
| Method | Endpoint               | Description                        |
|--------|------------------------|------------------------------------|
| GET    | `/users`               | Retrieve all users                |
| GET    | `/users/{userId}`      | Retrieve user details by `userId` |
| POST   | `/users`               | Add a new user                    |
| DELETE | `/users/{userId}`      | Delete user by `userId`           |

### Plan Endpoints
| Method | Endpoint                            | Description                          |
|--------|-------------------------------------|--------------------------------------|
| GET    | `/users/{userId}/plans`             | Retrieve all plans of a user         |
| POST   | `/users/{userId}/plans`             | Add a new plan for a user            |
| PUT    | `/users/{userId}/plans`             | Edit an existing plan for a user     |
| DELETE | `/users/{userId}/plans`             | Delete all plans for a user          |
| DELETE | `/users/{userId}/plans/{goal}`      | Delete a specific plan by goal       |

### Measurement Endpoints
| Method | Endpoint                              | Description                          |
|--------|---------------------------------------|--------------------------------------|
| POST   | `/users/{userId}/measurements`        | Add a measurement for a user         |
| GET    | `/users/{userId}/measurements`        | Retrieve all measurements of a user  |

---

## Getting Started

### Prerequisites
- **Java 17** (installed and configured on your system)
- **Maven** (for dependency management)
- **MongoDB** (a running database server)
- A web browser

