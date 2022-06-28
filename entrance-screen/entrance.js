
const continueBtn = document.querySelector('form')
continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/phase-1/phase1.html`) 
continueBtn.addEventListener('submit', nextPage)
const agree = document.querySelector('#agree')
console.log(document.location.origin)

function nextPage (e) {
    if(agree.checked){
        saveData()
    }
    else{
        e.preventDefault()
    }
}