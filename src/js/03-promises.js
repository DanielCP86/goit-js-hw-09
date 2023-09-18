const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  for (let i = 0; i < parseInt(form.elements.amount.value); i++) {
    createPromise(
      i + 1,
      i === 0
        ? parseInt(form.elements.delay.value)
        : parseInt(form.elements.delay.value) +
            i * parseInt(form.elements.step.value)
    )
      .then(val => {
        console.log(`✅ Fulfilled promise ${val.position} in ${val.delay}ms`);
      })
      .catch(error => {
        console.log(
          `❌ Rejected promise ${error.position} in ${error.delay}ms`
        );
      });
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
  });

  return pr;
}
