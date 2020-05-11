const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

// TODO: your code goes here

// Assign icons to variables 
let folder = '<i class="material-icons folder">folder</i>';
let icon = '<i class="material-icons file">insert_drive_file</i>';
let openFolderIcon = '<i class="material-icons folder">folder_open</i>';

// Create a tree

const createNode = (input) => {
  if(!input) {
    return;
  }

  let ul = document.createElement('ul');

  for (let obj of input) {
    let li = document.createElement('li');
    if (obj.folder) {
      li.innerHTML = folder;
    } 
    if (!obj.folder) {
      li.innerHTML = icon;
    }
    
    li.innerHTML += obj.title;

    let keyChild = createNode(obj.children);
    if (keyChild) {
      li.append(keyChild);
    }

    ul.append(li);
  }
  return ul;
};

rootNode.prepend(createNode(data));

for (let li of rootNode.querySelectorAll('li')) {
  let div = document.createElement('div');
  li.prepend(div);
  div.append(div.nextSibling);
  div.append(div.nextSibling);
}

// Hide all elements except top level of tree

document.querySelectorAll('ul').forEach((elem) => {
  if (elem.parentNode !== rootNode) {
    elem.hidden = true;
  }
});

// Open folders onclick

rootNode.onclick = function(event) {
  if (event.target.tagName !== 'DIV') {
    return;
  }
  if (event.target.firstElementChild.innerText === 'folder') {
    event.target.firstElementChild.innerText = 'folder_open';
  } else if (event.target.firstElementChild.innerText === 'folder_open') {
    event.target.firstElementChild.innerText = 'folder';
  }

  let container = event.target.parentNode.querySelector('ul');
  if (!container) {
    if (event.target.firstElementChild.classList.contains('file')) {
      return;
    }
    event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden;   
    return
  }
  container.hidden = !container.hidden;
};

const folders = document.querySelectorAll('.folder')

folders.forEach((elem) => {
  if(!elem.parentNode.nextElementSibling) {
    let li = document.createElement('li');
    let text = '<i class="cursor_text empty_folder">Folder is empty</i>';
    li.innerHTML = text;
    li.hidden = true;
    elem.parentNode.after(li);
  }
});

// Right-click-menu creation

const createMenu = (options) => {
  let ul = document.createElement('ul');
  ul.classList.add('right-click-menu');

  for (let i = 0; i < options.length; i += 1) {
    let li = document.createElement('li');
    li.classList.add(`opt${i + 1}`);
    li.innerHTML = options[i];
    ul.append(li);
  }
  return ul;
};

let rightMenu = ['Rename', 'Delete item'];

rootNode.after(createMenu(rightMenu));

const menu = document.querySelector('.right-click-menu')

document.querySelectorAll('div').forEach((elem) => {
  if (elem !== rootNode) {
    elem.addEventListener('contextmenu', event => {
      elem.style = 'background-color: lightgrey;'
      event.preventDefault();
      menu.style.top = `${event.clientY}px`;
      menu.style.left = `${event.clientX}px`;
      menu.classList.add('active');
      menuUse(elem);
    });
  }
});

// Right-click-menu functions

document.addEventListener('click', event => {
  if (event.button === 0) {
    menu.classList.remove('active');
  }
  document.querySelectorAll('div').forEach((elem) => {
    elem.style = 'background-color: inherited;' 
  })
}, false);

const menuUse = (target) => {
  console.log(target)
  document.querySelector('.opt1').addEventListener('click', () => {
    alert('rename is forbidden');
  }, false);
  document.querySelector('.opt2').addEventListener('click', () => {
    if (target.firstElementChild.classList.contains('file')){
      target.remove();
      return;
    } else {
    if (target.nextElementSibling.firstElementChild.classList.contains('empty_folder')) {
      target.nextElementSibling.remove();
    }
    const childrenRemove = (targ) => {
      const children = targ.parentElement.childElementCount;
      for (let i = children - 1; i >= 0; i -= 1) {
        targ.parentElement.children[i].remove();
      }
    }
    childrenRemove(target);
    target.remove();
    }
  }, false);
};


