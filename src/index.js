function handleError() {
  let errorMessages = [
    "Uh-oh! The stork got lost on the way with your baby name. Try again!",
    "Oops! Our name crib is empty. Let's rattle it up and try once more!",
    "Whoops! The baby name fairy fell asleep. Wake her up with another click!",
    "Oh no! The naming playground is closed for recess. Try again in a sec!",
    "Eek! The baby name blocks got knocked over. Let's rebuild and retry!",
  ];

  let randomIndex = Math.floor(Math.random() * errorMessages.length);
  let errorMessage = errorMessages[randomIndex];

  new Typewriter("#apiResponse", {
    strings: errorMessage,
    autoStart: true,
    delay: 25,
    cursor: null,
  });
}

function handleApiCall(response) {
  new Typewriter("#apiResponse", {
    strings: response.data.answer,
    autoStart: true,
    delay: 25,
    cursor: null,
  });
}

function formatOptionalInputs(culture, length) {
  let culturePhrase = `of ${culture} culture`;
  let lengthPhrase = `${length} characters long`;
  let message = `The name should be`;
  if (culture || length) {
    if (culture && length) {
      message = `${message} ${culturePhrase} and ${lengthPhrase}.`;
    } else if (culture) {
      message = `${message} ${culturePhrase}.`;
    } else if (length) {
      message = `${message} ${lengthPhrase}.`;
    }
  } else {
    message = "";
  }
  return message;
}

function handleFormSubmit(event) {
  event.preventDefault();
  let genderSelectionElement = document.querySelector(
    "input[name='gender']:checked"
  );
  let genderSelection = genderSelectionElement.value;

  let cultureInputElement = document.querySelector("#culture");
  let cultureInput = cultureInputElement.value;
  if (cultureInput) {
    cultureInput = cultureInput.trim();
  }

  let lengthInputElement = document.querySelector("#length");
  let lengthInput = lengthInputElement.value;
  let lengthContext = "";
  if (lengthInput) {
    lengthContext = ` Make sure to obey the ${lengthInput} character requirement when it comes to the name not its pronunciation. If you cannot find a name that can obey the ${lengthInput} character requirement, include a short but playful apology and explanation before the rest of the answer in HTML format.For example, <div>I searched the solar system for a ${genderSelection} name that is exactly ${lengthInput} characters long but I couldn't find any. Here's a name that I think you might like. I counted it and I think it is [specify the character length] characters long (I am sometimes bad at Math).<br/><br/></div>`;
  }

  let optionalPreference = formatOptionalInputs(cultureInput, lengthInput);

  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let context = `You are knowledgable in human names and know many names, based on different cultures and their meanings. You are especially talented in coming up with baby names based on user instructions. Please generate different answers every time. Make sure that the answer you generate is in HTML format as in the example. Here's an example: <div>A trendy name for a girl is Luna(LOO-nah).<br />Luna is of Latin origin, meaning 'moon', symbolizing light, beauty and mystery.</div>${lengthContext}.Please be respectful. Use appropriate emojis to make it fun.`;
  let prompt = `Please generate a ${genderSelection} name along with it's pronunciation and it's meaning in a short sentence.${optionalPreference}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let apiResponseElement = document.querySelector("#apiResponse");
  apiResponseElement.classList.remove("hidden");
  apiResponseElement.innerHTML = `<span class="generating">⏳Working my magic... Generating a name⏳</span>`;
  axios.get(apiUrl).then(handleApiCall).catch(handleError);
}

let formElement = document.querySelector("#name-generator-form");
formElement.addEventListener("submit", handleFormSubmit);
