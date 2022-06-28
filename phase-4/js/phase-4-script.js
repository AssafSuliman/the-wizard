document.querySelector(
  '.prev-page'
).href = `${document.location.origin}/the-wizard/phase-3/phase-3.html`;

document.querySelector('button[type=submit]').addEventListener('click', e => {
  const formAction = document.querySelector('form');
  formAction.setAttribute(
    'action',
    `${document.location.origin}/the-wizard/entrance-screen/entrance.html`
  );
});
