const body = document.querySelector("body")
const previousBtn = document.querySelector("#previousBtn")
previousBtn.setAttribute("href", `${document.location.origin}/the-wizard/phase-1/phase1.html`)
const form = document.querySelector('form')
form.setAttribute('action', `${document.location.origin}/the-wizard/phase-3/phase-3.html`)
form.addEventListener('submit', nextPageValidation)
const streetNumInput = document.querySelector("#streetNum")
const selectCity = document.querySelector("#selectCity")
const streetNameInput = document.querySelector("#streetName")
const streetNumSpan = document.querySelector("#numberSpan")
const citySpan = document.querySelector("#citySpan")
const streetSpan = document.querySelector("#streetSpan")

const localStorageData = JSON.parse(getPhase2LocalStorage())

//const regexStreet = /([A-Z]+)([-.]*)/


function loadInputData(){
    if(localStorageData){
        selectCity.value = localStorageData.city
        streetNameInput.value = localStorageData.street
        streetNumInput.value = localStorageData.streetNum
    }
}

const getData = async data => {
    const response = await fetch("json/cities.json")
    return response.json()
}

async function run() {
    data = await getData()
}

(async () => {
   await run()
   createCitiesOptions()
   loadInputData()
})();


function createCitiesOptions(){
    for(const city of data){
        const cityOption = document.createElement("option")
        cityOption.value = city.name
        cityOption.textContent = city.name
        selectCity.append(cityOption)
    }
}

function showError(span){
    span.classList.remove("hidden")
    span.classList.add("shown")
}

function removeError(span){
    span.classList.remove("shown")
    span.classList.add("hidden")
}

function streetNumberValidation(){
    if(streetNumInput.value < 0 || streetNumInput.value == ""){
        showError(streetNumSpan)
        return false
    } else {
        removeError(streetNumSpan)
        return true
    }
}

function cityValidation(){
    if(selectCity.value == "notSelected"){
        showError(citySpan)
        return false
    } else {
        removeError(citySpan)
        return true
    }
}

// function streetValidation(){
//     if(streetNameInput.value ==""){
//         showError(streetSpan)
//         return false
//     } else {
//         removeError(streetSpan)
//         return true
//     }
// }

function streetValidation(){
    if(!regexStreet.test(streetNameInput.value)){
        showError(streetSpan)
        return false
    } else {
        removeError(streetSpan)
        return true
    }
}


function nextPageValidation(e){
    const streetValid = streetValidation()
    const numberValid = streetNumberValidation()
    const cityValid = cityValidation()
    if(streetValid && numberValid && cityValid){
        savePhase2LocalStorage(selectCity, streetNameInput, streetNumInput)
        return
    } else {
        e.preventDefault()
    }
}