const fs = require("fs");

function formatJSONText(inputString) {
  // Define the marker string
  let marker = "```json";
  // some times it starts with ```
  if (inputString.indexOf(marker) === -1) marker = "```";

  // Find the start and end indexes of the JSON string

  const startIndex = inputString.indexOf(marker) + marker.length;
  const endIndex = inputString.indexOf("```", startIndex);

  // Extract the JSON string
  const jsonString = inputString.substring(startIndex, endIndex).trim();

  // Parse the JSON string into a JavaScript object
  const jsonObject = JSON.parse(jsonString);

  return jsonObject.command;
}
function readToken(token) {
  if (token) {
    fs.writeFileSync(".token", token);
    return token;
  }
  if (!fs.existsSync(".token")) {
    console.log("Please Enter your Google Bard token!  help: https://....");
    console.log("\x1b[1m%s\x1b[0m", 'cli-helper --set-token="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"');
    process.exit();
  }
  return fs.readFileSync(".token", {
    encoding: "utf-8",
  });
}
function extractFromHTML(variableName, html) {
  const regex = new RegExp(`"${variableName}":"([^"]+)"`);
  const match = regex.exec(html);
  return match?.[1];
}
module.exports = {
  formatJSONText,
  extractFromHTML,
  readToken,
};
