document.addEventListener("DOMContentLoaded", () => {
    getDogs();
})

function getDogs() {
    fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => displayDogs(dog)));
}

function displayDogs(dog) {
    const dogBar = document.getElementById("dog-bar");
    const dogSpan = document.createElement("span");

    dogSpan.textContent = dog.name;
    dogBar.appendChild(dogSpan);
    
}