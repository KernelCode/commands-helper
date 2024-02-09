#!/usr/bin/env node

const args = require("args-parser")(process.argv);
const path = require("path");
const fs = require("fs");
const os = require("os");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKeyPath = path.join(__dirname, ".api-key");
const q = args.q;
if (args["set-api-key"]) {
  fs.writeFileSync(apiKeyPath, args["set-api-key"]);
  console.log("API Key saved!");
  process.exit(0);
}
if (!q) {
  console.log('using : commands-helper --q="list all files in root dir?"');
  process.exit(0);
}
function readApiKey(apikey) {
  if (apikey) {
    fs.writeFileSync(apiKeyPath, apikey);
    return apikey;
  }
  if (!fs.existsSync(apiKeyPath)) {
    console.log("Set Your Google Generative API_KEY using");
    console.log("\x1b[1m%s\x1b[0m", 'commands-helper --set-api-key="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"');
    process.exit(0);
  }
  return fs.readFileSync(apiKeyPath, {
    encoding: "utf-8",
  });
}

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(readApiKey());

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt =
    "Write 3 options separated by lines without any additional text or lines. The OS is: " +
    os.platform() +
    " Explain the command with a few words using this format: [command] # explaining command." +
    " And the CLI command to do: " +
    args.q;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const lines = text.split("\n");
  const dimColorEscapeCode = "\x1b[2m";
  const resetEscapeCode = "\x1b[0m";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().split("#");
    if (line) lines[i] = line[0] + dimColorEscapeCode + "#" + line[1] + resetEscapeCode;
  }

  const formattedText = lines.join("\n");
  console.log(formattedText);
}

run();
