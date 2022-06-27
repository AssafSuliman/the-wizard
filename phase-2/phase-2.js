const body = document.querySelector("body")

const previousBtn = document.querySelector("#previousBtn")
previousBtn.setAttribute("href", `${document.location.origin}/the-wizard/phase-1/phase1.html`)

const continueBtn = document.querySelector("#continueBtn").addEventListener("click", nextPageValidation)


const streetNumInput = document.querySelector("#streetNum")
const selectCity = document.querySelector("#selectCity")
const streetNameInput = document.querySelector("#streetName")
const streetNumSpan = document.querySelector("#numberSpan")
const citySpan = document.querySelector("#citySpan")
const streetSpan = document.querySelector("#streetSpan")

let data


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
    } else {
        removeError(streetNumSpan)
    }
}

function cityValidation(){
    if(selectCity.value == "notSelected"){
        showError(citySpan)
    } else {
        removeError(citySpan)
    }
}

function streetValidation(){
    if(streetNameInput.value == ""){
        showError(streetSpan)
    } else {
        removeError(streetSpan)
    }
}

function nextPageValidation(){
    streetNumberValidation()
    cityValidation()
    streetValidation()
}




