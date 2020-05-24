// TODO: Your code goes here

const VEHICLE_SPEED_INCREASE_TIME = 2000;
const VEHICLE_SPEED_DECREASE_TIME = 1500;
const SPEED_CHANGE_BASE = 20;
const MOTORCYCLE_OVERHEATING = 30;

function Vehicle (color, engine) {
    this._type = 'Vehicle';
    this._color = color;
    this._engine = engine;
    this._maxSpeed = 70;
    this._model = 'unknown model';
    this._currentSpeed = 0;
    this._status = 'stop';
}

function Car (color, engine, model) {
    Vehicle.call(this, color, engine);
    this._type = 'Car';
    this._model = model;
    this._maxSpeed = 80;
}

function Motorcycle (color, engine, model) {
    Vehicle.call(this, color, engine);
    this._type = 'Motorcycle';
    this._model = model;
    this._maxSpeed = 90;    
}

Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
    if (this._status !== 'stop') {
        console.log('You can not make an upgrade while driving!');                   
    } else {
        this._engine = newEngine;
        this._maxSpeed = maxSpeed;
    }
};

Vehicle.prototype.getInfo = function() {
    let carInfo = {
        'engine': this._engine,
        'color': this._color,
        'maxSpeed': this._maxSpeed,
        'model': this._model
    }
    return carInfo;
};

Vehicle.prototype.drive = function() {
    if (this._status === 'driving') {
        console.log('Already driving');
        return;
    }
    this._status = 'driving';
    clearInterval(this._speedDown);
    this._speedUP = setInterval(() => {
        this._currentSpeed += SPEED_CHANGE_BASE;
        console.log(this._currentSpeed);
        if (this._currentSpeed > this._maxSpeed) {
            console.log('speed is too high, SLOW DOWN!');
        }
    }, VEHICLE_SPEED_INCREASE_TIME);        
}

Vehicle.prototype.stop = function() {
    if (this._status === 'slow down') {
        console.log('Already slows down');
        return;
    }
    this._status = 'slow down';
    clearInterval(this._speedUP);
    let maxSpeed = this._currentSpeed;
    this._speedDown = setInterval(() => {
        this._currentSpeed -= SPEED_CHANGE_BASE;
        console.log(this._currentSpeed);
        if (this._currentSpeed <= 0) {
            this._status = 'stop';
            this._stopMessage(maxSpeed);
            clearInterval(this._speedDown);
        }
    }, VEHICLE_SPEED_DECREASE_TIME);
};

Car.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype = Object.create(Vehicle.prototype);


Vehicle.prototype._stopMessage = function(maxSpeed) {
    console.log(`${this._type} is stopped. Maximum speed during the drive was ${maxSpeed}!`);
}
Car.prototype._stopMessage = function(maxSpeed) {
    console.log(`${this._type} ${this._model} is stopped. Maximum speed during the drive was ${maxSpeed}!`);
}
Motorcycle.prototype._stopMessage = function() {
    console.log(`${this._type} ${this._model} is stopped. Good drive!`);
}

Car.prototype.changeColor = function(newColor) {
    if (this._color === newColor) {
        console.log('The selected color is the same as the previous, please choose another one');        
    } else {
        this._color = newColor;
    }
}

Motorcycle.prototype.drive = function() {
    if (this._status === 'driving') {
        console.log('Already driving');
        return;
    }
    console.log('Let’s drive');
    this.status = 'driving';
    clearInterval(this._speedDown);
    this._speedUP = setInterval(() => {
        this._currentSpeed += SPEED_CHANGE_BASE;
        console.log(this._currentSpeed);
        if (this._currentSpeed > this._maxSpeed) {
            console.log('speed is too high, SLOW DOWN!');
        }
        if (this._currentSpeed > this._maxSpeed + MOTORCYCLE_OVERHEATING) {
            console.log('Engine overheating');
            this.stop();
        }
    }, VEHICLE_SPEED_INCREASE_TIME);        
}