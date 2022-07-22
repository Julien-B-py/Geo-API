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
const resultsList = document.querySelector("ul");

// Target clear button
const clearInput = document.querySelector("i");

// Handle user input
input.addEventListener("input", function () {

    // Hide the results list
    resultsList.classList.remove("visible");

    this.value.length ? clearInput.classList.add("visible") : clearInput.classList.remove("visible");

    // When the user has inputted 5 characters
    if (this.value.length === 5) {

        // Get data from the API and add matching cities as suggestions
        fetch(`https://geo.api.gouv.fr/communes?codePostal=${this.value}`)
            .then(response => response.json())
            .then(cities => {

                // If no result: create an option with default values
                if (!cities.length) return addResult();
                // If results, loop through every single city
                cities.forEach(city => {
                    // Get city postal code and name
                    const { code, nom } = city;
                    // Add every city as a list item to the results
                    addResult(code, nom);
                });

            });

        // Place the results list just under the input and make it visible
        resultsList.style.top = `${input.getBoundingClientRect().height}px`;
        resultsList.classList.add("visible");

    }

});

// Remove all results from the results list
const clearResults = () => {

    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.firstChild);
    }
    // Clear results list top position
    resultsList.style.top = null;

}

// Add an option to the results list
const addResult = (postalCode = 0, cityName = "Aucun résultat") => {

    // Create a list item to add the current city to the list
    let cityOption = document.createElement("li");
    // Create a new anchor to add a link leading to the city on Wikipedia
    let cityUrl = document.createElement("a");
    // If no postal code is given, it means no result has been found
    // "No result" message
    let cityUrlText = document.createTextNode(cityName);
    cityUrl.appendChild(cityUrlText);
    cityOption.appendChild(cityUrl);
    // Add the link to the results list
    resultsList.appendChild(cityOption);

    // If a postal code is given
    if (postalCode) {
        // Add the city Wikipedia page
        cityUrl.setAttribute('target', '_blank');
        cityUrl.href = `https://fr.wikipedia.org/wiki/${cityName}`;
    }

}


// When text input is focused
input.addEventListener("focus", function () {
    // Add classes to trigger CSS transitions and add a bigger outline to the input
    label.classList.add("focused");
    labelOutline.classList.add("outline--open");
    outline.classList.add("input__outline--focus");
})

// When text input loses focus
input.addEventListener("blur", function () {
    // If input is empty
    if (!this.value.length) {
        // Reset label position to act like a placeholder and close the input outline
        label.classList.remove("focused");
        labelOutline.classList.remove("outline--open");
    };
    // Remove the input outline
    outline.classList.remove("input__outline--focus");
})

// When results list css transition is over
resultsList.addEventListener("transitionend", function () {
    // If results list is not visible
    if (!this.classList.contains("visible")) {
        // Clear the results list
        clearResults();
    }

});

// When user clicks on the clear button (cross)
clearInput.addEventListener("click", function (e) {

    // Clear the input
    input.value = "";
    // Hide results list, input focus effect and the clear button
    resultsList.classList.remove("visible");
    label.classList.remove("focused");
    labelOutline.classList.remove("outline--open");
    this.classList.remove("visible");
    // Prevents click event on inputDiv 
    e.stopPropagation();

})


// Set focus on the text input when user clicks anywhere on <div class="input">
inputDiv.addEventListener("click", function () {
    input.focus();
})