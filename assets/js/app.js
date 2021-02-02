// DOM elements
const messageFormSubmitBtn = document.querySelector('#submitMessageFormBtn');
const errorsDiv            = document.querySelector('#errors');
const loader               = document.querySelector('.loader');
const fullnameInput        = document.querySelector('#fullname');
const birthdateInput       = document.querySelector('#birthdate');
const emailInput           = document.querySelector('#email');
const messageInput         = document.querySelector('#message');

// Pagination
let currentPage = 1;
let messagesPerPage = 5;

// State
let errorsBag = [];
let messagesBag = [];

//  form submit
messageFormSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    setLoading(true);
    resetErrors();

    const fullname  = fullnameInput.value;
    const birthdate = birthdateInput.value;
    const email     = emailInput.value;
    let message   = messageInput.value;

    validateFullname(fullname);
    validateBirthdate(birthdate);
    email !== "" && validateEmail(email);
    message = validateMessage(message);

    
    if (errorsBag.length > 0) {
        setLoading(false);
        return displayErrors();
    }

    let formattedMessage = {
        'fullname': fullname,
        'birthdate': birthdate,
        'email': email,
        'message': message,
    }

    createMessage(formattedMessage);

    // reset inputs
    fullnameInput.value = '';
    birthdateInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
});

async function createMessage(message) {
    await fetch('http://localhost:8000/api/messages.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(message) 
    })
    .then(() => fetchMessages())
    .catch(err => errorsBag.push('Serverio klaida. Pabandykite vėliau.'));
    setLoading(false);
}

async function fetchMessages() {
    await fetch('http://localhost:8000/api/messages.php', {
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res => res.json())
    .then(data => {
        messagesBag = data;
        if(messagesBag.length > 0) {
            changePage(1);
        }
    })
    .catch(err => errorsBag.push('Serverio klaida. Pabandykite vėliau.'));
}

//  pagination
function prevPage()
{
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage()
{
    if (currentPage < numOfPages()) {
        currentPage++;
        changePage(currentPage);
    }
}

function changePage(page) {
    // DOM Elements
    const messagesDiv = document.querySelector('#messages');
    const pageSpan = document.getElementById("page");
    const btnNext = document.getElementById("btn_next");
    const btnPrev = document.getElementById("btn_prev");

    pageSpan.innerHTML = `${page}/${numOfPages()}`;
    messagesDiv.innerHTML = '';

    
    for (let i = (page-1) * messagesPerPage; i < (page * messagesPerPage) && i < messagesBag.length; i++) {
        const { email, fullname, birthdate, message, created_at} = messagesBag[i];
        const li = document.createElement('li');
        li.classList.add('message');

        li.innerHTML = `
            <div class="message__header">
                <div>
                    ${email !== '' ? `<a href="mailto:${email}">${fullname}</a>,` : `<a href="#">${fullname}</a>,`}
                    <span>${calculateAge(birthdate)} m.</span>
                </div>
                <span class="message__date">${created_at}</span> 
            </div>
            <p>${message}</p>
        `;

        messagesDiv.appendChild(li);
    }

    if (page == 1) {
        btnPrev.style.visibility = "hidden";
    } else {
        btnPrev.style.visibility = "visible";
    }

    if (page == numOfPages()) {
        btnNext.style.visibility = "hidden";
    } else {
        btnNext.style.visibility = "visible";
    }
}

function numOfPages() {
    return Math.ceil(messagesBag.length / messagesPerPage);
}

// Helpers
function setLoading(isLoading) {
    if(isLoading) {
        fullnameInput.disabled = true;
        birthdateInput.disabled = true;
        emailInput.disabled = true;
        messageInput.disabled = true;

        fullnameInput.style.background = '#d3d3d3';
        birthdateInput.style.background = '#d3d3d3';
        emailInput.style.background = '#d3d3d3';
        messageInput.style.background = '#d3d3d3';

        loader.classList.remove('hidden');
    } else {
        fullnameInput.disabled = false;
        birthdateInput.disabled = false;
        emailInput.disabled = false;
        messageInput.disabled = false;

        fullnameInput.style.background = '#ffffff';
        birthdateInput.style.background = '#ffffff';
        emailInput.style.background = '#ffffff';
        messageInput.style.background = '#ffffff';
        loader.classList.add('hidden');
    }
}

function calculateAge(date) {
    const birthdate = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birthdate.getFullYear();
    let monthDifference = today.getMonth() - birthdate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) age--;
    
    return age;
}

// Validators
function validateFullname(fullname) {
    const regex = /^([a-zA-Z]{3,})+ ([a-zA-Z]{3,})+$/;
    const parentDiv = fullnameInput.parentNode;

    if (!regex.test(fullname)) {
        errorsBag.push('Netinkamas vardo ir pavardės formatas. Pvz. Petras Petraitis');
        parentDiv.classList.add('err');
    } else {
        parentDiv.classList.remove('err');
    }
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const parentDiv = emailInput.parentNode;

    if (!regex.test(email)) {
        errorsBag.push('Netinkamas el. pašto adresas');
        parentDiv.classList.add('err');
    } else {
        parentDiv.classList.remove('err');
    }
}

function validateBirthdate(date) {
    const birthdate = new Date(date);
    const year = new Date().getFullYear() - 2; //  this year - 2
    const month = new Date().getMonth();
    const day = new Date().getDay();

    const currentDate = new Date(`${year}-${month}-${day}`)
    const parentDiv = birthdateInput.parentNode;
        
    if (birthdate > currentDate || date === "") {
        errorsBag.push('Netinkama gimimo data.');
        parentDiv.classList.add('err');
    } else {
        parentDiv.classList.remove('err');
    }
}

function validateMessage(message) {
    let strippedMessage = message.replace(/(<([^>]+)>)/gi, "");
    const parentDiv = messageInput.parentNode;

    if (strippedMessage.length < 8) {
        errorsBag.push('Žinutė negali buti trumpesnė nei 8 simboliai');
        parentDiv.classList.add('err');
    } else {
        parentDiv.classList.remove('err');
    }

    return strippedMessage;
}

// Handle errors
function displayErrors() {
    errorsBag.map(err => {
        const li = document.createElement('li');
        li.textContent = err;
        errorsDiv.appendChild(li);
    });
}

function resetErrors() {
    errorsBag = [];
    errorsDiv.innerHTML = '';
}

//  On page load fetch all messages
window.onload = fetchMessages();