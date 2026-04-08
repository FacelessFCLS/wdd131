const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");
document.querySelector("#lastmodified").textContent =  `Last Modified: ${document.lastModified}`


hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// get current year
document.getElementById("currentyear").innerText = new Date().getFullYear();

const monsters = [
    {
        name: "Giant Ape",
        challenge: "7",
        type: "Beast",
        size: "Huge",
        image: "images/giant-ape.jpeg"
    },
    {
        name: "Giant Boar",
        challenge: "2",
        type: "Beast",
        size: "Medium",
        image: "images/giant-boar.png"
    },
    {
        name: "Giant Crab",
        challenge: "1/8",
        type: "Beast",
        size: "Medium",
        image: "images/giant-crab.jpg"
    },
    {
        name: "Giant Goat",
        challenge: "1/2",
        type: "Beast",
        size: "Large",
        image: "images/giant-goat.jpeg"
    },
    {
        name: "Giant Lizard",
        challenge: "1/4",
        type: "Beast",
        size: "Large",
        image: "images/giant-lizard.jpg"
    },
    {
        name: "Giant Squid",
        challenge: "6",
        type: "Beast",
        size: "Huge",
        image: "images/giant-squid.jpg"
    },
    {
        name: "Killer Whale",
        challenge: "3",
        type: "Beast",
        size: "Huge",
        image: "images/killer-whale.jpg"
    },
    {
        name: "Rhinoceros",
        challenge: "2",
        type: "Beast",
        size: "Large",
        image: "images/rhinoceros.jpg"
    },
    {
        name: "Tyrannosaurus Rex",
        challenge: "8",
        type: "Beast",
        size: "Huge",
        image: "images/t-rex.jpg"
    },
    {
        name: "Wolf",
        challenge: "1/4",
        type: "Beast",
        size: "Medium",
        image: "images/wolf.jpg"
    },

    {
        name: "Banshee",
        challenge: "4",
        type: "Undead",
        size: "Medium",
        image: "images/banshee.jpg"
    },
    {
        name: "Boneclaw",
        challenge: "12",
        type: "Undead",
        size: "Large",
        image: "images/boneclaw.jpg"
    },
    {
        name: "Death Knight",
        challenge: "17",
        type: "Undead",
        size: "medium",
        image: "images/death-knight.jpg"
    },
    {
        name: "Flame Skull",
        challenge: "4",
        type: "Undead",
        size: "Tiny",
        image: "images/flame-skull.jpg"
    },
    {
        name: "Ghast",
        challenge: "2",
        type: "Undead",
        size: "Medium",
        image: "images/ghast.jpg"
    },
    {
        name: "Ghost",
        challenge: "4",
        type: "Undead",
        size: "Medium",
        image: "images/ghost.jpg"
    },
    {
        name: "Ghoul",
        challenge: "1",
        type: "Undead",
        size: "Medium",
        image: "images/ghoul.jpg"
    },
    {
        name: "Jiangshi",
        challenge: "9",
        type: "Undead",
        size: "Medium",
        image: "images/jiangshi.jpg"
    },
    {
        name: "zombie",
        challenge: "1/4",
        type: "Undead",
        size: "Medium",
        image: "images/zombie.jpg"
    },
]

function DisplayMonsters(monsters) {
	gallery.innerHTML = ""
	monsters.forEach(t => {
		const gallery = document.querySelector("#gallery");
		const card = document.createElement("div");
		const monsterHTML = `
		<h3>${t.monsterName}</h3>
		<p><strong>Challenge Rating: </strong>${t.challenge}</p>
		<p><strong>Type: </strong>${t.type}</p>
		<p><strong>Size: </strong>${t.size}</p>
		<img src="${t.image}" alt="A picture of ${t.monsterName}" loading="lazy">
		`;

	card.innerHTML = monsterHTML;
	gallery.appendChild(card);
	});
}

const allMonstersLink = document.querySelector("#all-monsters");
const lowMonstersLink = document.querySelector("#low-monsters");
const highMonstersLink = document.querySelector("#high-monsters");
const beastMonstersLink = document.querySelector("#beast-monsters");
const undeadMonstersLink = document.querySelector("#undead-monsters");
const selection = document.querySelector("#selection")

allMonstersLink.addEventListener("click", () => {
	DisplayMonsters(monsters);
	selection.innerText = "Home";
});
lowMonstersLink.addEventListener("click", () => {
	const filteredMonsters = monsters.filter(monster => monster.challenge <= 3)
	DisplayMonsters(filteredMonsters);
	selection.innerText = "Low Level";
});
highMonstersLink.addEventListener("click", () => {
	const filteredMonsters = monsters.filter(monster => monster.challenge >= 3)
	DisplayMonsters(filteredMonsters);
	selection.innerText = "High Level";
});
beastMonstersLink.addEventListener("click", () => {
	const filteredMonsters = monsters.filter(monster => monster.type === "Beast")
	DisplayMonsters(filteredMonsters);
	selection.innerText = "Beast";
});
undeadMonstersLink.addEventListener("click", () => {
	const filteredMonsters = monsters.filter(monster => monster.type === "Undead")
	DisplayMonsters(filteredMonsters);
	selection.innerText = "Undead";
});

DisplayMonsters(monsters);