const fetch = require("node-fetch");
const querystring = require("querystring");
const { parse } = require("url");
const { extractFromHTML, readToken } = require("./helpers");

class Bard {
  constructor(evnArgs) {
    this.apiKey = readToken(evnArgs["set-token"]);
    this.headers = {
      Host: "bard.google.com",
      "X-Same-Domain": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Origin: "https://bard.google.com",
      Referer: "https://bard.google.com/",
    };
    this._reqid = Math.floor(Math.random() * 10000);
    this.conversationId = "";
    this.responseId = "";
    this.choiceId = "";
  }

  async _get_snim0e() {
    const options = {
      headers: {
        ...this.headers,
        Cookie: `__Secure-1PSID=${this.apiKey}`,
      },
      method: "GET",
      timeout: 10000,
    };
    const response = await fetch("https://bard.google.com/faq", options);
    if (response.status !== 200) {
      throw new Error(`Response Status: ${response.status}`);
    }
    const text = await response.text();
    const snim0e = extractFromHTML("SNlM0e", text);
    return snim0e;
  }

  async getAnswer(inputText) {
    const params = {
      bl: "boq_assistant-bard-web-server_20230419.00_p1",
      _reqid: this._reqid,
      rt: "c",
    };
    const inputTextStruct = [[inputText], null, [this.conversationId, this.responseId, this.choiceId]];
    const data = {
      "f.req": JSON.stringify([null, JSON.stringify(inputTextStruct)]),
      at: await this._get_snim0e(),
    };
    const options = {
      headers: {
        ...this.headers,
        Cookie: `__Secure-1PSID=${this.apiKey}`,
      },
      method: "POST",
      body: querystring.stringify(data),
      timeout: 10000,
    };
    const response = await fetch(
      `https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?${querystring.stringify(
        params
      )}`,
      options
    );
    const respLines = (await response.text()).split("\n");

    const respDict = JSON.parse(respLines[3])[0][2];
    if (respDict === null) {
      return {
        content: `Response Error: ${respLines.join("\n")}.`,
      };
    }
    const parsedAnswer = JSON.parse(respDict);
    const bardAnswer = {
      content: parsedAnswer[0][0],
      conversationId: parsedAnswer[1][0],
      responseId: parsedAnswer[1][1],
      factualityQueries: parsedAnswer[3],
      textQuery: parsedAnswer[2][0] ?? "",
      choices: parsedAnswer[4].map((i) => ({ id: i[0], content: i[1] })),
    };
    this.conversationId = bardAnswer.conversationId;
    this.responseId = bardAnswer.responseId;
    this.choiceId = bardAnswer.choices[0].id;
    this._reqid += 100000;
    return bardAnswer;
  }
}
module.exports = Bard;
