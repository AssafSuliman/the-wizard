document.querySelector(
  '.prev-page'
).href = `${document.location.origin}/Wizard/the-wizard/phase-3/phase-3.html`;

document.querySelector('button[type=submit]').addEventListener('click', e => {
  const formAction = document.querySelector('form');
  formAction.setAttribute(
    'action',
    `${document.location.origin}/phase-1/phase1.html`
  );
});
