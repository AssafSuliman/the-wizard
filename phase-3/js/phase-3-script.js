canYouMoveToThisPage('phase-2', 'phase-2/phase-2.html')

let didImageChange = false;
let didCheckboxChange = false;

let checked = localStorage.getItem('checkedHobbies') || [];
let imageUrl;

window.addEventListener('load', e => {
  getPhase3();
});

document.querySelector(
  '.prev-page'
).href = `${document.location.origin}/the-wizard/phase-2/phase-2.html`;

document.querySelector('button[type=submit]').addEventListener('click', e => {
  if (!checked.length) {
    e.preventDefault();
  } else {
    console.log(document.querySelector('#preview').src);
    if (didCheckboxChange && didImageChange) {
      setPhase3(imageUrl, checked);
    } else if (didCheckboxChange && !didImageChange) {
      setPhase3(JSON.parse(localStorage.getItem('image')), checked);
    } else if (!didCheckboxChange && didImageChange) {
      setPhase3(imageUrl, JSON.parse(localStorage.getItem('checkedHobbies')));
    } else {
      setPhase3(
        JSON.parse(localStorage.getItem('image')),
        JSON.parse(localStorage.getItem('checkedHobbies'))
      );
    }

    const formAction = document.querySelector('form');
    formAction.setAttribute(
      'action',
      `${document.location.origin}/the-wizard/phase-4/phase-4.html`
    );
  }
});

// document.querySelector('#fileUpload').addEventListener('change', e => {

//   // localStorage.setItem('image', JSON.stringify(imageUrl));
// });

fileUpload.onchange = evt => {
  didImageChange = true;
  const [file] = fileUpload.files;
  console.log(file);
  if (file) {
    preview.src = URL.createObjectURL(file);
    imageUrl = '1-1024x698.png';
  }
};

const fetchData = async () => {
  const response = await fetch('json/hobbies.json');
  const jsonData = await response.json();
  return jsonData;
};

const setHobbies = hobbies => {
  const checkBoxDiv = document.querySelector('.btn-group');
  let counter = 1;
  for (const hobbie of hobbies) {
    let checkBox = document.createElement('input');
    let label = document.createElement('label');
    checkBox.type = 'checkbox';
    checkBox.className = 'btn-check';
    checkBox.id = `btncheck${counter}`;
    checkBox.setAttribute('autocomplete', 'off');
    label.classList.add('btn', 'btn-outline-dark');
    label.setAttribute('for', `btncheck${counter}`);
    label.appendChild(document.createTextNode(hobbie.hobbie));
    checkBoxDiv.appendChild(checkBox);
    checkBoxDiv.appendChild(label);
    counter++;
  }
};

const createCheckboxEvents = checkBoxes => {
  checkBoxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      didCheckboxChange = true;
      checked = Array.from(checkBoxes) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map(i => document.querySelector(`label[for=${i.id}]`).innerHTML); // Use Array.map to extract only the checkbox values from the array of objects.

      // localStorage.setItem('checkedHobbies', JSON.stringify(checked));
    });
  });
};

//creates 17 hobbies
(async () => {
  if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(await fetchData()));
  }
  const data = JSON.parse(localStorage.getItem('data'));
  setHobbies(data);
  const checkBoxes = document.querySelectorAll(
    'input[type=checkbox][class=btn-check]'
  );
  createCheckboxEvents(checkBoxes);
})();
