function highlightMenuItem(menuItemID, highlighted) {
  const elem = document.getElementById(menuItemID);
  if (highlighted) {
    elem.style.fontSize = '1.2rem';
    elem.style.textDecoration = 'underline';
  } else {
    elem.style.fontSize = '0.938rem';
    elem.style.textDecoration = 'none';
  }
}

function showProjectDetail(project) {
  const container = document.createElement('div');
  container.id = 'project-detail-modal';
  container.classList.add('work-detail-wrapper');

  const wrapper = document.createElement('div');
  wrapper.classList.add('work-detail');

  // add icons-close  element
  const btnClose = document.createElement('div');
  btnClose.id = 'btn-close-detail';
  btnClose.classList.add('close-icon');
  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-xmark');
  btnClose.append(icon);
  btnClose.addEventListener('click', () => {
    document.getElementById('project-detail-modal').remove();
  });
  const row = document.createElement('div');
  row.classList.add('row');
  row.append(btnClose);
  wrapper.append(row);

  // add img
  const img = document.createElement('img');
  img.src = project.image;
  img.alt = 'Project Image';
  wrapper.append(img);
  // add title
  const title = document.createElement('h2');
  title.textContent = project.name;
  wrapper.append(title);

  // add list-tag
  const listTag = document.createElement('ul');
  listTag.classList.add('list-tag');
  for (let i = 0; i < project.technologies.length; i += 1) {
    const tag = document.createElement('li');
    tag.classList.add('tags');
    tag.textContent = project.technologies[i];
    listTag.append(tag);
  }
  wrapper.append(listTag);

  // add description
  const description = document.createElement('p');
  description.id = 'work-detail-description';
  description.textContent = project.description;
  wrapper.append(description);

  // add buttons
  const btnGroupe = document.createElement('div');
  btnGroupe.classList.add('btn-group');

  const btnLive = document.createElement('a');
  btnLive.href = project.link.live;
  const btnSource = document.createElement('a');
  btnSource.href = project.link.source;
  btnLive.classList.add('buttons');
  btnSource.classList.add('buttons');

  const btnLiveText = document.createElement('p');
  btnLiveText.textContent = 'See Live';
  btnLive.append(btnLiveText);
  let btnIcon = document.createElement('img');
  btnIcon.src = 'images/iconsLive.png';
  btnLive.append(btnIcon);

  const btnSourceText = document.createElement('p');
  btnSourceText.textContent = 'See Source';
  btnIcon = document.createElement('i');
  btnIcon.classList.add('fa-brands', 'fa-github');
  btnSource.append(btnSourceText);
  btnSource.append(btnIcon);

  btnGroupe.append(btnLive);
  btnGroupe.append(btnSource);
  wrapper.append(btnGroupe);

  container.append(wrapper);
  // show wrapper on body
  document.body.append(container);
}

/* toggle Menu button Event */
const menu = document.getElementById('mobile-nav');
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');
openMenu.addEventListener('click', () => {
  menu.style.transform = 'translateX(-100vw)';
});
closeMenu.addEventListener('click', () => {
  menu.style.transform = 'translateX(0)';
});

document.getElementById('works-mobile-menu-item').addEventListener('click', () => { closeMenu.click(); });
document.getElementById('about-me-mobile-menu-item').addEventListener('click', () => { closeMenu.click(); });
document.getElementById('footer-mobile-menu-item').addEventListener('click', () => { closeMenu.click(); });

/* highlight displayed section */
const workSection = document.getElementById('works');
const aboutMeSection = document.getElementById('about-me');
const footerSection = document.getElementById('footer');

workSection.addEventListener('mouseover', () => { highlightMenuItem('works-desktop-menu-item', true); });
aboutMeSection.addEventListener('mouseover', () => { highlightMenuItem('about-me-desktop-menu-item', true); });
footerSection.addEventListener('mouseover', () => { highlightMenuItem('footer-desktop-menu-item', true); });

workSection.addEventListener('mouseout', () => { highlightMenuItem('works-desktop-menu-item', false); });
aboutMeSection.addEventListener('mouseout', () => { highlightMenuItem('about-me-desktop-menu-item', false); });
footerSection.addEventListener('mouseout', () => { highlightMenuItem('footer-desktop-menu-item', false); });

  /* Add Containt */
  work.classList.add('work');
  img.src = project.image;
  img.alt = 'Project image';

  title.classList.add('section-title');
  title.innerHTML = project.name;

  listTag.classList.add('list-tag');
  for (let j = 0; j < project.technologies.length; j += 1) {
    const tag = document.createElement('li');
    tag.classList.add('tags');
    tag.textContent = project.technologies[j];
    listTag.append(tag);
  }

  btnShowDetail.classList.add('buttons');
  btnShowDetail.textContent = 'See Project';

  btnShowDetail.addEventListener('click', () => { showProjectDetail(project); });

  work.append(img);
  detailContainer.append(title);
  detailContainer.append(listTag);
  detailContainer.append(btnShowDetail);
  work.append(detailContainer);

  listWork.append(work);
;

/* Form Validation */
const form = document.getElementById('form');
const error = document.getElementById('error');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email');
  if (email.validity.typeMismatch
    || email.value.toLowerCase() !== email.value
    || !email.validity.valid) {
    error.textContent = 'Invalid email. Please ensure you have the correct email address. Thank you!';
    email.classList.add('errorOutline');
  } else {
    email.classList.remove('errorOutline');
    error.textContent = '';
    form.submit();
  }
});

/* Form Save and Load Local Storage */
window.addEventListener('beforeunload', () => {
  const savedData = { name: form.name.value, email: form.email.value, message: form.message.value };
  window.localStorage.setItem('formData', JSON.stringify(savedData));
});

window.addEventListener('load', () => {
  const savedData = JSON.parse(window.localStorage.getItem('formData'));
  form.name.value = savedData.name;
  form.email.value = savedData.email;
  form.message.value = savedData.message;
});
