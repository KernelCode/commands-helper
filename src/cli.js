#!/usr/bin/env node

const args = require("args-parser")(process.argv);
const Bard = new (require("./bard.ai.core"))(args);
const q = args.q;
const { formatJSONText } = require("./helpers");

if (!q) {
  console.log('using : cli-helper --q="list all files in root dir?"');
  process.exit();
}
Bard.getAnswer(
  `i want you to only respond to me ONLY in json format when i ask you the response will be like this 
  what the command to create a folder ?
  your respons will be : {command:"mkdir YOUR_DIR_NAME"}
  
  start now :
  my question is : ${q}?`
)
  .then((res) => {
    const command = formatJSONText(res.content + "");
    console.log("Use command : ");
    console.log("\x1b[1m%s\x1b[0m", "- " + command);

    if (!command === formatJSONText(res.choices[0].content + ""))
      console.log("- ", formatJSONText(res.choices[0].content + ""));
    if (!command === formatJSONText(res.choices[1].content + ""))
      console.log("- ", formatJSONText(res.choices[1].content + ""));
    if (!command === formatJSONText(res.choices[2].content + ""))
      console.log("- ", formatJSONText(res.choices[2].content + ""));
  })
  .catch((err) => {
    console.log(err);
  });
