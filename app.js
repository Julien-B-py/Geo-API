// Target the input and clear it
const input = document.querySelector("input");
input.value = "";

// Target the select
const select = document.querySelector("select");

// Target labels
const [label, labelOutline] = document.querySelectorAll("label");

// Target outline
const outline = document.querySelector(".input__outline");

// Handle user input
input.addEventListener("input", function () {

    // Clear the select from any previous research
    clearSelectOptions();

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

    }

});

// Remove all options from the select
const clearSelectOptions = () => {
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
}

// Add an option to the select
const addSelectOption = (cityCode = 0, cityName = "Aucun résultat") => {
    let cityOption = document.createElement("option");
    cityOption.value = cityCode;
    cityOption.text = cityName;
    select.appendChild(cityOption);
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