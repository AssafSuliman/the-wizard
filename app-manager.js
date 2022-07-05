const setPhase3 = (imageArray, hobbiesArr) => {
  localStorage.setItem('imageArray', JSON.stringify(imageArray));
  localStorage.setItem('checkedHobbies', JSON.stringify(hobbiesArr));
  localStorage.setItem('phase3', JSON.stringify('v'));
};

const getPhase3 = () => {
  if (localStorage.getItem('phase3')) {
    const hobbies = localStorage.getItem('checkedHobbies');
    // const fileUpload = document.querySelector('#fileUpload').nextElementSibling;
    const imageArray = JSON.parse(localStorage.getItem('imageArray'));
    setSelectedImages(imageArray);
    const fileInput = document.querySelector('#files');
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

const setSelectedImages = imageArray => {
  const output = document.getElementById('result');
  for (const image of imageArray) {
    const div = document.createElement('div');
    div.innerHTML = "<img class='thumbnail' src='" + image + "'" + '/>';
    output.insertBefore(div, null);
  }
};
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
  const firstPhase = createProgressCircle('2', 'information');
  const span2 = createBarSpan();
  const adress = createProgressCircle('3', 'adress');
  const span3 = createBarSpan();
  const photo = createProgressCircle('4', 'photo&hobbies');
  const span4 = createBarSpan();
  const final = createProgressCircle('5', 'summery');
  let premium;
  if (localStorage.getItem('premium')) {
    premium = createProgressCircle('2', 'premium');
    firstPhase.querySelector('.label').textContent = '3'
    adress.querySelector('.label').textContent = '4'
    photo.querySelector('.label').textContent = '5'
    final.querySelector('.label').textContent = '6'
  }
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
  if (localStorage.getItem('imageArray')) {
    photo.querySelector('.label').textContent = '✓';
    photo.classList = 'circle done';
  }
  if(localStorage.getItem('DecidedPrimium')){
    premium.querySelector('.label').textContent = '✓';
    premium.classList = 'circle done';
  }
  if (localStorage.getItem('premium')) {
    const span5 = createBarSpan();
    mainDiv.append(
      entrance,
      span1,
      premium,
      span5,
      firstPhase,
      span2,
      adress,
      span3,
      photo,
      span4,
      final
      );
    } else {
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
      }
      colorPlace(entrance, firstPhase, adress, photo, final,premium);
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
function colorPlace(entrance, firstPhase, adress, photo, final,premium) {
  if (document.location.href.includes('entrance')) {
    entrance.querySelector('.title').style.color = 'blue';
    entrance.querySelector('.title').style.backgroundColor = 'lightgreen';
  } else if (document.location.href.includes('phase-1')) {
    firstPhase.querySelector('.title').style.color = 'blue';
    firstPhase.querySelector('.title').style.backgroundColor = 'lightgreen';
  } else if (document.location.href.includes('phase-2')) {
    adress.querySelector('.title').style.color = 'blue';
    adress.querySelector('.title').style.backgroundColor = 'lightgreen';
  } else if (document.location.href.includes('phase-3')) {
    photo.querySelector('.title').style.color = 'blue';
    photo.querySelector('.title').style.backgroundColor = 'lightgreen';
  } else if (document.location.href.includes('phase-4')) {
    final.querySelector('.title').style.color = 'blue';
    final.querySelector('.title').style.backgroundColor = 'lightgreen';
  }
  else if (document.location.href.includes('premium')) {
    premium.querySelector('.title').style.color = 'blue';
    premium.querySelector('.title').style.backgroundColor = 'lightgreen';
  }
}
function createBarSpan() {
  const span = document.createElement('span');
  span.classList = 'bar';
  return span;
}

function canYouMoveToThisPage(previousPage, url) {
  if (!localStorage.getItem(previousPage)) {
    window.location.replace(`${document.location.origin}/the-wizard/${url}`);
  }
}

function startNewWizard() {
  localStorage.removeItem("checkedHobbies")
  localStorage.removeItem("agree")
  localStorage.removeItem("phase-2")
  localStorage.removeItem("phase3")
  localStorage.removeItem("DecidedPrimium")
  localStorage.removeItem("premium")
  localStorage.removeItem("phase1Data")
  localStorage.removeItem("phase1Data")
  localStorage.removeItem("data")
  localStorage.removeItem("imageArray")
}
