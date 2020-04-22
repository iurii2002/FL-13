// Your code goes here
const middle = 2;

let word = prompt('Please, input a word.');

if (word === '' || word === null || (/^\s+$/).test(word)) {
    alert('Invalid value');
} else if (word.length % middle === 0) {
    alert(`Middle characters: ${word.charAt(word.length / middle - 1) + word.charAt(word.length / middle)}`);
} else {
    alert(`Middle character: ${word.charAt(word.length / middle)}`);
}

