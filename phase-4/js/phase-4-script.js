canYouMoveToThisPage('phase3', 'phase-3/phase-3.html');

document.querySelector(
  '.prev-page'
).href = `${document.location.origin}/the-wizard/phase-3/phase-3.html`;

document.querySelector('button[type=submit]').addEventListener('click', e => {
  startNewWizard();
  const formAction = document.querySelector('form');
  formAction.setAttribute(
    'action',
    `${document.location.origin}/the-wizard/entrance-screen/entrance.html`
  );
});
const carouselDiv = document.querySelector('#carouselExampleControls')
const carousel = document.querySelector('#carousel-inner')
const personalDetails = JSON.parse(localStorage.getItem('phase1Data'));
const adress = JSON.parse(localStorage.getItem('phase-2'));
const photos = JSON.parse(localStorage.getItem('imageArray'));
const hobbies = JSON.parse(localStorage.getItem('checkedHobbies'));
const pPersonal = document.createElement('p');
console.log(adress);
pPersonal.append(`${personalDetails.firstName} ${personalDetails.lastName}`);
pPersonal.style.fontSize = '3vw';
const pEmail = document.createElement('p');
pEmail.append(`Email: ${personalDetails.email}`);
const pBirth = document.createElement('p');
pBirth.append(`Birth day: ${personalDetails.birthday}`);
const pAdress = document.createElement('p');
pAdress.append(
  `address: ${adress.city} |street: ${adress.street} ${adress.streetNum}`
);

if(!getPremium()){
  carouselDiv.style.display = 'none'
  const imgPhoto = document.createElement('img');
  imgPhoto.src = photos[0];
  imgPhoto.alt = 'userphoto';
  imgPhoto.style.height = '5.5vw';
  imgPhoto.style.width = '5.5vw';
  document.querySelector('.container').append(imgPhoto);
}
else{
  const img1 = document.querySelector('#firstImg')
  img1.src = photos[0]
  for(let i = 1; i<photos.length; i++){
    const div = document.createElement('div')
    div.classList.add('carousel-item')
    const img = document.createElement('img')
    img.src = photos[i]
    img.classList.add('d-block')
    img.classList.add('w-100')
    img.alt = 'userphoto'
    div.append(img)
    carousel.append(div)
  }
}
const pHobbies = document.createElement('p');
pHobbies.append(`hobbies: ${hobbies}`);
const detailsDiv = document.createElement('div');
detailsDiv.append(pPersonal, pEmail, pBirth, pAdress, pHobbies);
document.querySelector('.container').append(detailsDiv);
document.querySelector('.container').style.display = 'flex';

