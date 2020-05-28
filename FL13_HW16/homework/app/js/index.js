const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

// Your code goes here

const ERROR_HTTP_STATUS = 400;

const createTopSection = () => {
    const h1 = document.createElement('h1');
    h1.textContent = 'Manage User App';
    const input1 = document.createElement('input');
    input1.placeholder = 'Name';
    input1.setAttribute('class', 'input_name');
    const input2 = document.createElement('input');
    input2.placeholder = 'Username';
    input2.setAttribute('class', 'input_username');
    const button = document.createElement('button');
    button.textContent = 'Add New User';
    const div = document.createElement('div');
    div.setAttribute('style', 'position:absolute');
    div.setAttribute('id', 'loading-message');
    div.textContent = 'Loading...'
    appContainer.append(h1, input1, input2, button, div);   
};
createTopSection();

const addNewUserButton = document.querySelector('button');
const loadingMessage = document.querySelector('#loading-message');

const createTable = (data) => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    for (let user of data) {
        const tr = document.createElement('tr');
        const tdID = document.createElement('td');
        tdID.setAttribute('class', 'id');
        tdID.textContent = user.id;
        const inputFullName = document.createElement('input');
        inputFullName.value = user.name;
        const inputUserName = document.createElement('input');
        inputUserName.value = user.username;
        const buttonUpdate = document.createElement('button');
        buttonUpdate.textContent = 'Update';
        buttonUpdate.setAttribute('onclick', 'editData()');
        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Delete';
        buttonDelete.setAttribute('onclick', 'deleteData()');
        tr.append(tdID, inputFullName, inputUserName, buttonUpdate, buttonDelete);
        tbody.append(tr)
    }
    table.append(tbody);
    loadingMessage.hidden = true;
    appContainer.nextElementSibling.replaceWith(table);
};

const sendHTTPRequest = (method, url, sendData) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';

        if (sendData) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        if (method === 'DELETE') {
            xhr.setRequestHeader('Authorization', 'admin');
        }
        
        xhr.onload = () => {
            if (xhr.status >= ERROR_HTTP_STATUS) {
                reject(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                resolve(xhr.response);
            }
        };
        
        xhr.onerror = () => {
            reject('Request failed');
        };

        xhr.send(JSON.stringify(sendData));
    });
    return promise;
};

const getData = () => {
    sendHTTPRequest('GET', baseUrl + '/users')
        .then((responseData) => {
            createTable(responseData);
        })
};

getData();

const addData = () => {
    event.target.disabled = true;
    sendHTTPRequest('POST', baseUrl + '/users', {
        name: document.querySelector('.input_name').value,
        username: document.querySelector('.input_username').value
        })
        .then(() => {
            addNewUserButton.disabled = false;
            document.querySelector('.input_username').value = null;
            document.querySelector('.input_name').value = null;
            getData();
        })
        .catch(err => {
            addNewUserButton.disabled = false;
            console.log(err);            
        });
};

addNewUserButton.addEventListener('click', addData);

const editData = () => {
    const userID = event.target.parentElement.firstElementChild.textContent;
    event.target.disabled = true;
    sendHTTPRequest('PUT', baseUrl + '/users/' + userID, {
        name: event.target.previousElementSibling.previousElementSibling.value,
        username: event.target.previousElementSibling.value
    })
    .then(() => {
        getData();
    })
    .catch(err => {
        console.log(err);
    });  
};

const deleteData = () => {
    const userID = event.target.parentElement.firstElementChild.textContent;
    event.target.disabled = true;
    sendHTTPRequest('DELETE', baseUrl + '/users/' + userID)
    .then(() => {        
        getData();
    })
    .catch(err => {
        console.log(err);
    });  
};