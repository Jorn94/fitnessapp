document.addEventListener("DOMContentLoaded", function () {
    const workoutList = document.getElementById("workout-list");
    const addItemButton = document.getElementById("add-item");
    const pingSound = document.getElementById("ping-sound");
    const congratsMessage = document.getElementById("congratulations-message");
    const startWorkoutButton = document.getElementById("start-workout");
    const timerDisplay = document.getElementById("timer-display");

    // Timer variables
    let timer;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    // Pre-filled workout items
    const workoutItems = [
        "Pull ups, 4 x 10",
        "Dips, 3 x 4 reps",
        "Cable flyes, 3 x 10",
        "Squats, 3 x 50 --> 15kg",
        "Single leg squats",
        "Lunges, 3 x 10",
        "Hyperextensions, 3 x 15",
        "Pull ups, 3 x 8 ultra clean",
        "Push ups, 4x20",
        "Shoulder raises, 3 x 15",
        "Traps shrugs",
        "Leg raises, 3 x 10",
        "Push ups, 3 x 20",
        "Calfs, 3 x 50",
        "Triceps",
        "Biceps",
        "Face pulls"
    ];

    // Function to reset the app to its initial state
    function resetApp() {
        workoutList.innerHTML = ''; // Clear workout list
        congratsMessage.style.display = "none"; // Hide congratulatory message
        startWorkoutButton.textContent = "Start Workout"; // Reset button text
        timerDisplay.textContent = "00:00:00"; // Reset timer display
        startWorkoutButton.disabled = false; // Enable the button
        seconds = 0;
        minutes = 0;
        hours = 0;

        // Re-render pre-filled workout items
        workoutItems.forEach(item => {
            const newItem = document.createElement("div");
            newItem.innerHTML = `
                <input type="checkbox" class="workout-item"> 
                <input type="text" value="${item}">
                <span class="delete-item">&times;</span>
            `;
            workoutList.appendChild(newItem);

            // Attach event listener to the new delete item cross
            newItem.querySelector(".delete-item").addEventListener("click", function () {
                workoutList.removeChild(newItem);
            });
        });
    }

    // Render pre-filled workout items on initial load
    resetApp();

    // Function to add a new workout item and scroll to bottom
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

        // Scroll to the bottom of the list
        workoutList.scrollTop = workoutList.scrollHeight;
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
        } else if (startWorkoutButton.textContent === "End Workout") {
            clearInterval(timer); // Stop the timer
            congratsMessage.style.display = "block"; // Show congratulatory message in the middle of the screen
            startWorkoutButton.textContent = "Reset"; // Change button text to Reset
        } else if (startWorkoutButton.textContent === "Reset") {
            resetApp(); // Reset the app when "Reset" is clicked
        }
    });
});
