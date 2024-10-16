document.addEventListener("DOMContentLoaded", function () {
    const workoutList = document.getElementById("workout-list");
    const addItemButton = document.getElementById("add-item");
    const pingSound = document.getElementById("ping-sound");
    const congratsMessage = document.getElementById("congratulations-message");
    const startWorkoutButton = document.getElementById("start-workout");
    const timerDisplay = document.getElementById("timer-display");
    const workoutScreen = document.getElementById("workout-screen");
    const startScreen = document.getElementById("start-screen");
    const createNewListButton = document.getElementById("create-new-list");
    const goHomeButton = document.getElementById("go-home");
    const saveListButton = document.getElementById("save-list");
    const workoutListsDiv = document.getElementById("workout-lists");
    const errorMessage = document.getElementById("error-message");

    // Timer variables
    let timer;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let activeWorkoutList = null;

    // Function to load all workout lists from localStorage
    function loadWorkoutLists() {
        const savedLists = localStorage.getItem('workoutLists');
        if (!savedLists) {
            // If no lists are saved, initialize with "Savage Viking Workout"
            return { "Savage Viking Workout": getDefaultWorkoutList() };
        }
        return JSON.parse(savedLists);
    }

    // Function to save workout lists to localStorage
    function saveWorkoutLists(lists) {
        localStorage.setItem('workoutLists', JSON.stringify(lists));
    }

    // Function to get the default workout list
    function getDefaultWorkoutList() {
        return [
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
    }

    // Function to load a specific workout list
    function loadWorkoutList(listName) {
        const lists = loadWorkoutLists();
        return lists[listName] || [];
    }

    // Function to save a specific workout list
    function saveWorkoutList(listName, items) {
        const lists = loadWorkoutLists();
        lists[listName] = items;
        saveWorkoutLists(lists);
        renderWorkoutLists(); // Ensure the list appears on the home screen
    }

    // Function to render all workout lists on the start screen as clickable text
    function renderWorkoutLists() {
        const lists = loadWorkoutLists();
        workoutListsDiv.innerHTML = ''; // Clear existing items

        // Render each list as clickable text
        for (let listName in lists) {
            const listLink = document.createElement("a");
            listLink.textContent = listName;
            listLink.className = "workout-link";
            listLink.href = "#";
            listLink.addEventListener("click", function () {
                activeWorkoutList = listName;
                renderWorkoutList(loadWorkoutList(listName));
                showWorkoutScreen();
            });
            workoutListsDiv.appendChild(listLink);
        }
    }

    // Function to render the workout list
    function renderWorkoutList(items) {
        workoutList.innerHTML = ''; // Clear existing items
        items.forEach(item => {
            const newItem = document.createElement("div");
            newItem.innerHTML = `
                <input type="checkbox" class="workout-item"> 
                <input type="text" value="${item}">
                <span class="delete-item">&times;</span>
            `;
            workoutList.appendChild(newItem);

            // Handle deleting the workout item
            newItem.querySelector(".delete-item").addEventListener("click", function () {
                workoutList.removeChild(newItem);
                saveWorkoutList(activeWorkoutList, getCurrentWorkoutItems());
            });

            // Allow adding a new item by pressing Enter
            newItem.querySelector("input[type='text']").addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    addNewItemAndFocus();
                }
            });
        });
    }

    // Function to get the current workout items
    function getCurrentWorkoutItems() {
        return Array.from(workoutList.querySelectorAll("input[type='text']")).map(input => input.value.trim()).filter(Boolean);
    }

    // Function to show the start screen
    function showStartScreen() {
        renderWorkoutLists(); // Ensure updated lists are rendered
        startScreen.style.display = 'block';
        workoutScreen.style.display = 'none';
    }

    // Function to show the workout screen
    function showWorkoutScreen() {
        startScreen.style.display = 'none';
        workoutScreen.style.display = 'block';
    }

    // Handle creating a new workout list
    createNewListButton.addEventListener("click", function () {
        const listName = prompt("Enter the name of your new workout list:");
        const lists = loadWorkoutLists();
        if (lists[listName]) {
            errorMessage.style.display = "block"; // Show error if list name already exists
        } else {
            errorMessage.style.display = "none"; // Hide error message if no duplicate
            if (listName) {
                lists[listName] = []; // Create an empty list
                saveWorkoutLists(lists);
                activeWorkoutList = listName;
                renderWorkoutList(['']); // Show one empty item initially
                showWorkoutScreen();
            }
        }
    });

    // Add a new workout item and focus on it
    function addNewItemAndFocus() {
        const newItem = document.createElement("div");
        newItem.innerHTML = `
            <input type="checkbox" class="workout-item"> 
            <input type="text" placeholder="Workout Item">
            <span class="delete-item">&times;</span>
        `;
        workoutList.appendChild(newItem);

        // Focus on the new item's input field
        const inputField = newItem.querySelector("input[type='text']");
        inputField.focus();

        newItem.querySelector(".delete-item").addEventListener("click", function () {
            workoutList.removeChild(newItem);
            saveWorkoutList(activeWorkoutList, getCurrentWorkoutItems());
        });

        // Add "Enter" key functionality to the new input field
        inputField.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                addNewItemAndFocus();
            }
        });

        saveWorkoutList(activeWorkoutList, getCurrentWorkoutItems());
    }

    addItemButton.addEventListener("click", addNewItemAndFocus);

    // Go back to the start screen (home button)
    goHomeButton.addEventListener("click", function () {
        showStartScreen();
    });

    // Save the workout list at any time
    saveListButton.addEventListener("click", function () {
        saveWorkoutList(activeWorkoutList, getCurrentWorkoutItems());
        alert("Workout list saved!");
    });

    // Timer functionality
    function resetTimer() {
        seconds = 0;
        minutes = 0;
        hours = 0;
        timerDisplay.textContent = "00:00:00";
    }

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
        timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    startWorkoutButton.addEventListener("click", function () {
        if (startWorkoutButton.textContent === "Start Workout") {
            timer = setInterval(updateTimer, 1000);
            startWorkoutButton.textContent = "End Workout";
        } else if (startWorkoutButton.textContent === "End Workout") {
            clearInterval(timer);
            congratsMessage.style.display = "block";
            startWorkoutButton.textContent = "Reset";
        } else if (startWorkoutButton.textContent === "Reset") {
            congratsMessage.style.display = "none";
            resetTimer();
            startWorkoutButton.textContent = "Start Workout";
            // Uncheck all checkboxes but retain the list
            Array.from(workoutList.querySelectorAll("input[type='checkbox']")).forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    });

    // Initialize the app with the start screen
    showStartScreen();
});
