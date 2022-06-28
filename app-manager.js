
const setPhase3 = (imgUrl, hobbiesArr) => {
  localStorage.setItem('image', JSON.stringify(imgUrl));
  localStorage.setItem('checkedHobbies', JSON.stringify(hobbiesArr));
  localStorage.setItem('phase3', JSON.stringify('v'));
};

const getPhase3 = () => {
  if (localStorage.getItem('phase3')) {
    const hobbies = localStorage.getItem('checkedHobbies');
    const fileUpload = document.querySelector('#fileUpload').nextElementSibling;
    fileUpload.src = JSON.parse(localStorage.getItem('image'));
    const hobbieInputs = document.querySelectorAll('input[type=checkbox]');
    for (const hobbieInput of hobbieInputs) {
      if (hobbies.includes(hobbieInput.nextSibling.innerHTML)) {
        hobbieInput.checked = true;
      }
    }
  }
};

function saveEntranceData() {
    localStorage.setItem('agree', 'checked')
}
function getEntranceData() {
    return localStorage.getItem('agree')
}
function savePhase1Data(phase1Data) {
    localStorage.setItem('phase1Data', JSON.stringify(phase1Data))
}
function getPhase1Data() {
    return localStorage.getItem('phase1Data')
}
function savePhase2LocalStorage(selectCity, streetNameInput, streetNumInput) {
    const data = { "city": selectCity.value, "street": streetNameInput.value, "streetNum": streetNumInput.value }
    localStorage.setItem("phase-2", JSON.stringify(data))
}

function getPhase2LocalStorage() {
    return localStorage.getItem("phase-2")
}

function canYouMoveToThisPage() {
    if (!localStorage.getItem("agree")) {
        window.location.replace(`${document.location.origin}/the-wizard/entrance-screen/entrance.html`)
    } else if (!localStorage.getItem("phase1Data")) {
        window.location.replace(`${document.location.origin}/the-wizard/entrance-screen/entrance.html`)
    } else if (!localStorage.getItem("phase-2")) {
        window.location.replace(`${document.location.origin}/the-wizard/phase-1/phase1.html`)
    } else if (!localStorage.getItem("img")) {
        window.location.replace(`${document.location.origin}/the-wizard/phase-2/phase-2.html`)
    } else if (!localStorage.getItem("summary")) {
        window.location.replace(`${document.location.origin}/the-wizard/phase-3/phase-3.html`)
    }
}

function startNewWizard(){
    localStorage.clear()
}

