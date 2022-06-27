fileUpload.onchange = evt => {
  const [file] = fileUpload.files;
  if (file) {
    preview.src = URL.createObjectURL(file);
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

  // <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
  //                 <label class="btn btn-outline-dark" for="btncheck1">Checkbox 1</label>
};

//creates 17 hobbies
(async () => {
  if (!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(await fetchData()));
  }
  const data = JSON.parse(localStorage.getItem('data'));
  setHobbies(data);
})();
