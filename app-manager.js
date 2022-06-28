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
