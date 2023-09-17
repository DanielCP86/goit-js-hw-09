const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  for (let i = 0; i <= Integer.parseInt(form.elements.amount.value); i++) {
    let p = createPromise(
      i + 1,
      i === 0
        ? Integer.parseInt(form.elements.delay.value)
        : Integer.parseInt(form.elements.step.value)
    );
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const pr = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(val => {
      console.log(`Fulfilled promise ${val.position} in ${val.delay}ms`);
    })
    .catch(error => {
      console.log(`Rejected promise ${error.position} in ${error.delay}ms`);
    });

  return pr;
}
