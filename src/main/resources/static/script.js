function showMessage(message) {
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = message;
  messageDiv.style.display = 'block';
}

async function addUser(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  const user = { firstName, lastName };

  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      showMessage('Użytkownik został dodany!');
      loadUsers();
    } else {
      showMessage('Wystąpił błąd podczas dodawania użytkownika.');
    }
  } catch (error) {
    showMessage('Wystąpił błąd. Spróbuj ponownie.');
  }
}

function addDayPlan() {
    const dayPlansContainer = document.getElementById('dayPlansContainer');

    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day-plan');
    dayDiv.innerHTML = `
        <h3>Dzień Treningowy</h3>
        <label for="dayNumber">Numer Dnia:</label>
        <input type="number" class="dayNumber" required>
        <div class="exercisesContainer">
            <!-- Ćwiczenia dla tego dnia -->
        </div>
        <button type="button" onclick="addExercise(this)">Dodaj Ćwiczenie</button>
    `;
    dayPlansContainer.appendChild(dayDiv);
}

function addExercise(button) {
    const dayPlanDiv = button.closest('.day-plan');
    if (!dayPlanDiv) {
        console.error("Nie znaleziono sekcji dnia treningowego.");
        return;
    }

    const exercisesContainer = dayPlanDiv.querySelector('.exercisesContainer');
    if (!exercisesContainer) {
        console.error("Nie znaleziono kontenera ćwiczeń w sekcji dnia treningowego.");
        return;
    }

    const exerciseDiv = document.createElement('div');
    exerciseDiv.classList.add('exercise');
    exerciseDiv.innerHTML = `
        <input type="text" class="exerciseName" placeholder="Nazwa ćwiczenia" required>
        <input type="number" class="sets" placeholder="Serie" required>
        <input type="number" class="reps" placeholder="Powtórzenia" required>
        <input type="text" class="tempo" placeholder="Tempo" required>
        <input type="text" class="weight" placeholder="Waga" required>
        <input type="text" class="rest" placeholder="Odpoczynek" required>
        <button type="button" onclick="removeExercise(this)">Usuń Ćwiczenie</button>
    `;
    exercisesContainer.appendChild(exerciseDiv);
}

async function addPlan(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const goal = document.getElementById('goal').value;
    const daysPerWeek = document.getElementById('daysPerWeek').value;

    const dayPlans = [];
    const dayElements = document.querySelectorAll('.day-plan');
    dayElements.forEach(dayElement => {
        const dayNumber = parseInt(dayElement.querySelector('.dayNumber').value);
        const exercises = [];

        const exerciseElements = dayElement.querySelectorAll('.exercise');
        exerciseElements.forEach(exerciseElement => {
            const exercise = {
                name: exerciseElement.querySelector('.exerciseName').value,
                sets: parseInt(exerciseElement.querySelector('.sets').value),
                reps: parseInt(exerciseElement.querySelector('.reps').value),
                tempo: exerciseElement.querySelector('.tempo').value,
                weight: exerciseElement.querySelector('.weight').value,
                rest: exerciseElement.querySelector('.rest').value,
            };
            exercises.push(exercise);
        });

        dayPlans.push({
            dayNumber: dayNumber,
            exercises: exercises
        });
    });

    const plan = {
        goal,
        daysPerWeek: parseInt(daysPerWeek),
        dayPlans: dayPlans
    };

    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/plans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plan)
        });

        if (response.ok) {
            const message = await response.text();
            alert(message);
        } else {
            alert('Wystąpił błąd podczas dodawania planu.');
        }
    } catch (error) {
        alert('Wystąpił błąd. Spróbuj ponownie.');
    }
}


document.getElementById('planForm').addEventListener('submit', addPlan);

async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      showMessage('Użytkownik został usunięty!');
      loadUsers();
    } else {
      showMessage('Wystąpił błąd podczas usuwania użytkownika.');
    }
  } catch (error) {
    showMessage('Wystąpił błąd. Spróbuj ponownie.');
  }
}

async function loadUsers() {
  const usersList = document.getElementById('users');
  usersList.innerHTML = '';

  try {
    const response = await fetch('http://localhost:8080/users');
    const users = await response.json();

    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.firstName} ${user.lastName}`;

      const showPlansButton = document.createElement('button');
      showPlansButton.textContent = 'Pokaż plany';
      showPlansButton.onclick = () => showUserPlans(user.id);

      const addMeasurementButton = document.createElement('button');
      addMeasurementButton.textContent = 'Dodaj Pomiar';
      addMeasurementButton.onclick = () => showAddMeasurementModal(user.id);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Usuń';
      deleteButton.onclick = () => deleteUser(user.id);

      const showMeasurementsButton = document.createElement('button');
      showMeasurementsButton.textContent = 'Pokaż pomiary';
      showMeasurementsButton.onclick = () => showUserMeasurements(user.id);

      li.appendChild(showPlansButton);
      li.appendChild(addMeasurementButton);
      li.appendChild(showMeasurementsButton);
      li.appendChild(deleteButton);

      usersList.appendChild(li);
    });
  } catch (error) {
    showMessage('Wystąpił błąd. Spróbuj ponownie.');
  }
}



async function showUsers() {
    try {
        const response = await fetch('http://localhost:8080/users');
        if (response.ok) {
            const users = await response.json();
            const usersContainer = document.getElementById('usersContainer');
            usersContainer.innerHTML = '';

            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user');
                userDiv.innerHTML = `
                    <h3>${user.name}</h3>
                    <p>ID: ${user.id}</p>
                    <button type="button" onclick="showAddMeasurementModal('${user.id}')">Dodaj Pomiar</button>
                `;
                usersContainer.appendChild(userDiv);
            });
        } else {
            alert('Nie udało się pobrać listy użytkowników.');
        }
    } catch (error) {
        alert('Wystąpił błąd podczas pobierania listy użytkowników.');
    }
}


async function showUserPlans(userId) {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/plans`);
        const plansContainer = document.getElementById('plansContainer');
        plansContainer.innerHTML = '';

        if (!response.ok) {
            showMessage('Nie udało się pobrać planów użytkownika.');
            console.error('Błąd odpowiedzi:', response.status);
            return;
        }

        const plans = await response.json();
        console.log('Otrzymane plany:', plans);

        if (!Array.isArray(plans) || plans.length === 0) {
            plansContainer.innerHTML = '<p>Brak dostępnych planów.</p>';
            return;
        }

        plans.forEach(plan => {
            console.log('Przetwarzany plan:', plan);

            const planDiv = document.createElement('div');
            planDiv.classList.add('plan');
            planDiv.innerHTML = `
                <h3>Cel: ${plan.goal}</h3>
                <p><strong>Dni w tygodniu:</strong> ${plan.daysPerWeek}</p>
            `;

            const editPlanButton = document.createElement('button');
            editPlanButton.textContent = 'Edytuj plan';
            editPlanButton.onclick = () => {
                openEditModal(userId, plan);
            };

            const deletePlanButton = document.createElement('button');
            deletePlanButton.textContent = 'Usuń plan';
            deletePlanButton.onclick = async () => {
                const confirmDelete = confirm(`Czy na pewno chcesz usunąć plan: ${plan.goal}?`);
                if (confirmDelete) {
                    await deletePlan(userId, plan.goal);
                }
            };

            planDiv.appendChild(editPlanButton);
            planDiv.appendChild(deletePlanButton);

            const dayPlansContainer = document.createElement('div');
            dayPlansContainer.classList.add('dayPlans');

            if (Array.isArray(plan.dayPlans) && plan.dayPlans.length > 0) {
                plan.dayPlans.forEach(dayPlan => {
                    const dayDiv = document.createElement('div');
                    dayDiv.classList.add('dayPlan');
                    dayDiv.innerHTML = `
                        <h4>Dzień: ${dayPlan.dayNumber}</h4>
                        <ul>
                            ${Array.isArray(dayPlan.exercises) && dayPlan.exercises.length > 0
                                ? dayPlan.exercises.map(exercise => `
                                    <li>
                                        <p><strong>Nazwa:</strong> ${exercise.name}</p>
                                        <p><strong>Serie:</strong> ${exercise.sets}</p>
                                        <p><strong>Powtórzenia:</strong> ${exercise.reps}</p>
                                        <p><strong>Tempo:</strong> ${exercise.tempo}</p>
                                        <p><strong>Waga:</strong> ${exercise.weight}</p>
                                        <p><strong>Odpoczynek:</strong> ${exercise.rest}</p>
                                    </li>
                                `).join('')
                                : '<li>Brak ćwiczeń w tym dniu</li>'
                            }
                        </ul>
                    `;
                    dayPlansContainer.appendChild(dayDiv);
                });
            } else {
                dayPlansContainer.innerHTML = '<p>Brak planów na poszczególne dni.</p>';
            }

            planDiv.appendChild(dayPlansContainer);
            plansContainer.appendChild(planDiv);
        });
    } catch (error) {
        console.error('Błąd podczas pobierania planów użytkownika:', error);
        showMessage('Wystąpił błąd podczas pobierania planów użytkownika.');
    }
}


let selectedUserId = null;

function showMeasurementForm(userId) {
    selectedUserId = userId;
    document.getElementById("measurementForm").style.display = "block";
}

function closeMeasurementForm() {
    document.getElementById("measurementForm").style.display = "none";
}

function showAddMeasurementModal(userId) {
    const modal = document.getElementById('measurementModal');
    const modalUserId = document.getElementById('modalUserId');
    modalUserId.value = userId;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('measurementModal');
    const form = document.getElementById('measurementForm');
    form.reset();
    modal.style.display = 'none';
}

async function addMeasurement(event) {
    event.preventDefault();

    const userId = document.getElementById('modalUserId').value;
    const date = document.getElementById('date').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const chestCircumference = parseFloat(document.getElementById('chestCircumference').value);
    const waistCircumference = parseFloat(document.getElementById('waistCircumference').value);

    const measurement = {
        date,
        weight,
        height,
        chestCircumference,
        waistCircumference
    };

    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/measurements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(measurement)
        });

        if (response.ok) {
            alert('Pomiar został dodany.');
            closeModal();
        } else {
            alert('Nie udało się dodać pomiaru.');
        }
    } catch (error) {
        alert('Wystąpił błąd. Spróbuj ponownie.');
    }
}

async function showUserMeasurements(userId) {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/measurements`);
        const measurementsContainer = document.getElementById("measurementsContainer");
        const measurementsList = document.getElementById("measurementsList");

        measurementsContainer.style.display = 'block';
        measurementsList.innerHTML = '';

        if (response.ok) {
            const measurements = await response.json();

            if (measurements.length === 0) {
                measurementsList.innerHTML = "<p>Brak pomiarów do wyświetlenia.</p>";
                return;
            }

            measurements.forEach(measurement => {
                const measurementDiv = document.createElement("div");
                measurementDiv.classList.add("measurement");
                measurementDiv.innerHTML = `
                    <p><strong>Data:</strong> ${measurement.date}</p>
                    <p><strong>Waga:</strong> ${measurement.weight} kg</p>
                    <p><strong>Wzrost:</strong> ${measurement.height} cm</p>
                    <p><strong>Obwód Klatki Piersiowej:</strong> ${measurement.chestCircumference} cm</p>
                    <p><strong>Obwód Talii:</strong> ${measurement.waistCircumference} cm</p>
                `;
                measurementsList.appendChild(measurementDiv);
            });
        } else {
            alert("Nie udało się pobrać pomiarów użytkownika.");
        }
    } catch (error) {
        alert("Wystąpił błąd podczas pobierania pomiarów użytkownika.");
    }
}

async function deletePlan(userId, goal) {
    try {
        const encodedGoal = encodeURIComponent(goal);
        const response = await fetch(`http://localhost:8080/users/${userId}/plans/${encodedGoal}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            showMessage(`Plan o celu "${goal}" został usunięty.`);
            showUserPlans(userId);
        } else {
            const errorText = await response.text();
            showMessage(`Nie udało się usunąć planu o celu "${goal}". Odpowiedź: ${errorText}`);
        }
    } catch (error) {
        console.error(error);
        showMessage('Wystąpił błąd podczas usuwania planu.');
    }
}

function openEditModal(userId, plan) {
    const updatedDayPlans = plan.dayPlans.map(dayPlan => {
        const newExercises = dayPlan.exercises.map(exercise => {
            const newName = prompt(`Edytuj nazwę ćwiczenia (${exercise.name}):`, exercise.name);
            const newSets = prompt(`Edytuj liczbę serii (${exercise.sets}):`, exercise.sets);
            const newReps = prompt(`Edytuj liczbę powtórzeń (${exercise.reps}):`, exercise.reps);
            const newTempo = prompt(`Edytuj tempo (${exercise.tempo}):`, exercise.tempo);
            const newWeight = prompt(`Edytuj wagę (${exercise.weight}):`, exercise.weight);
            const newRest = prompt(`Edytuj czas odpoczynku (${exercise.rest}):`, exercise.rest);

            return {
                ...exercise,
                name: newName || exercise.name,
                sets: parseInt(newSets, 10) || exercise.sets,
                reps: parseInt(newReps, 10) || exercise.reps,
                tempo: newTempo || exercise.tempo,
                weight: newWeight || exercise.weight,
                rest: newRest || exercise.rest,
            };
        });

        return {
            ...dayPlan,
            exercises: newExercises,
        };
    });

    const updatedPlan = {
        ...plan,
        dayPlans: updatedDayPlans,
    };

    updatePlan(userId, plan.goal, updatedPlan);
}

async function updatePlan(userId, goal, updatedPlan) {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/plans/${goal}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPlan),
        });

        if (response.ok) {
            showMessage('Plan został zaktualizowany.');
            showUserPlans(userId);
        } else {
            const errorText = await response.text();
            showMessage(`Nie udało się zaktualizować planu. Odpowiedź: ${errorText}`);
        }
    } catch (error) {
        console.error('Błąd podczas aktualizacji planu:', error);
        showMessage('Wystąpił błąd podczas aktualizacji planu.');
    }
}

document.getElementById('userForm').addEventListener('submit', addUser);
document.getElementById('planForm').addEventListener('submit', addPlan);

loadUsers();
