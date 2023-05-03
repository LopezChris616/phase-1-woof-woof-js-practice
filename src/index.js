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

    dogSpan.addEventListener("click", () => displayInfo(dog));
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
    dogGoodOrBad(dog, dogBehavior);

    dogInfo.append(dogImage, dogName, dogBehavior);
    dogContainer.appendChild(dogInfo);

    dogBehavior.addEventListener("click", () => toggleBehavior(dog, dogBehavior));
}

function toggleBehavior(dog, behavior) {
    dog.isGoodDog = !dog.isGoodDog
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog
        })
    })
        .then(res => res.json())
        .then(dog => dogGoodOrBad(dog, behavior))
        .catch(err => console.log(err))
}

function dogGoodOrBad(dog, behavior) {
    dog.isGoodDog === true ? behavior.textContent = "Good Dog!" : behavior.textContent = "Bad Dog!";
}