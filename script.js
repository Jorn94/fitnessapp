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
    const createNewListButton = document.getElementById("plus-icon");
    const goHomeButton = document.getElementById("go-home");
    const savageVikingLink = document.getElementById("savage-viking-workout");

    let timer;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let activeWorkoutList = null;

    // Default workout list name
    const DEFAULT_WORKOUT_LIST = 'Savage Viking Workout';

    // Function to load all workout lists from localStorage
    function loadWorkoutLists() {
        const savedLists = localStorage.getItem('workoutLists');
        return savedLists ? JSON.parse(savedLists) : { [DEFAULT_WORKOUT_LIST]: getDefaultWorkoutItems() };
    }

    // Function to save workout lists to localStorage
    function saveWorkoutLists(lists) {
        localStorage.setItem('workoutLists', JSON.stringify(lists));
    }

    // Default workout items
    function getDefaultWorkoutItems() {
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
    function showWorkoutScreen(listName) {
        activeWorkoutList = listName;
        renderWorkoutList(loadWorkoutList(listName));
        start
