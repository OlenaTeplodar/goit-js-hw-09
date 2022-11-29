import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css';


import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  spanDataDays: document.querySelector('span[data-days]'),
  spanDataHours: document.querySelector('span[data-hours]'),
  spanDataMinutes: document.querySelector('span[data-minutes]'),
  spanDataSeconds: document.querySelector('span[data-seconds]'),
};

let userDate = null;
let timerIdInterval = null;

// дезактивуємо кнопку старт
refs.startBtn.disabled = true;


// вибір дати користувачем
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate || refs.inputDate.value === ''
      ? (Notiflix.Notify.failure('Please choose a date in the future'),
        (refs.startBtn.disabled = true))
      : (Notiflix.Notify.info('The date is correct. Push the start button!'),
        (refs.startBtn.disabled = false));
    userDate = selectedDates[0];
  },
};

// початковий вигляд сторінки з поточною датою
const startOptoins = flatpickr(refs.inputDate, options);

// функція запуску таймеру
function startTimer() {

    // дезактивація кнопки
  refs.startBtn.disabled = true;

    // перевірка обраної користувачем дати
  if (userDate <= Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  Notiflix.Notify.success('Timer started successfully!');
  timerIdInterval = setInterval(() => {
    let timer = userDate - Date.now();
    if (timer > 0) {
      timerMarkUp(timer);
    } else {
        // зупинка таймеру та очищення табло
      Notiflix.Notify.info('Timer passed!');
      clearInterval(timerIdInterval);
      defaultTimerMarkUp();
    }
  }, 1000);
}

// приведенння до двозначного представлення даних (за виключенням днів) та виведення на екран користувача
function timerMarkUp(timer) {
  const { days, hours, minutes, seconds } = convertMs(timer);
  refs.spanDataSeconds.textContent = addLeadingZero(seconds);
  refs.spanDataMinutes.textContent = addLeadingZero(minutes);
  refs.spanDataHours.textContent = addLeadingZero(hours);
  refs.spanDataDays.textContent = days;
  refs.inputDate.disabled = true;
}

// функція "обнулення" таймеру
function defaultTimerMarkUp() {
  refs.spanDataSeconds.textContent = '00';
  refs.spanDataMinutes.textContent = '00';
  refs.spanDataHours.textContent = '00';
  refs.spanDataDays.textContent = '00';
  refs.inputDate.disabled = false;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// функція стандартизації до двозначного числа
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// "слухач" вмикання таймеру на кнопці старт
refs.startBtn.addEventListener('click', startTimer);

