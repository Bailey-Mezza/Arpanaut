let xp = 0;
let health = 100;
let gold = 500;

let currentWeapon = 0;
let fighting;

let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 10
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
]

const locations = [
    {
        name: "Town Square",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square"
    },
    {
        name: "Store",
        "button text": ["Buy 10 health (10 gold)", "Buy Weapon (30 gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store"
    },
    {
        name: "Cave",
        "button text": ["Attack the Slime", "Battle the Goblin", "Go to Town Square"],
        "button functions": [fightSlime, fightGoblin, goTown],
        text: "You enter the cave and see some monsters!"
    },
    {
        name: "Fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster!"
    }
];

const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15
    },
    {
        name: "Goblin",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }
]

/*Initialise buttons*/
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    text.innerText = location.text;
    
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
}

function goTown(){
    update(locations[0]);
    document.body.style.backgroundImage = "url(/styles/images/town.jpg)";
};

function goStore() {
    update(locations[1]);
    document.body.style.backgroundImage = "url(/styles/images/store.jpg)";
};

function buyHealth(){
    if (gold>=10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;   
    }else{
        text.innerText = "You do not have enough gold to buy health."
    }
};

function buyWeapon(){
    if (currentWeapon > weapons.length-2) {
        text.innerText = "You already have the most powerful weapon. In your inventory you have: " + inventory;
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }else if (gold >= 30) {
        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You bought a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " + inventory;
    }else{
        text.innerText = "You do not have enough gold to buy a new weapon."
    }
};

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }else{
        text.innerText = "Don't sell your only weapon!";
    }
}

function goCave() {
    update(locations[2]);
    document.body.style.backgroundImage = "url(/styles/images/cave.jpg)";
};

function fightSlime() {
    fighting = 0;
    document.body.style.backgroundImage = "url(/styles/images/slime.png)";
    goFight(fighting);
    
}

function fightGoblin() {
    fighting = 1;
    document.body.style.backgroundImage = "url(/styles/images/goblin.jpg)";
    goFight(fighting);
    
}

function fightDragon() {
    fighting = 2;
    document.body.style.backgroundImage = "url(/styles/images/dragon.jpg)";
    goFight(fighting);
    
};

function goFight() {
    update(locations[3])
    monsterStats.style.display = "block";
    monsterHealth = monsters[fighting].health;
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
    
};

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power;


};

function dodge() {

};

