import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('.value[data-days]');
const hoursSpan = document.querySelector('.value[data-hours]');
const minutesSpan = document.querySelector('.value[data-minutes]');
const secondsSpan = document.querySelector('.value[data-seconds]');

startButton.disabled = true;

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
      return;
    }
    startButton.disabled = false;
  },
});

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  fp._input.setAttribute('disabled', 'disabled');
  const timerId = setInterval(() => {
    const ms = fp.selectedDates[0] - new Date();
    const obj = convertMs(ms);

    if (ms <= 0) {
      clearInterval(timerId);
      startButton.disabled = false;
      fp._input.removeAttribute('disabled');
    } else {
      daysSpan.textContent = addLeadingZero(obj.days);
      hoursSpan.textContent = addLeadingZero(obj.hours);
      minutesSpan.textContent = addLeadingZero(obj.minutes);
      secondsSpan.textContent = addLeadingZero(obj.seconds);
    }
  }, 1000);
});
