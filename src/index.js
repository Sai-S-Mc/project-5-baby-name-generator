function handleApiCall(response) {
  new Typewriter("#apiResponse", {
    strings: response.data.answer,
    autoStart: true,
    delay: 45,
    cursor: null,
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  let radioSelection = document.querySelector("input[name='gender']:checked");
  let genderSelection = radioSelection.value;

  let cultureInputElement = document.querySelector("#culture");
  let cultureInput = cultureInputElement.value;
  if (cultureInput.length > 0) {
    cultureInput = `, based on ${cultureInput} culture`;
  } else {
    cultureInput = "";
  }

  let lengthInputElement = document.querySelector("#length");
  let lengthInput = lengthInputElement.value;
  if (lengthInput > 0 && lengthInput <= 10) {
    lengthInput = ` that is exactly ${lengthInput} characters long(NOT including whitespace)`;
  } else if (lengthInput > 10) {
    lengthInput = 10;
    lengthInput = ` that is exactly ${lengthInput} characters long(NOT including whitespace)`;
  } else {
    lengthInput = "";
  }

  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let context =
    "You are knowledgable in human names and know many names, based on different cultures and their meanings. You are especially talented in coming up with baby names based on user instructions. Please geenrate different answers every time. Make sure that the answer you generate is in HTML format as in the example. Here's an example: <div>A trendy name for a girl is Luna(LOO-nah).<br />Luna is of Latin origin, meaning 'moon', symbolizing light, beauty and mystery.</div> Please be respectful. Use appropriate emojis to make it fun.";
  let prompt = `Please generate a ${genderSelection} name along with it's pronunciation right after${cultureInput}${lengthInput} and it's meaning in a short sentence.`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let apiResponseElement = document.querySelector("#apiResponse");
  apiResponseElement.classList.remove("hidden");
  apiResponseElement.innerHTML = `<span class="generating">⏳Working my magic... Generating a name⏳</span>`;
  axios.get(apiUrl).then(handleApiCall);
}

let formElement = document.querySelector("#name-generator-form");
formElement.addEventListener("submit", handleFormSubmit);