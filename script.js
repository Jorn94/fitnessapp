document.addEventListener("DOMContentLoaded", function () {
    const workoutList = document.getElementById("workout-list");
    const addItemButton = document.getElementById("add-item");
    const finishButton = document.getElementById("finish-workout");
    const pingSound = document.getElementById("ping-sound");

    // Timer variables
    let timer;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    const timerDisplay = document.getElementById("timer-display");
    const startWorkoutButton = document.getElementById("start-workout");

    // Function to add a new workout item
    addItemButton.addEventListener("click", function () {
        const newItem = document.createElement("div");
        newItem.innerHTML = `
            <input type="checkbox" class="workout-item"> 
            <input type="text" placeholder="Workout Item">
            <span class="delete-item">&times;</span>
        `;
        workoutList.appendChild(newItem);

        // Attach event listener to the new delete item cross
        newItem.querySelector(".delete-item").addEventListener("click", function () {
            workoutList.removeChild(newItem);
        });
    });

    // Function to play ping sound on checkbox check
    workoutList.addEventListener("change", function (e) {
        if (e.target && e.target.matches(".workout-item")) {
            pingSound.play();
        }
    });

    // Timer function
    function updateTimer() {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        // Display the time in HH:MM:SS format
        timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Start/End Workout button toggle and timer control
    startWorkoutButton.addEventListener("click", function () {
        if (startWorkoutButton.textContent === "Start Workout") {
            timer = setInterval(updateTimer, 1000); // Start the timer
            startWorkoutButton.textContent = "End Workout";
        } else {
            clearInterval(timer); // Stop the timer
            alert("Congratulations! You finished your workout.");
            finishButton.style.display = "block"; // Show the finish button
            startWorkoutButton.textContent = "Start Workout";
            timerDisplay.textContent = "00:00:00"; // Reset timer display
            seconds = 0;
            minutes = 0;
            hours = 0;
        }
    });

    // Function for finishing the workout
    finishButton.addEventListener("click", function () {
        alert("Great job! You finished your workout.");
    });
});
