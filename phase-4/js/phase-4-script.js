document.querySelector(
  '.prev-page'
).href = `${document.location.origin}/the-wizard/phase-3/phase-3.html`;

document.querySelector('button[type=submit]').addEventListener('click', e => {
  startNewWizard()
  const formAction = document.querySelector('form');
  formAction.setAttribute(
    'action',
    `${document.location.origin}/the-wizard/entrance-screen/entrance.html`
  );
});

const personalDetails= JSON.parse(localStorage.getItem('phase1Data'))
const adress= JSON.parse(localStorage.getItem("phase-2"))
const photo= JSON.parse(localStorage.getItem("img"))
const hobbies= JSON.parse(localStorage.getItem("checkedHobbies"))
const pPersonal= document.createElement('p')
console.log(adress)
pPersonal.append(`name: ${personalDetails.firstName} ${personalDetails.lastName}`)
const pEmail= document.createElement('p')
pEmail.append(`Email: ${personalDetails.email}`)
const pBirth= document.createElement('p')
pBirth.append(`Birth day: ${personalDetails.birthday}`)
const pAdress= document.createElement('p')
pAdress.append(`adress: ${adress.city} |street: ${adress.street} ${adress.streetNum}`)
const imgPhoto= document.createElement('img')
imgPhoto.src= photo
imgPhoto.alt= 'userphoto'
const pHobbies= document.createElement('p')
pHobbies.append(`hobbies: ${hobbies}`)
document.querySelector('.container').append(imgPhoto,pPersonal,pEmail,pBirth,pAdress,pHobbies)
