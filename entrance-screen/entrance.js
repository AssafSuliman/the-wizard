const continueBtn = document.querySelector('form')
continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/phase-1/phase1.html`) 
continueBtn.addEventListener('submit', nextPage)
const agree = document.querySelector('#agree')
const premiumWiz = document.querySelector('#premium')
premiumWiz.addEventListener('click', newPage)
const savedAgree = getEntranceData()
const savedPremium = getPremium()
if(savedAgree){
    agree.checked = true
}
if(savedPremium){
    premiumWiz.checked = true
}
function newPage(){
    if(premiumWiz.checked){
        continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/premium/premium.html`)
    }
    else {
        continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/phase-1/phase1.html`)
        removePremium()
    }
}
function nextPage (e) {
    if(agree.checked){
        saveEntranceData()
    if(premiumWiz.checked){
        savePremium()
    } 
    }
    else{
        e.preventDefault()
    }
}