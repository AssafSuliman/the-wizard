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
    const fileInput = document.querySelector('#fileUpload');
    fileInput.removeAttribute('required');
    const hobbieInputs = document.querySelectorAll('input[type=checkbox]');
    for (const hobbieInput of hobbieInputs) {
      if (hobbies.includes(hobbieInput.nextSibling.innerHTML)) {
        hobbieInput.checked = true;
      }
    }
  }
};
function savePremium(){
  localStorage.setItem('premium', 'checked')
}
function getPremium(){
  return localStorage.getItem('premium')
}
function removePremium(){
  localStorage.removeItem('premium')
}
function saveEntranceData() {
  localStorage.setItem('agree', 'checked');
}
function getEntranceData() {
  return localStorage.getItem('agree');
}
function savePhase1Data(phase1Data) {
  localStorage.setItem('phase1Data', JSON.stringify(phase1Data));
}
function getPhase1Data() {
  return localStorage.getItem('phase1Data');
}
function savePhase2LocalStorage(selectCity, streetNameInput, streetNumInput) {
  const data = {
    city: selectCity.value,
    street: streetNameInput.value,
    streetNum: streetNumInput.value,
  };
  localStorage.setItem('phase-2', JSON.stringify(data));
}

function getPhase2LocalStorage() {
  return localStorage.getItem('phase-2');
}

function userPlace() {
  const mainDiv = document.createElement('div');
  mainDiv.classList = 'progress';
  const entrance = createProgressCircle('1', 'agreement');
  const span1 = createBarSpan();
  const firstPhase = createProgressCircle('2', 'phase 1');
  const span2 = createBarSpan();
  const adress = createProgressCircle('3', 'phase 2');
  const span3 = createBarSpan();
  const photo = createProgressCircle('4', 'phase 3');
  const span4 = createBarSpan();
  const final = createProgressCircle('5', 'summery');
  if (localStorage.getItem('agree')) {
    entrance.querySelector('.label').textContent = '✓';
    entrance.classList = 'circle done';
  }
  if (localStorage.getItem('phase1Data')) {
    firstPhase.querySelector('.label').textContent = '✓';
    firstPhase.classList = 'circle done';
  }
  if (localStorage.getItem('phase-2')) {
    adress.querySelector('.label').textContent = '✓';
    adress.classList = 'circle done';
  }
  if (localStorage.getItem('image')) {
    photo.querySelector('.label').textContent = '✓';
    photo.classList = 'circle done';
  }
  mainDiv.append(
    entrance,
    span1,
    firstPhase,
    span2,
    adress,
    span3,
    photo,
    span4,
    final
  );
  document.querySelector('header').append(mainDiv);
}
userPlace();
function createProgressCircle(number, name) {
  const circleDiv = document.createElement('div');
  circleDiv.classList = 'circle active';
  const label = document.createElement('span');
  label.classList = 'label';
  label.textContent = number;
  const title = document.createElement('span');
  title.classList = 'title';
  title.textContent = name;
  circleDiv.append(label, title);
  return circleDiv;
}
function createBarSpan() {
  const span = document.createElement('span');
  span.classList = 'bar';
  return span;
}

function canYouMoveToThisPage(previousPage, url) {
  if (!localStorage.getItem(previousPage)) {
    window.location.replace(`${document.location.origin}/the-wizard/${url}`)
  }
}


function startNewWizard() {
  localStorage.clear();
}
