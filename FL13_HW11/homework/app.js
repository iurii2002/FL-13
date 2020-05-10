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

let folder = '<i class="material-icons">folder</i>';
let icon = '<i class="material-icons file">insert_drive_file</i>';
let openFolderIcon = '<i class="material-icons">folder_open</i>';

const createNode = (input) => {
  if(!input) {
    return;
  }

  let ul = document.createElement('ul');
  ul.classList.add('invisible');

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

rootNode.append(createNode(data));

const files = document.getElementsByClassName('file');
for (let file of files) {
  file.style.color = 'lightgrey';
}

rootNode.firstElementChild.className = 'list visible';

const changeBackground = (e) => {
  if(e.type === 'mouseover') {
    e.target.style.backgroundColor = 'lightgrey';
  } else if (e.type === 'mouseout') {
    e.target.style.backgroundColor = 'white';
  }
}

const li = document.querySelectorAll('li')
li .forEach(item => {
  item.addEventListener('mouseover', changeBackground);
  item.addEventListener('mouseout', changeBackground)
})

const ul = document.querySelectorAll('ul')
ul.forEach(item => {
  item.addEventListener('mouseover', changeBackground);
  item.addEventListener('mouseout', changeBackground);
})

