const continueBtn = document.querySelector('form')
const premiumWiz = document.querySelector('#premium')
const savedPremium = getPremium()
if(savedPremium){
    premiumWiz.checked = true
    continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/premium/premium.html`)
}
else{
    continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/phase-1/phase1.html`)
}

continueBtn.addEventListener('submit', nextPage)
const agree = document.querySelector('#agree')
premiumWiz.addEventListener('click', newPage)

const savedAgree = getEntranceData()
if(savedAgree){
    agree.checked = true
}
function newPage(){
    if(premiumWiz.checked){
        continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/premium/premium.html`)
        startNewWizard()
    }
    else {
        continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/phase-1/phase1.html`)
        startNewWizard()
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