# Google Generative AI (Gimini) cli helper .

<br>

> A package help you getting ai suggestions using Google Gimini

<br>

## Install

The latest stable release can be installed from NPM :

```
npm install -g commands-helper
# then set your api key generate from https://makersuite.google.com/app/apikey
commands-helper --set-api-key="YOUR_API_KEY"
```

<br>

Simple Usage

```bash
#Example 1 :
commands-helper --q="convert avi to mp4 with acc audio format using ffmpeg"
ffmpeg -i input.avi -c:v libx264 -c:a aac -strict experimental -b:a 128k output.mp4

#Example 2 :
commands-helper --q="extract the string 'switch' from all txt and js files"
find . -type f -name '*.txt' -exec grep -i switch {} + | sed 's/.*switch//g'

```

## License

- [MIT](https://opensource.org/license/mit/)
- I hold no legal responsibility; for more information, please refer to the bottom of the readme file.

## Bugs and Issues

Sincerely grateful for any reports on new features or bugs. Your valuable feedback on the code is highly appreciated.

## Contacts

- Core maintainer: [Abdullah Al-taheri, Sana'a Yemen](https://github.com/kernelcode) <br>
- E-mail: abdullah.altahery@gmail.com <br>

## Reference

[1] https://github.com/kernelcode/commands-helper
