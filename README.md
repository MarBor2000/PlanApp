Polish Version

1. Wstęp
Aplikacja służy do zarządzania planami treningowymi użytkowników. Umożliwia dodawanie, przeglądanie, edytowanie oraz usuwanie planów treningowych, a także przechowywanie informacji o użytkownikach i ich pomiarach.

2. Architektura aplikacji
2.1 Technologie
Backend: Java 17, Spring Boot (REST API, Spring Data JPA).
Frontend: HTML5, CSS3, JavaScript (ES6).
Baza danych: MongoDB.
Zarządzanie zależnościami: Maven.

2.2 Główne komponenty
Model: User, WorkoutPlan, DayPlan, Exercise, Measurement.
Controller: Odpowiedzialny za obsługę żądań HTTP.
Service: Logika aplikacji.
Repository: Obsługa bazy danych.

2.3 Interakcja komponentów
Użytkownik wysyła żądanie (np. GET, POST, PUT, DELETE) z frontendu do API.
API obsługuje żądanie i komunikuje się z warstwą usługową.
Warstwa usługowa wykonuje logikę biznesową, przekazuje dane do repozytorium i zwraca odpowiedź.

3. API
3.1 Endpoints użytkownika
Metoda	Endpoint	            Opis
GET	    /users	              Pobierz listę wszystkich użytkowników.
GET	    /users/{userId}	      Pobierz dane użytkownika o podanym userId.
POST	  /users	              Dodaj nowego użytkownika.
DELETE	/users/{userId}	      Usuń użytkownika o podanym userId.
3.2 Endpoints planów
Metoda	Endpoint	                    Opis
GET	    /users/{userId}/plans	        Pobierz plany użytkownika.
POST	/users/{userId}/plans	          Dodaj nowy plan dla użytkownika.
PUT	/users/{userId}/plans	            Edytuj istniejący plan użytkownika.
DELETE	/users/{userId}/plans	        Usuń wszystkie plany użytkownika.
DELETE	/users/{userId}/plans/{goal}	Usuń pojedynczy plan użytkownika na podstawie celu.
3.3 Endpoints pomiarów
Metoda	Endpoint	                      Opis
POST	  /users/{userId}/measurements	  Dodaj pomiar użytkownika.
GET	    /users/{userId}/measurements	  Pobierz wszystkie pomiary użytkownika.

4
Java 17 (zainstalowana i skonfigurowana w systemie).
Maven (do zarządzania zależnościami).
MongoDB (uruchomiony serwer bazy danych).
Przeglądarka internetowa.

Englsih  Version

1 Introduction
This application is used to manage users' training plans. It allows adding, viewing, editing and deleting training plans, as well as storing information about users and their measurements.

2 Application architecture
2.1 Technologies
Backend: Java 17, Spring Boot (REST API, Spring Data JPA).
Frontend: HTML5, CSS3, JavaScript (ES6).
Database: MongoDB.
Dependency management: Maven.

2.2 Main components
Model: User, WorkoutPlan, DayPlan, Exercise, Measurement.
Controller: Responsible for handling HTTP requests.
Service: Application logic.
Repository: Handling the database.

2.3 Component interaction
A user sends a request (e.g. GET, POST, PUT, DELETE) from the frontend to the API.
The API handles the request and communicates with the service layer.
The service layer executes the business logic, passes the data to the repository and returns the response.

3 API.
3.1 User endpoints
Endpoint    Method               Description
GET         /users               Get a list of all users.
GET         /users/{userId}      Get the data of the user with the specified userId.
POST        /users               Add a new user.
DELETE      /users/{userId}      Delete the user with the specified userId.
3.2 Endpoints plans
Endpoint    method                        Description
GET         /users/{userId}/plans         Get the user's plans.
POST        /users/{userId}/plans         Add a new plan for the user.
PUT         /users/{userId}/plans         Edit an existing plan for a user.
DELETE      /users/{userId}/plans         Delete all user plans.
DELETE      /users/{userId}/plans/{goal}  Delete a single user plan based on the target.

3.3 Measurement Endpoints
Endpoint   method                          Description
POST       /users/{userId}/measurements    Add a user measurement.
GET        /users/{userId}/measurements    Get all user measurements.

4
Java 17 (installed and configured on the system).
Maven (to manage dependencies).
MongoDB (running database server).
Web browser.

Translated with DeepL.com (free version)



