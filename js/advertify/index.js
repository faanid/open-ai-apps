import { Configuration, OpenAIApi } from "openai";
import { process } from "./env";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

document.getElementById("submit-btn").addEventListener("click", () => {
  const productName = document.getElementById("name").value;
  const productDesc = document.getElementById("desc").value;
  const productTarget = document.getElementById("target").value;
  getCopySuggestion(productName, productDesc, productTarget);
});

async function getCopySuggestion(productName, productDesc, productTarget) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Use a product name, a product description and a target market to create advertising copy for a product.
    ###
    product name: Flask Tie
    product description: A tie with a pouch to hold liquids and a straw to drink through
    product traget market: office workers
    advertising copy: Are you tired of having to worry about how much to drink throughout the day? With the Flask Tie, you can stay hydrated on-the-go! Our unique tie features a pouch that enables you to securely hold and sip your favorite drinks with the built-in straw! The water cooler is history! Long live Flask Tie!
    ###
    product name: ${productName}
    product description: ${productDesc}
    product traget market: ${productTarget}
    advertising copy: 
    `,
    max_tokens: 100,
  });
  document
    .getElementById("ad-output")
    .insertAdjacentText("beforeend", response.data.choices[0].text.trim());
  document.getElementById("ad-input").style.display = "none";
  document.getElementById("ad-output").style.display = "block";
  console.log(response);
}
