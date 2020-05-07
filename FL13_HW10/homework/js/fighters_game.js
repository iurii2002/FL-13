let Fighter = class {
    constructor(properties) {
        let {name, damage, hp: maxHp, hp: currentHp, strength, agility} = properties;
        let wins = 0;
        let losses = 0;

        this.getName = () => name;
        this.getDamage = () => damage;
        this.getStrength = () => strength;
        this.getAgility = () => agility;
        this.getHealth = () => currentHp;

        this.attack = (vilian) => {
            const PERCENT = 100;
            let successProbability = PERCENT - (vilian.getAgility() + vilian.getStrength());
            let randomNumber = Math.floor(Math.random() * PERCENT);
            let success = randomNumber < successProbability;
            if (success) {
                vilian.dealDamage(this.getDamage());
                console.log(`${this.getName()} makes ${this.getDamage()} to ${vilian.getName()}`);
            } else {
                console.log(`${this.getName()} attack missed`);
            }
        };
        this.logCombatHistory = () => {
            console.log(`Name: ${this.getName()}, Wins: ${wins}, Losses: ${losses}`);
        };
        this.heal = (health) => {
            currentHp = currentHp + health > maxHp ? maxHp : currentHp + health;
        };
        this.dealDamage = (health) => {
            currentHp = currentHp - health < 0 ? 0 : currentHp - health;
        };
        this.addWin = () => {
            wins += 1;
        };
        this.addLoss = () => {
            losses += 1;
        };
    }
};

const battle = (fighter1, fighter2) => {
    if (!fighter1.getHealth()) {
        console.log(`${fighter1.getName()} is dead and can't fight.`);
        return;
    }
    if (!fighter2.getHealth()) {
        console.log(`${fighter2.getName()} is dead and can't fight.`)
        return;
    }

    while (fighter1.getHealth() && fighter2.getHealth()) {
        fighter1.attack(fighter2);
        if (!fighter2.getHealth()) {
            break;
        }
        fighter2.attack(fighter1);
    }

    if (fighter1.getHealth()) {
        console.log(`${fighter1.getName()} has won!`)
        fighter1.addWin();
        fighter2.addLoss();
    } else {
        console.log(`${fighter2.getName()} has won!`)
        fighter2.addWin();
        fighter1.addLoss();
    }   
};