const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000; // You can choose a different port
const OpenAI = require("openai");
const cors = require("cors");

const openai = new OpenAI({
  apiKey: process.env.OPENAPI_API_KEY,
});
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("DALL-E API Server is running!");
});

// Define a route to handle image generation requests
app.post("/generateImage", async (req, res) => {
  try {
    const prompt = req.body.prompt; // Assuming the client sends a 'prompt' in the request body

    const image = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      model: "dall-e-3",
    });

    console.log(image.data);
    res.json(image.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error generating image");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
