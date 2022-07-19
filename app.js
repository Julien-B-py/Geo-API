// Target the container
const inputDiv = document.querySelector(".input");
// Target the input and clear it
const input = document.querySelector("input");
input.value = "";

// Target labels
const [label, labelOutline] = document.querySelectorAll("label");

// Target outline
const outline = document.querySelector(".input__outline");

// Target results
const ul = document.querySelector("ul");

// Target clear button
const clearInput = document.querySelector("i");

// Handle user input
input.addEventListener("input", function () {

    ul.classList.remove("visible");

    this.value.length ? clearInput.classList.add("visible") : clearInput.classList.remove("visible");

    // When the user has inputted 5 characters
    if (this.value.length === 5) {

        // Get data from the API and add matching cities as suggestions
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${this.value}`)
            .then(response => response.json())
            .then(cities => {

                // If no result: create an option with default values
                if (!cities.length) return addSelectOption();
                // If results, loop through every single city
                cities.forEach(city => {
                    // Get city code and name
                    const { code, nom } = city;
                    // Add every city as option to the select
                    addSelectOption(code, nom);
                });

            });

        ul.style.top = `${input.getBoundingClientRect().height}px`;
        ul.classList.add("visible");

    }

});

// Remove all options from the select
const clearSelectOptions = () => {

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    ul.style.top = null;

}

// Add an option to the select
const addSelectOption = (cityCode = 0, cityName = "Aucun résultat") => {

    let cityOption1 = document.createElement("li");

    if (cityCode) {
        let cityUrl = document.createElement("a");
        cityUrl.setAttribute('target', '_blank');
        cityUrl.href = `https://fr.wikipedia.org/wiki/${cityName}`;
        let cityUrlText = document.createTextNode(cityName);
        cityUrl.appendChild(cityUrlText);
        cityOption1.appendChild(cityUrl);
        ul.appendChild(cityOption1);
        return;
    }

    cityOption1.textContent = cityName;
    ul.appendChild(cityOption1);

}



input.addEventListener("focus", function () {
    label.classList.add("focused");
    labelOutline.classList.add("outline--open");
    outline.classList.add("input__outline--focus");
})

input.addEventListener("blur", function () {
    if (!this.value.length) {
        label.classList.remove("focused");
        labelOutline.classList.remove("outline--open");
    };
    outline.classList.remove("input__outline--focus");
})


ul.addEventListener("transitionend", function () {

    if (!this.classList.contains("visible")) {
        // Clear the select from any previous research
        clearSelectOptions();
    }

});

clearInput.addEventListener("click", function (e) {

    ul.classList.remove("visible");
    input.value = "";
    this.classList.remove("visible");

    label.classList.remove("focused");
    labelOutline.classList.remove("outline--open");

    e.stopPropagation();

})



inputDiv.addEventListener("click", function () {
    input.focus();
})