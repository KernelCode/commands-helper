# Google <a href="https://bard.google.com/"><img src="https://camo.githubusercontent.com/adb54264fe2ad5067d07d0752fc32600b4e6250073b01ce8c386575b431e3f06/68747470733a2f2f7777772e677374617469632e636f6d2f6c616d64612f696d616765732f66617669636f6e5f76315f31353031363063646466663766323934636533302e737667" height="20px"></a> Bard Command Line Helper

<br>

> A package help using linux cli with the help of [Google Bard](https://bard.google.com/) through API

<br>

Never expose the `__Secure-1PSID` for your safety.

> Note that while I referred to `__Secure-1PSID` value as an API KEY for convenience, it is not an officially provided API KEY.

<br>

## Install

The latest stable release can be installed from NPM :

```
npm install -g commands-helper
```

<br>

## Authentication

1. Visit https://bard.google.com/
2. F12 for console
3. Session: Application → Cookies → Copy the value of `__Secure-1PSID` cookie.

<br>

Simple Usage

```javascript
// Command
commands-helper --q="convert avi to mp4 with acc audio format using ffmpeg"
// Response
// Use command :
// - ffmpeg -i input.avi -c:v libx264 -c:a aac -strict experimental -b:a 128k output.mp4
```

## License

- [MIT](https://opensource.org/license/mit/)
- I hold no legal responsibility; for more information, please refer to the bottom of the readme file.

## Bugs and Issues

Sincerely grateful for any reports on new features or bugs. Your valuable feedback on the code is highly appreciated.

## Contacts

- Core maintainer: [Abdullah Al-tahery, Sana'a Yemen](https://github.com/kernelcode) <br>
- E-mail: abdullah.altahery@gmail.com <br>

## Reference

[1] https://github.com/kernelcode/commands-helper

### Important Warning: All legal responsibilities associated with the use of the package lie with the user.

This NodeJS package just provides code for JS developers to easily access Google Bard. it should be noted that there is no liability for the use of the code. Please refer to the Google Bard Official Document for more details.

Thank you for your interest.
