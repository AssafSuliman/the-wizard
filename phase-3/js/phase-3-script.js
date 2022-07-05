canYouMoveToThisPage('phase-2', 'phase-2/phase-2.html');

let didImageChange = false;
let didCheckboxChange = false;
let onlyOneImage = false;

let checked = localStorage.getItem('checkedHobbies') || [];
let imageUrl = [];

window.addEventListener('load', e => {
  if (localStorage.getItem('imageArray') && !localStorage.getItem('premium')) {
    onlyOneImage = true;
  }
  getPhase3();
});

window.onload = function () {
  //Check File API support
  setLabel();
  if (window.File && window.FileList && window.FileReader) {
    let filesInput = document.getElementById('files');
    filesInput.addEventListener('change', function (event) {
      if (onlyOneImage) {
        return;
      }
      let files = event.target.files; //FileList object
      let output = document.getElementById('result');
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        //Only pics
        if (!file.type.match('image')) continue;
        didImageChange = true;
        let picReader = new FileReader();
        picReader.addEventListener('load', function (event) {
          let picFile = event.target;
          let div = document.createElement('div');
          div.innerHTML =
            "<img class='thumbnail' src='" +
            picFile.result +
            "'" +
            "title='" +
            picFile.name +
            "'/>";
          output.insertBefore(div, null);
          imageUrl.push(picFile.result);
        });
        //Read the image
        picReader.readAsDataURL(file);
      }
      if (!localStorage.getItem('premium')) {
        onlyOneImage = true;
      }
    });
  } else {
    console.log('Your browser does not support File API');
  }
};

document.querySelector(
  '.prev-page'
).href = `${document.location.origin}/the-wizard/phase-2/phase-2.html`;

document.querySelector('button[type=submit]').addEventListener('click', e => {
  if (!checked.length) {
    e.preventDefault();
  } else {
    if (didCheckboxChange && didImageChange) {
      setPhase3(imageUrl, checked);
    } else if (didCheckboxChange && !didImageChange) {
      setPhase3(JSON.parse(localStorage.getItem('imageArray')), checked);
    } else if (!didCheckboxChange && didImageChange) {
      setPhase3(imageUrl, JSON.parse(localStorage.getItem('checkedHobbies')));
    } else {
      setPhase3(
        JSON.parse(localStorage.getItem('imageArray')),
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

// fileUpload.onchange = evt => {
//   didImageChange = true;
//   const [file] = fileUpload.files;
//   console.log(file);
//   if (file) {
//     preview.src = URL.createObjectURL(file);
//     imageUrl = '1-1024x698.png';
//   }
// };

const fetchData = async () => {
  const response = await fetch('json/hobbies.json');
  const jsonData = await response.json();
  return jsonData;
};
const setLabel = () => {
  const imgUploadLabel = document.querySelector('.custom-file-upload');
  if (localStorage.getItem('premium')) {
    imgUploadLabel.appendChild(document.createTextNode('Upload Images'));
  } else {
    imgUploadLabel.appendChild(document.createTextNode('Upload Image'));
  }
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
    label.classList.add('btn', 'btn-outline-dark', 'background-white');
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
