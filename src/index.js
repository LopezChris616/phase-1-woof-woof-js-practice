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

    dogSpan.addEventListener("click", () => displayInfo(dog, dogSpan));
}

function displayInfo(dog) {
    const dogInfo = document.getElementById("dog-info");
    const dogContainer = document.getElementById("dog-summary-container");
    const dogImage = document.createElement("img");
    const dogName = document.createElement("h2");
    const dogBehavior = document.createElement("button");

    dogInfo.textContent = "";

    dogImage.setAttribute("src", dog.image);
    dogName.textContent = dog.name;
    dog.isGoodDog === true ? dogBehavior.textContent = "Good Dog!" : dogBehavior.textContent = "Bad Dog!";

    dogInfo.append(dogImage, dogName, dogBehavior);
    dogContainer.appendChild(dogInfo);
}