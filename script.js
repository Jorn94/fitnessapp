document.addEventListener("DOMContentLoaded", function () {
    const workoutList = document.getElementById("workout-list");
    const addItemButton = document.getElementById("add-item");
    const pingSound = document.getElementById("ping-sound");
    const congratsMessage = document.getElementById("congratulations-message");
    const startWorkoutButton = document.getElementById("start-workout");
    const timerDisplay = document.getElementById("timer-display");
    const workoutScreen = document.getElementById("workout-screen");
    const startScreen = document.getElementById("start-screen");
    const workoutListsDiv = document.getElementById("workout-lists");
    const createNewListButton = document.getElementById("create-new-list");
    const goHomeButton = document.getElementById("go-home");

    // Timer variables
    let timer;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let activeWorkoutList = null;

    // Function to load all workout lists from localStorage
    function loadWorkoutLists() {
        const savedLists = localStorage.getItem('workoutLists');
        return savedLists ? JSON.parse(savedLists) : {};
    }

    // Function to save workout lists to localStorage
    function saveWorkoutLists(lists) {
        localStorage.setItem('workoutLists', JSON.stringify(lists));
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

            newItem.querySelector(".delete-item").addEventListener("click", function () {
                workoutList.removeChild(newItem);
                saveWorkoutList(activeWorkoutList, getCurrentWorkoutItems());
            });
        });
    }

    // Function to get the current workout items
    function getCurrentWorkoutItems() {
        return Array.from(workoutList.querySelectorAll("input[type='text']")).map(input => input.value.trim()).filter(Boolean);
    }

    // Function to show the start screen
    function showStartScreen() {
        startScreen.style.display = 'block';
        workoutScreen.style.display = 'none';
        renderWorkoutLists();
    }

    // Function to show the workout screen
    function showWorkoutScreen() {
        startScreen.style.display = 'none';
        workoutScreen.style.display = 'block';
    }

    // Function to render all workout lists in the start screen
    function renderWorkoutLists() {
        const lists = loadWorkoutLists();
        workoutListsDiv.innerHTML = '';
        for (let listName in lists) {
            const listButton = document.createElement("button");
            listButton.textContent = listName;
            listButton.addEventListener("click", function () {
                activeWorkoutList = listName;
                renderWorkoutList(loadWorkoutList(listName));
                showWorkoutScreen();
            });
            workoutListsDiv.appendChild(listButton);
        }
    }

    // Initial rendering of the start screen
    showStartScreen();

    // Create new workout list
    createNewListButton.addEventListener("click", function () {
        const listName = prompt("Enter the name of your new workout list:");
        if (listName) {
            const lists = loadWorkoutLists();
            lists[listName] = []; // Create an empty list
            saveWorkoutLists(lists);
            activeWorkoutList = listName;
            renderWorkoutList([]);
            showWorkoutScreen();
        }
    });

    // Add new workout item
    addItemButton.addEventListener("click", function () {
        const newItem = document.createElement("div");
        newItem.innerHTML = `
            <input type="checkbox" class="workout-item"> 
            <input type="text" placeholder="Workout Item">
            <span class="delete-item">&times;</span>
        `;
        workoutList.appendChild(newItem);

        newItem.querySelector(".delete-item").addEventListener("click", function () {
            workoutList.removeChild(newItem);
            saveWorkoutList(activeWorkoutList, getCurrentWorkoutItems());
        });

        saveWorkoutList(activeWorkoutList, getCurrentWorkoutItems());
    });

    // Go back to the start screen
    goHomeButton.addEventListener("click", function () {
        showStartScreen();
    });

    // Timer
