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
        text: "You are in the town square",
        "imgurl": "url(/styles/images/town.jpg)"
    },
    {
        name: "Store",
        "button text": ["Buy 10 health (10 gold)", "Buy Weapon (30 gold)", "Go to Town Square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store",
        "imgurl": "url(/styles/images/store.jpg)"
    },
    {
        name: "Cave",
        "button text": ["Attack the Slime", "Battle the Goblin", "Go to Town Square"],
        "button functions": [fightSlime, fightGoblin, goTown],
        text: "You enter the cave and see some monsters!",
        "imgurl": "url(/styles/images/cave.jpg)"
    },
    {
        name: "Fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster!"
    },
    {
        name: "MonsterDefeated",
        "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "button functions": [],
        text: "The monster screams as you cut it down. You gain gold and experience from this battle."
    },
    {
        name: "Death",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You have died in battle, the dragon still looms large over the town.",
        "imgurl": "url(/styles/images/death.jpg)"
    },
    {
        name: "Victory",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You have defeated the dragon! You win the Game!",
        "imgurl": "url(/styles/images/victory.jpg)"
    },
    {
        name: "Easter Egg",
        "button text": [],
        "button functions": [],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
        "imgurl": "http"
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
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    text.innerText = location.text;
    document.body.style.backgroundImage = location.imgurl;
    
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
}

function goTown(){
    update(locations[0]);
};

function goStore() {
    update(locations[1]);
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

    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    }else{
        text.innerText += " You miss."
    
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    
    if (health<=0){
        lose();
    } else if (monsterHealth<=0) {
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (Math.random() < 0.1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
};

function dodge() {
    text.innerText = "You dodge the " + monsters[fighting].name + " attacks.";
    if (Math.random() < 0.5) {
        text.innerText += " You fail to dodge the attack.";
        health -= getMonsterAttackValue(monsters[fighting].level);
        healthText.innerText = health;
    } else{
        text.innerText += " You dodge the attack and gain an opening to strike.";
        button1.innerText = "Counterattack"
        button1.onclick = counter;
    }
};

function counter() {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealthText.innerText = monsterHealth;
    text.innerText += " You counter attack the "  + monsters[fighting].name + ".";
    button1.innerText = "Attack"
    button1.onclick = attack;
    if (health<=0){
        lose();
    } else if (monsterHealth<=0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp) +1);
    if (hit < 0) {
        hit = 0
    }
    console.log(hit);
    return hit;
}

function isMonsterHit(params) {
    return Math.random() > .2 || health < 20;
}

function lose() {
    update(locations[5])
};

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;

    let location = locations.find(loc => loc.name === "MonsterDefeated");

    // Randomly choose an index (0, 1, or 2) to be the Easter Egg
    let easterEggIndex = Math.floor(Math.random() * 3);

    // Create an array where all buttons default to goTown
    let buttonFunctions = [goTown, goTown, goTown];

    // Assign the Easter Egg function to the randomly chosen index
    buttonFunctions[easterEggIndex] = easterEgg;

    // Update the location's button functions
    location["button functions"] = buttonFunctions;

    console.log("Easter egg is at " + easterEggIndex);

    update(locations[4])
};

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    healthText.innerText = health;
    goldText.innerText = gold;
    xpText.innerText = xp;
    goTown();
};

function winGame() {
    update(locations[6]);
};

function easterEgg() {
    let location = locations.find(loc => loc.name === "Easter Egg");

    // Generate two random numbers between 0 and 10
    let num1 = Math.floor(Math.random() * 11);
    let num2 = Math.floor(Math.random() * 11);

    // Update the button text with the new numbers
    location["button text"] = [`${num1}?`, `${num2}?`, "Go to Town Square?"];

    // Assign functions dynamically (pass the random numbers to pickNumber function)
    location["button functions"] = [
        () => picknum1(num1),
        () => picknum2(num2),
        goTown
    ];
    update(locations[7]);
};

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random()*11));
    };

    text.innerText = "You picked " + guess + ". These are the random numbers\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "  ";
    };

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += " Congratulations! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    }else{
        text.innerText += " You didn't win.";
    };
    button1.innerText = "Go to Town";
    button2.innerText = "Go to Town";
    button3.innerText = "Go to Town";
    
    button1.onclick = goTown;
    button2.onclick = goTown;
    button3.onclick = goTown;

};   

function picknum1(num1) {
    pick(num1);
};

function picknum2(num2) {
    pick(num2);
};