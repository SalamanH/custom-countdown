// first form
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');



let countdownTitle = '';
let countdownDate ='';
let countdownValue = Date;
let countdownActive;
let savedCountdown; 

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
 



// Set Date Input Min with TOdays Date
const today = new Date().toISOString().split('T')[0];
// const today = new Date();
// console.log(today.getFullYear(), today.getMonth()+1, today.getDate());
// const dateString = `${today.getFullYear()}` +-+ `${((today.getMonth()+1 < 10) ? 0 + today.getMonth()+1 : today.getMonth()+1 )}`  +-+ `${((today.getDay() < 10) ? 0 + today.getDay() : today.getDay() )}`;

dateEl.setAttribute('min', today);

// Populate Countdown / populate UI
function updateDom()
{
    countdownActive = setInterval(()=>{
        const now = new Date().getTime();
        const distance = countdownValue - now;
    

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance%day) / hour);
        const minutes = Math.floor((distance %hour) / minute);
        const seconds = Math.floor((distance%minute) / second);

        // Hide Input
        inputContainer.hidden = true;

        // If the countddown has ended, show complete

        if(distance < 0)
        {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }else{
            // else shoe the countdown in progress

            // Populating Countdown

            countdownElTitle.textContent = countdownTitle;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;

            // show countdown
            countdownEl.hidden = false;
        }

    }, second);
    
}

// Take Values from Form Input
function updateCountdown(e)
{

    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = 
    {
        title: countdownTitle,
        date: countdownDate,

    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    

    // Check for valid Date
    if(countdownDate === '')
    {
        alert('Please Select a date for the countdown')
    }
    else
    {
        // Get number version of current Date, upodate DOM

        countdownValue = new Date(countdownDate).getTime();


        updateDom();
    }
    
    
}
// Reset All Values
function reset()
{
    // Hide Countdowns, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    
    // stop countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';

    localStorage.removeItem('countdown');
}

function restorePreviousCountdown()
{
    // get countdown from localstorage if available
    if(localStorage.getItem('countdown'))
    {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();


    }
}
// Event Listener
countdownBtn.addEventListener('click', reset);
countdownForm.addEventListener('submit', updateCountdown);
completeBtn.addEventListener('click', reset);

// on load, check locatl storage
restorePreviousCountdown();