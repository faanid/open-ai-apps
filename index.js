import { process } from "/env";
import { Configuration, OpenAIApi } from "openai";

const setupTextarea = document.getElementById("setup-textarea");
const setupInputContainer = document.getElementById("setup-input-container");
const movieBossText = document.getElementById("movie-boss-text");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

document.getElementById("send-btn").addEventListener("click", () => {
  if (setupTextarea.value) {
    const userInput = setupTextarea.value;
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
    fetchBotReply(userInput);
  }
});

async function fetchBotReply() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Sound enthusiastic in five words or less.",
  });

  movieBossText.innerText = data.choices[0].text.trim();
}
