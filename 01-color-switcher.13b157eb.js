!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),bodyBackgroundColor:document.querySelector("body")},n={intervalId:null,onStart:function(){t.startBtn.getAttribute("disabled")||(t.startBtn.setAttribute("disabled",!0),this.intervalId=setInterval((function(){var n="#".concat(Math.floor(16777215*Math.random()).toString(16));t.bodyBackgroundColor.style.backgroundColor=n}),1e3))},onStop:function(){clearInterval(this.intervalId),t.startBtn.removeAttribute("disabled")}};t.startBtn.addEventListener("click",n.onStart.bind(n)),t.stopBtn.addEventListener("click",n.onStop.bind(n))}();
//# sourceMappingURL=01-color-switcher.13b157eb.js.map