function handleFormSubmit(event) {
  event.preventDefault();
  let radioSelection = document.querySelector("input[name='gender']:checked");
  let genderSelection = radioSelection.value;

  let cultureInputElement = document.querySelector("#culture");
  let cultureInput = cultureInputElement.value;

  let lengthInputElement = document.querySelector("#length");
  let lengthInput = lengthInputElement.value;

  new Typewriter("#name", {
    strings: `A trendy name for a girl is Luna(LOO-nah).
          <br />
          Luna is of Latin origin, meaning "moon," symbolizing light, beauty,
          and mystery.`,
    autoStart: true,
    delay: 55,
    cursor: `<span class="material-symbols-outlined heart-cursor">favorite</span>`,
  });
}

let formElement = document.querySelector("#name-generator-form");
formElement.addEventListener("submit", handleFormSubmit);
