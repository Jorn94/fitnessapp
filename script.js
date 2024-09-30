document.addEventListener("DOMContentLoaded", function () {
    const workoutList = document.getElementById("workout-list");
    const addItemButton = document.getElementById("add-item");
    const finishButton = document.getElementById("finish-workout");
    const pingSound = document.getElementById("ping-sound");

    // Function to add a new workout item
    addItemButton.addEventListener("click", function () {
        const newItem = document.createElement("div");
        newItem.innerHTML = `
            <input type="checkbox" class="workout-item"> 
            <input type="text" placeholder="Workout Item">
        `;
        workoutList.appendChild(newItem);
    });

    // Function to play ping sound on checkbox check
    workoutList.addEventListener("change", function (e) {
        if (e.target && e.target.matches(".workout-item")) {
            pingSound.play();
        }
    });

    // Function for finishing the workout
    finishButton.addEventListener("click", function () {
        alert("Great job! You finished your workout.");
    });
});
