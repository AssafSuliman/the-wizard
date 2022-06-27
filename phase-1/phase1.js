const continueBtn = document.querySelector('form')
continueBtn.setAttribute('action', `${document.location.origin}/phase2/phase2`)
continueBtn.addEventListener('submit', nextPage)
const previousButton = document.querySelector('#previousButton')
previousButton.setAttribute('href', `${document.location.origin}/the-wizard/entrance-screen/entrance.html`)
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const nameValidMessage = document.querySelector('#nameMessage')
const email = document.querySelector('#email')
const emailValidMessage = document.querySelector('#emailMessage')
const birthday = document.getElementById('birth-day')
const dateValidMessage = document.querySelector('#dateMessage')
const today = new Date()

function fullNameValidation(){
    const specialLetters = /[!@#$%^ &*.]/g
    if(firstName.value.length < 2 || firstName.value.match(specialLetters)||
    lastName.value.length < 2 || lastName.value.match(specialLetters)){
        nameValidMessage.classList.remove('hidden')
        return false
    }
    else{
        nameValidMessage.classList.add('hidden')
        return true
    }
}

function emailValidation(){
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.value.match(validEmail)){
        emailValidMessage.classList.add('hidden')
        return true
    }
    else{
        emailValidMessage.classList.remove('hidden')
        return false
    }
}

function birthdayValidation(){
    let birthdayValues = birthday.value.split('-')
    const [month, day, year] = [today.getMonth(), today.getDate(), today.getFullYear()]
    if((year - Number(birthdayValues[0]) === 18 && (month+1) - Number(birthdayValues[1]) >= 0 &&
     day - Number(birthdayValues[0]) >= 0) || year - Number(birthdayValues[0]) > 18){
        dateValidMessage.classList.add('hidden')
        return true
    }
    else{
        dateValidMessage.classList.remove('hidden')
        return false
    }
}

function nextPage (e) {
    const nameValid = fullNameValidation()
    const emailValid = emailValidation()
    const birthdayValid = birthdayValidation()
    if(nameValid && emailValid && birthdayValid){
    }
    else{
        e.preventDefault()
    }
}