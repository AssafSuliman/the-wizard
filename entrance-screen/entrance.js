const continueBtn = document.querySelector('form')
continueBtn.setAttribute('action', `${document.location.origin}/the-wizard/phase-1/phase1.html`) 
continueBtn.addEventListener('submit', nextPage)
console.log(document.location.origin)

function nextPage (e) {
}