function savePhase2LocalStorage(selectCity, streetNameInput, streetNumInput){
    const data = {"city": selectCity.value, "street": streetNameInput.value, "streetNum": streetNumInput.value}
    localStorage.setItem("phase-2", JSON.stringify(data))
}

function getPhase2LocalStorage(){
    return localStorage.getItem("phase-2")
}