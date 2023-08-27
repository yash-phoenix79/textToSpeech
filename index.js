let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[7];

  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

let isPaused = false;
let playIcon = "fa-play";
let pauseIcon = "fa-pause";

document.querySelector("button").addEventListener("click", () => {
  if (isPaused) {
    window.speechSynthesis.resume();
    isPaused = false;
    document.querySelector("button i").classList.remove(playIcon);
    document.querySelector("button i").classList.add(pauseIcon);
  } else {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      isPaused = true;
      document.querySelector("button i").classList.remove(pauseIcon);
      document.querySelector("button i").classList.add(playIcon);
    } else {
      speech.text = document.querySelector("textarea").value;
      window.speechSynthesis.speak(speech);
    }
  }
});
