const continueBtn = document.querySelector('form')
continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/phase-1/phase1.html`) 
continueBtn.addEventListener('submit', nextPage)
const agree = document.querySelector('#agree')
console.log(document.location.origin)
const savedAgree = getEntranceData()
if(savedAgree){
    agree.checked = true
}
function nextPage (e) {
    if(agree.checked){
        saveEntranceData()
    }
    else{
        e.preventDefault()
    }
}