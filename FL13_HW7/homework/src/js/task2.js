let prize = 0;
let range = 5;
let possibPr = 100;
let possiblePrDecrease = 2;
let round = 1;

const game = () => {
    let attempts = 3;
    let roundRange = range * round;
    let roundPr = possibPr * round;
    const number = Math.floor(Math.random() * (roundRange + 1));
    while (attempts > 0) {       
        const guess = +prompt(`Choose a roulette pocket number from 0 to ${roundRange}` + '\n' + 
                                `Attempts left: ${attempts}` + '\n' +
                                `Total prize: ${prize}$` +'\n' + 
                                `Possible prize on current attempt: ${roundPr}$` +'\n')
        if (guess !== number) {
            roundPr = roundPr / possiblePrDecrease;
            attempts -= 1;
        } else {
            prize = prize + roundPr;
            break;
        } 
    }

    if (attempts > 0) {
        const contPlay = confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`);
        if (contPlay) {
            round += 1;
            game();
        } else {
            alert(`Thank you for your participation. Your prize is: ${prize}$`);
            let playAgian = confirm('Do you want to play again?');
            if (playAgian === true) {
                round = 1;
                prize = 0;
                game();
            } 
        }
    }

    if (attempts === 0) {
        alert(`Thank you for your participation. Your prize is: ${prize}$`);
        let playAgian = confirm('Do you want to play again?');
        if (playAgian === true) {
            round = 1;
            prize = 0;
            game();
        } 
    }       
}

let play = confirm('Do you want to play a game?');

if (play === false) {
    alert('You did not become a billionaire, but can.');
} else {
    game();
}
