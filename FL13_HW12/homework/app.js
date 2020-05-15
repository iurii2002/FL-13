const root = document.getElementById('root');

const SLICE_ID = 3;
const SAVE_TIME_OUT = 300;
const GO_BACK = -2;


function createLeftPartOfAPage() {
    const section = document.createElement('section');
    section.setAttribute('id', 'Book-list');
    const sectionHead = document.createElement('h2');
    sectionHead.textContent = 'Book List';
    const button = document.createElement('button');
    button.setAttribute('id', 'add-button');
    button.textContent = 'Add book';
    section.append(sectionHead, button);     
    return section;
}

function createRightPartOfAPage() {
    const section = document.createElement('section');
    section.setAttribute('id', 'Book-information');
    const sectionHead = document.createElement('h2');
    sectionHead.textContent = 'Book Information';
    section.append(sectionHead);
    return section;
}

root.append(createLeftPartOfAPage(), createRightPartOfAPage());

function addBookToList() {
    const ul = document.createElement('ul');

    for (let i = 1; i <= window.localStorage.length; i += 1) {
        const li = document.createElement('li');
        li.setAttribute('id', i);
        const span = document.createElement('span');
        span.textContent = JSON.parse(localStorage.getItem(i))['Book name'];
        const button = document.createElement('button');
        button.textContent = 'Edit book'
        li.append(span, button);
        ul.append(li);
    }
    return ul;
}

document.querySelector('h2').after(addBookToList());

const RIGTH_PAGE_OPTIONS = {
    'edit': rightEditPage,
    'add': rightAddPage,
    'preview': rightPreviewPage
}

const bookList = document.querySelectorAll('span');
const editButton = document.querySelectorAll('li > button');
const addButton = document.querySelector('#add-button');
const rigthPageFrame = document.querySelector('#Book-information');
const bookInfos = ['Book name', 'Author', 'Plot'];
const bookAdd = [...bookInfos, 'ImageURL'];


function updateRightPartOfThePage() {
    const rightPage = RIGTH_PAGE_OPTIONS[location.hash.slice(1)];
    let id = 0;
    if (window.location.href.match(/id=\d+/)) {
        id = window.location.href.match(/id=\d+/)[0].slice(SLICE_ID);
    }
    rightPage(id);
}

function rightEditPage(id) {
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-col');
    for (let info of bookAdd) {
        const p = document.createElement('p');
        p.textContent = [info];
        const input = document.createElement('input');
        input.value = JSON.parse(localStorage.getItem(id))[info];
        input.setAttribute('id', [info]);
        input.required = true;
        div.append(p, input);
    }
    const button1 = document.createElement('button');
    button1.setAttribute('id', 'save');
    button1.setAttribute('onclick', 'addNewBook()'); 
    button1.textContent = 'Save';
    const button2 = document.createElement('button');
    button2.setAttribute('id', 'cancel');
    button2.setAttribute('onclick', 'cancelInput()'); //change
    button2.textContent = 'Cancel';
    div.append(button1, button2);
    if (rigthPageFrame.childElementCount > 1) {
        rigthPageFrame.children[1].replaceWith(div);
    } else {
        rigthPageFrame.append(div);
    }    
}

function rightAddPage() {
    const div = document.createElement('div');
    div.setAttribute('class', 'flex-col');
    for (let info of bookAdd) {
        const p = document.createElement('p');
        p.textContent = [info];
        const input = document.createElement('input');
        input.setAttribute('id', [info]);
        input.required = true;
        div.append(p, input);
    }

    const button1 = document.createElement('button');
    button1.setAttribute('id', 'save');
    button1.setAttribute('onclick', 'addNewBook()')
    button1.textContent = 'Save';
    const button2 = document.createElement('button');
    button2.setAttribute('id', 'cancel');
    button2.setAttribute('onclick', 'cancelInput()')
    button2.textContent = 'Cancel';
    div.append(button1, button2);
    if (rigthPageFrame.childElementCount > 1) {
        rigthPageFrame.children[1].replaceWith(div);
    } else {
        rigthPageFrame.append(div);
    }
}

function rightPreviewPage(id) {
    const div = document.createElement('div');
    div.setAttribute('class', 'flex');
    const img = document.createElement('img');
    const art = document.createElement('article');
    for (let info of bookInfos) {
        const p = document.createElement('p');
        p.setAttribute('id', [info]);
        const b = document.createElement('b');
        b.textContent = [info];
        p.append(b);
        art.append(p);
    }
    div.append(art, img);
    if (rigthPageFrame.childElementCount > 1) {
        rigthPageFrame.children[1].replaceWith(div);
    } else {
        rigthPageFrame.append(div);
    }
    document.querySelector('#Book\\ name').innerHTML += JSON.parse(localStorage.getItem(id))['Book name'];
    document.querySelector('#Author').innerHTML += JSON.parse(localStorage.getItem(id))['Author'];
    document.querySelector('#Plot').innerHTML += JSON.parse(localStorage.getItem(id))['Plot'];
    document.querySelector('img').setAttribute('src', JSON.parse(localStorage.getItem(id))['ImageURL']); 
}

bookList.forEach((elem) => {
    elem.addEventListener('click', event => {
    history.pushState('preview', null, `?id=${event.target.parentElement.id}`);
    window.location.hash = '#preview';
    }) 
});

editButton.forEach((elem) =>
    elem.addEventListener('click', event => {
    history.pushState('edit', null, `?id=${event.target.parentElement.id}`);
    window.location.hash = '#edit';
}));

addButton.addEventListener('click', () => {
    history.pushState('add', null, location.href.match(/..+html/));
    window.location.hash = '#add';
});


function cancelInput(){
    const userReply = window.confirm('Discard changes?');
    if (userReply) {
        console.log('move back')
        window.history.go(GO_BACK);
    }    
}


function addNewBook(){
    
    const bookName = document.querySelector('#Book\\ name');
    const autor = document.querySelector('#Author');
    const plot = document.querySelector('#Plot');
    const imageURL = document.querySelector('#ImageURL');
    console.log(bookName)
    console.log(autor)
    console.log(plot)
    console.log(imageURL)

    if (!bookName.value || !autor.value || !plot.value || !imageURL.value) {
        return;
    }

    let id = 0;
    if (window.location.href.match(/id=\d+/)) {
        id = window.location.href.match(/id=\d+/)[0].slice(SLICE_ID);
    } else {
        id = window.localStorage.length + 1;
    }

    let newBook = {'id': id,
    'Book name': bookName.value, 
    'Author': autor.value, 
    'ImageURL': imageURL.value,
    'Plot': plot.value};
    localStorage.setItem(newBook['id'], JSON.stringify(newBook));
    rightPreviewPage(id);
    setTimeout(alert('Book successfully updated'), SAVE_TIME_OUT);
}

window.addEventListener('popstate', function(e){
    updateRightPartOfThePage(e.state);
});

window.addEventListener('hashchange', updateRightPartOfThePage);
window.addEventListener('load', updateRightPartOfThePage);

