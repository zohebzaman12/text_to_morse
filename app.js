const input = document.querySelector("#input");
const output = document.querySelector("#output");

const playButton = document.querySelector(".button-play");
const stopButton = document.querySelector(".button-stop");
let stopPlayback = false;



playButton.addEventListener("click",function(){
    stopPlayback = false;
    playSound(output.value);
})


stopButton.addEventListener("click",function(){
    stopPlayback= true;

})


input.addEventListener("input",function(e){
    const inputText = input.value;
    output.value = textToMorse(inputText);
})

function textToMorse(text){
    const morseCodeMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
        'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
        'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
        '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        ' ': '/',
        '.': '.-.-.-', ',': '--..--', '?': '..--..',
        "'": '.----.', '!': '-.-.--', '/': '-..-',
        '(': '-.--.', ')': '-.--.-', '&': '.-...',
        ':': '---...', ';': '-.-.-.', '=': '-...-',
        '+': '.-.-.', '-': '-....-', '_': '..--.-',
        '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
        '¿': '..-.-', '¡': '--...-'
      };


      text = text.toUpperCase();

      let result = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (morseCodeMap[char]) {
            result += morseCodeMap[char] + ' ';
            } else {
            result += char + ' ';
            }
        }

       return result
}



async function playSound(morseCode) {
    const dotAudio = document.getElementById("dotAudio");
    const dashAudio = document.getElementById("dashAudio");
  
    const audioMorseCodeMap = {
      '.': dotAudio,
      '-': dashAudio,
      ' ': () => new Promise(resolve => setTimeout(resolve, 250)), // Add a delay for spaces (word gap)
    };
  
    for (let i = 0; i < morseCode.length; i++) {

        if(stopPlayback){
            break;
        }
      const char = morseCode[i];
      const audio = audioMorseCodeMap[char];
      
      if (audio) {
        if (typeof audio === "function") {
          await audio();
        } else {
          await new Promise(resolve => {
            audio.play();
            audio.onended = resolve;
          });
        }
      }
    }
  }

