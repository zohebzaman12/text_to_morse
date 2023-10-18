// t2m stands for "text to morse"
// m2t stands for "morse to text"

const input = document.querySelector("#input-t2m");
const output = document.querySelector("#output-t2m");
const playButton = document.querySelector(".button-play");
const stopButton = document.querySelector(".button-stop");
const speedLabel = document.querySelector("output[for='speed']");
const speedVal = document.querySelector("#speed");
const copyButton = document.querySelector(".button-copy");

const t2mTab = document.querySelector("#textToMorseTab");
const m2tTab = document.querySelector("#morseToTextTab")

const t2mdiv = document.querySelector("#input-output-t2m");
const m2tdiv = document.querySelector("#input-output-m2t")

const input2 = document.querySelector("#input-m2t");
const output2 = document.querySelector("#output-m2t");

let stopPlayback = false;
let isTextToMorseActive = true;


speedVal.addEventListener("input",function(){
    speedLabel.textContent = `${speedVal.value}%`
});


playButton.addEventListener("click",function(){
    stopPlayback = false;
    
    const speedVal = document.querySelector("#speed");
   if(isTextToMorseActive){
    playSound(output.value,speedVal);
   }else{
    playSound(input2.value,speedVal);
   }
    
})


stopButton.addEventListener("click",function(){
    stopPlayback= true;

})


input.addEventListener("input",function(e){
    const inputText = input.value;
    output.value = textToMorse(inputText);
})


input2.addEventListener("input",function(e){
  const inputText = input2.value;
  output2.value = morseToText(inputText);
})

copyButton.addEventListener("click", function() {
    navigator.clipboard.writeText(output.value);
  });

t2mTab.addEventListener("click",function(){
  t2mdiv.style = "display:block;"
  m2tdiv.style = "display:none;"
  isTextToMorseActive = true;
  input.value = "";
  output.value = "";
})

m2tTab.addEventListener("click",function(){
  t2mdiv.style = "display:none;"
  m2tdiv.style = "display:block;"
  isTextToMorseActive = false;
  input2.value = "";
  output2.value = "";
})

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


function textToMorse(text){


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



async function playSound(morseCode, speed = 100) {
    const dotAudio = document.getElementById("dotAudio");
    const dashAudio = document.getElementById("dashAudio");
    speed = speed.value;
    const dotSpeed = Math.min(Math.max(speed / 100, 0.5), 2);
    const dashSpeed = Math.min(Math.max(speed / 100, 0.5), 2);
    

  
    const audioMorseCodeMap = {
      '.': dotAudio,
      '-': dashAudio,
      ' ': () => new Promise(resolve => setTimeout(resolve,250 * (100 / speed))), // Add a delay for spaces (word gap)
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
            audio.playbackRate = char === '.' ? dotSpeed : dashSpeed ;
            audio.play();
            audio.onended = resolve;
          });
        }
      }
    }
  }




  

  function morseToText(morseCode){
    const morseCodeMap = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
      '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
      '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
      '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
      '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
      '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3',
      '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
      '----.': '9', '/': ' ', '.-.-.-': '.', '--..--': ',', '..--..': '?',
      '.----.': "'", '-.-.--': '!', '-..-.': '/', '-.--.': '(', '-.--.-': ')',
      '.-...': '&', '---...': ':', '-.-.-.': ';', '-...-': '=', '.-.-.': '+',
      '-....-': '-', '..--.-': '_', '.-..-.': '"', '...-..-': '$', '.--.-.': '@',
      '..--': '¿', '--...-': '¡'
    };

    const morseWords = morseCode.split(`/`);

    let text = '';

    for (let i =0; i<morseWords.length; i++){
      const morseWord = morseWords[i];

      const morseChars = morseWord.split(" ");

        for (let j = 0; j < morseChars.length; j++){
          const char = morseChars[j];
          if(morseCodeMap[char]){
            text = text+ morseCodeMap[char];
          }else{
            text = text+ char;
          }
        }

        if(i<morseWords.length - 1){
          text = text + " ";
        }

    }

    return text;

  }


  function populateTable() {
    const tableBody = document.getElementById('morse-code-table');
    const characters = Object.keys(morseCodeMap);
    const numColumns = 5;

    for (let i =0 ;i < characters.length; i+= numColumns) {
      const row = document.createElement('tr');

      for (let j = 0; j < numColumns; j++) {
        if(i+j < characters.length){
          const char = characters[i + j];
          const morseCode = morseCodeMap[char];

          const charCell = document.createElement('td');
          charCell.textContent = char;
          row.appendChild(charCell);

          const morseCell = document.createElement('td');
          morseCell.textContent = morseCode;
          row.appendChild(morseCell);

        }

      }

      tableBody.appendChild(row);
       
    }
}

populateTable();