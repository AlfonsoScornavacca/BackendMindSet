/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const deleteButtons = document.querySelectorAll('.delete-button');
const cancelButton = document.getElementById('cancel-button');
const modal = document.getElementById('modal');
const confirmDeleteButton = document.getElementById('confirm-delete-button');
const tableContent = document.getElementById('table-content');

deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.toggle('hide');
  });
});

cancelButton.addEventListener('click', () => {
  modal.classList.toggle('hide');
});

const deleteSession = (interviewId) => {
  fetch(`https://basd-2021-david-mindset-dev.herokuapp.com/api/interviews/${interviewId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      modal.classList.add('hide');
      // Set table empty
      while (tableContent.hasChildNodes()) {
        tableContent.removeChild(tableContent.firstChild);
      }
      getSessions();
    })
    .catch((err) => {
      console.log(err);
    });
};

const openDeleteModal = (session) => {
  const dataModal = document.getElementById('data-modal');
  dataModal.textContent = `Psychologist: ${session.idPsychologists}. Candidate: ${session.idCandidate}. Date: ${session.date}.`;
  modal.classList.remove('hide');
  confirmDeleteButton.onclick = () => deleteSession(session._id);
};

const createDeleteButton = (session) => {
  const buttonDelete = document.createElement('button');
  buttonDelete.setAttribute('class', 'delete-button');
  const deleteLogo = document.createElement('span');
  deleteLogo.classList.add('material-icons-outlined');
  deleteLogo.textContent = 'clear';
  buttonDelete.innerHTML = deleteLogo.outerHTML;
  buttonDelete.addEventListener('click', () => {
    openDeleteModal(session);
  });
  return buttonDelete;
};

const openUpdateSession = (interview) => {
  window.location.href = `${window.location.origin}/public/views/interviews/formInterviews.html?_id=${interview._id}`;
};

const createUpdateButton = (session) => {
  const buttonUpdate = document.createElement('button');
  const updateLogo = document.createElement('span');
  updateLogo.classList.add('material-icons-outlined');
  updateLogo.textContent = 'edit';
  buttonUpdate.innerHTML = updateLogo.outerHTML;
  buttonUpdate.addEventListener('click', () => {
    openUpdateSession(session);
  });
  return buttonUpdate;
};

const getSessions = () => {
  fetch('https://basd-2021-david-mindset-dev.herokuapp.com/api/interviews')
    .then((response) => response.json())
    .then((response) => {
      const tableSession = document.getElementById('table-session');
      if (response.data.length === 0) {
        tableSession.classList.add('hide');
        const emptyTableMsg = document.getElementById('empty-table-msg');
        emptyTableMsg.classList.remove('hide');
      } else {
        tableSession.classList.remove('hide');
        response.data.forEach((interviews) => {
          const tr = document.createElement('tr');
          const tdCompany = document.createElement('td');
          const tdCandidate = document.createElement('td');
          const tdDate = document.createElement('td');
          const deleteIcon = createDeleteButton(interviews);
          const updateIcon = createUpdateButton(interviews);
          tdCompany.innerText = interviews.idCompany;
          tdCandidate.innerText = interviews.idCandidate;
          tdDate.innerText = interviews.date;
          tr.append(tdCompany, tdCandidate, tdDate, deleteIcon, updateIcon);
          tableContent.append(tr);
        });
      }
    });
};

window.onload = () => {
  getSessions();
};
