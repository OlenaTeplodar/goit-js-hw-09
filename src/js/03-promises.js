import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  formAllInput: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  };


function onSubmit(event) {
  event.preventDefault();
  console.log(2544);
  const options = {
    startDelay: refs.delayInput.value,
    step: refs.stepInput.value,
    amount: refs.amountInput.value,
  };

  createBlockOfPromise(options);
}

function createBlockOfPromise({ startDelay, step, amount }) {
  for (let position = 0; position < amount; position += 1) {
    let delay = Number(startDelay) + Number(step) * Number(position);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position + 1} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position + 1} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.formAllInput.addEventListener('submit', onSubmit);
