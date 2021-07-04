const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')



const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')


const completeEl = document.getElementById('complete')
const completeInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')






let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
let savedCountdown


const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24



// set date input min with todays date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)



// populate countdown / complete ui
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now


        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)

        // hide input
        inputContainer.hidden = true

        // if coundown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true
            clearInterval(countdownActive)
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false
        } else {
            // else, show coundown
            // populating countdown
            countdownElTitle.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeEl.hidden = true
            countdownEl.hidden = false
        }
    }, 1000);


}




// take values from form input
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }

    localStorage.setItem('countdown', JSON.stringify(savedCountdown))


    if (!countdownDate) {
        alert('Please select the Date')
        return
    }

    // get number version of current date, updateDOM
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
}

// reset all values
function reset() {
    // hide countdown and  show input
    countdownEl.hidden = true
    completeEl.hidden = true
    inputContainer.hidden = false
    // stop countdown
    clearInterval(countdownActive)
    // reset values 
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')
}


function restorePreviousCountdown() {
    // get coutndown form local if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()

        updateDOM()
    }
}


// event listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset);

// on load, check local storage
restorePreviousCountdown()