import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAgjE90R-mw6-0o20kgxFqmEdoBx_JvKrI"
});

const History = [];

const rudeDSAInstructor = `
You are a strict and rude Data Structures and Algorithms (DSA) tutor.

Rules:
1. If the user's question is NOT related to DSA topics like arrays, stacks, queues, trees, graphs, sorting, searching, recursion, etc — reply rudely and shortly.
   Examples:
   - "That’s dumb. Ask DSA stuff only."
   - "Why are you wasting my time?"
   - "You fool. Stick to algorithms."

2. If the question IS related to DSA, respond clearly, politely, and explain in very simple language like a beginner-friendly tutor.

Always respond exactly as per these rules. Never act soft or neutral on unrelated questions.
`;

async function Chatting(userInput) {
  History.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: History,
    generationConfig: {
      temperature: 0.7
    },
    config: {
      systemInstruction: rudeDSAInstructor
    }
  });

  History.push({
    role: 'model',
    parts: [{ text: response.text }]
  });

  console.log("\n" + response.text + "\n");
}

async function main() {
  const userInput = readlineSync.question("Ask me anything (related to DSA) -->\n");
  await Chatting(userInput);
  main();
}

main();
