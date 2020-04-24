const loginCheckLength = 4;
const checkTime = 20;

const passwords = {
    'User': 'UserPass',
    'Admin': 'RootPass'
}

const login = prompt('What is your login?');

if (login === null || login === '') {
    alert('Canceled');
} else if (login.length < loginCheckLength) {
    alert('I don\'t know any users having name length less than 4 symbols');
} else if (login === 'User' || login === 'Admin') {
    const password = prompt('What is your pasword?');
    if (password === null || password === '') {
        alert('Canceled');
    } else if (passwords[login] === password) {
        const currentHours = new Date().getHours();
        currentHours < checkTime ? alert(`Good day, dear ${login}!`) : alert(`Good evening, dear ${login}!`)
    } else {
        alert('Wrong password');
    }
} else {
    alert('I don\'t know you');
}