let xp = 0;
let health = 100;
let gold = 50;

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
    }
];

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

};

function buyWeapon(){
    
};



function goCave() {
    console.log("Going to cave")
};

function fightDragon() {
    console.log("Travelling to the dragon")
};