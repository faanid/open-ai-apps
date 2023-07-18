import { Configuration, OpenAIApi } from "openai";
import { process } from "./env";

const outputImg = document.getElementById("output-img");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

document.getElementById("submit-btn").addEventListener("click", () => {
  const prompt = document.getElementById("instruction").value;
  generateImage(prompt);
});

async function generateImage(prompt) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
    response_format: "b64_json",
  });
  outputImg.innerHTML = `<img src="data:image/png;base64,${response.data.data[0].b64_json}">`;
}
