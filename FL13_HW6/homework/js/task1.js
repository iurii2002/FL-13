const maxTips = 100;
const baseForPercent = 100;
const roundings = 2;

let billAmount = parseFloat(prompt('What is the total check amount?'));
let tipPercent = parseFloat(prompt('How many % you would like to tip?'));
const tipAmount = Math.round(billAmount * tipPercent) / baseForPercent;
const totalSumToPay = billAmount + tipAmount;

if (billAmount >= 0 && tipPercent >= 0 && tipPercent <= maxTips ) {
    alert(
        `Total amount: ${billAmount.toFixed(roundings)}
        \nTip: ${tipPercent.toFixed(roundings)}%
        \nTip amount: ${tipAmount.toFixed(roundings)}
        \nTotal sum to pay: ${totalSumToPay.toFixed(roundings)}`);
} else {
    alert('Invalid input data');
}