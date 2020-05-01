const convert = (...args) => {
    let result = [];
    for (let arg of args) {
        if (typeof arg === 'string') {
            result.push(Number(arg));
        } else if (typeof arg === 'number') {
            result.push(String(arg));
        }
    }
    return result;
};

const executeforEach = (arr, callback) => {
    for (let item of arr) {
        callback(item);
    }
};

const mapArray = (arr, callback) => {
    let arrNum = []    
    for (let item of arr) {
        typeof item === 'string'? arrNum = [...arrNum, ...convert(item)] : arrNum.push(item);
    }
    let result = [];
    executeforEach(arrNum, (num) => result.push(callback(num)));
    return result;
};

const filterArray = (arr, filt) => {
    let result = [];
    executeforEach(arr, (num) => {
        if (filt(num) === true) {
            result.push(num);
        }
    });
    return result;
};

const containsValue = (arr, num) => {
    let result = false;
    executeforEach(arr, (item) => {
        if (item === num) {
            result = true;
        }
    });
    return result;
};

const flipOver = (str) => {
    let result = '';
    for (let i = str.length - 1; i >= 0; i -=1) {
        result += str[i];
    }
    return result;
};

const makeListFromRange = (arr) => {
    let beg = 0;
    let end = 0; 
    let result = [];
    
    if (arr[0] > arr[1]) {
        beg = arr[1];
        end = arr[0];
    } 
    if (arr[0] < arr[1]) {
        beg = arr[0];
        end = arr[1];
    } 
    if (arr[0] === arr[1]) {
        beg = end = arr[0];
    }

    while (beg <= end) {
        result.push(beg);
        beg += 1;
    }

    return result;
};

const getArrayOfKeys = (arr, key) => {
    let result = [];
    executeforEach(arr, (obj) => result.push(obj[key]));
    return result;
};

const substitute = (arr) => {
    const top = 20;
    const bottom = 10;
    return mapArray(arr, (num) => {
        if (num > bottom && num <top) {
            return '*'; 
        } else {
            return num;
        }
    });
};

const getPastDay = (date, num) => {
    const hours = 24;
    const minutes = 60;
    const seconds = 60;
    const miliseconds = 1000;
    const milisecondsInNum = miliseconds*seconds*minutes*hours;
    const newDate = new Date(date - num * milisecondsInNum);
    return newDate.getDate();
};

const formatDate = (date) => {
    const checkZero = 10;
    const year = date.getFullYear();
    const month = date.getMonth() < checkZero ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < checkZero ? '0' + date.getDate() : date.getDate();
    const hours = date.getHours() < checkZero ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < checkZero ? '0' + date.getMinutes() : date.getMinutes();
    return `${year}/${month}/${day} ${hours}:${minutes}`;
};










