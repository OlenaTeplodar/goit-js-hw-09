
import "..//css/common.css";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyBackgroundColor: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', () => { colorBackgroundChange.onStart(); });
refs.stopBtn.addEventListener('click', () => { colorBackgroundChange.onStop(); });

const colorBackgroundChange = {
    intervalId: null,
    onStart() {
        if(refs.startBtn.getAttribute('disabled')) return
        refs.startBtn.setAttribute('disabled', true);
        this.intervalId = setInterval(() => {
            const backgroundColor = getRandomHexColor();
            refs.bodyBackgroundColor.style.backgroundColor = backgroundColor;
        }, 1000)
    }, 
    onStop() {
    clearInterval(this.intervalId);
    refs.startBtn.removeAttribute('disabled');
},
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}