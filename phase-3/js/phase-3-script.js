canYouMoveToThisPage('phase-2', 'phase-2/phase-2.html');

let didImageChange = false;
let didCheckboxChange = false;
let onlyOneImage = false;
let addedResume = false;

let checked = localStorage.getItem('checkedHobbies') || [];
let imageUrl = [];
let resumeSrc = JSON.parse(localStorage.getItem('checkedHobbies')) || null;
let linkedin;

document.querySelector('.linkedin').addEventListener('change', e => {
  linkedin = e.target.value;
});

window.addEventListener('load', e => {
  if (localStorage.getItem('imageArray') && !localStorage.getItem('premium')) {
    onlyOneImage = true;
    showThatChecked();
  } else if (localStorage.getItem('imageArray')) {
    showThatChecked();
  }

  if (localStorage.getItem('resumeUrl')) {
    showThatResumeChecked();
  }
  getPhase3();
});

window.onload = function () {
  //Check File API support
  setLabel();
  if (window.File && window.FileList && window.FileReader) {
    let filesInput = document.getElementById('files');
    let filesInput2 = document.getElementById('files2');
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
        else {
          if (imageUrl.length === 0) showThatChecked();
        }
        didImageChange = true;
        let picReader = new FileReader();
        picReader.addEventListener('load', function (event) {
          let picFile = event.target;
          console.log(event.target);
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

      if (!localStorage.getItem('premium') && files[0].type.match('image')) {
        onlyOneImage = true;
      }
    });
    filesInput2.addEventListener('change', function (event) {
      let file = event.target.files[0];
      if (
        file.type.match('application/pdf') ||
        file.type.match(
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) ||
        file.type.match('doc')
      ) {
        let fileReader = new FileReader();
        console.dir(file);
        console.log(event.target.result);

        fileReader.addEventListener('load', function (event) {
          let fileSrc = event.target.result;
          resumeSrc = fileSrc;
        });
        fileReader.readAsDataURL(file);
        if (!addedResume && !localStorage.getItem('resumeUrl')) {
          showThatResumeChecked();
          addedResume = true;
        }
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
    if (addedResume) {
      setPhase3Resume(resumeSrc);
    } else {
      setPhase3Resume(JSON.parse(localStorage.getItem('imageArray')));
    }

    if (!isLinkedinProfileUrl(linkedin)) {
      const span = document.createElement('span');
      span.appendChild(document.createTextNode('*Not a valid Linkedin URL'));
      document.querySelector('.linkedin-section').appendChild(span);
      e.preventDefault();
    } else {
      const formAction = document.querySelector('form');
      formAction.setAttribute(
        'action',
        `${document.location.origin}/the-wizard/phase-4/phase-4.html`
      );
    }
  }
});

const showThatResumeChecked = () => {
  const resumeDiv = document.querySelector('.resume-container');
  const resultOutput = document.querySelector('#result2');
  const checkedFile = document.createElement('img');
  checkedFile.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABJ0lEQVRIie3UPU7DQBCG4XfBdpOWJOYOoUI0kSzxI9IEcZo0zgGgINcJRYRFEEeAghsQCCdY2zKFnQicmPXPOgXyV+5q/Hh2pIEmTWqK2AXSHQ06wpT3gFzczvsAeztCPeAYMFbnRnZJ9diu0wb5APSAtzDgenVX21PH6L4HHCXo2fJuvqgVVqG1wHlQ7XBeVCtcBNUGF0W1wGXQynBZFFILxHZPH4FW5FtXH5PZ51+F3dGgA9IjXg6vkW9dLBU1P5NemS3gRJjSiz+cjSZrcI2qflQBh0PgBegJUz4djJ3DdIHtOm1h/lqDl0VR2DLj9NwCEZ5/3Ty/b7srMlMlnIUbEYEuNBOGzTkmx6VnmhuGjc5BQ6e5YFh3PgWIfGtYtdMmTf5vvgHrHLCicxjUEQAAAABJRU5ErkJggg==';
  resumeDiv.insertBefore(checkedFile, resultOutput);
};

const showThatChecked = () => {
  const imageDiv = document.querySelector('.image-container');
  const resultOutput = document.querySelector('#result');
  const checkedImg = document.createElement('img');
  checkedImg.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABJ0lEQVRIie3UPU7DQBCG4XfBdpOWJOYOoUI0kSzxI9IEcZo0zgGgINcJRYRFEEeAghsQCCdY2zKFnQicmPXPOgXyV+5q/Hh2pIEmTWqK2AXSHQ06wpT3gFzczvsAeztCPeAYMFbnRnZJ9diu0wb5APSAtzDgenVX21PH6L4HHCXo2fJuvqgVVqG1wHlQ7XBeVCtcBNUGF0W1wGXQynBZFFILxHZPH4FW5FtXH5PZ51+F3dGgA9IjXg6vkW9dLBU1P5NemS3gRJjSiz+cjSZrcI2qflQBh0PgBegJUz4djJ3DdIHtOm1h/lqDl0VR2DLj9NwCEZ5/3Ty/b7srMlMlnIUbEYEuNBOGzTkmx6VnmhuGjc5BQ6e5YFh3PgWIfGtYtdMmTf5vvgHrHLCicxjUEQAAAABJRU5ErkJggg==';
  imageDiv.insertBefore(checkedImg, resultOutput);
};

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

const isRegexExactMatch = (value, regexp) => {
  const res = value.match(regexp);
  return res && res[0] && res[0] === res.input;
};

const isLinkedinProfileUrl = value => {
  const linkedInProfileURLRegExp =
    '(https?:\\/\\/(www.)?linkedin.com\\/(mwlite\\/|m\\/)?in\\/[a-zA-Z0-9_.-]+\\/?)';
  return !!isRegexExactMatch(value, linkedInProfileURLRegExp);
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
