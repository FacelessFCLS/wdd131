const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");
document.querySelector("#lastmodified").textContent =  `Last Modified: ${document.lastModified}`


hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// get current year
document.getElementById("currentyear").innerText = new Date().getFullYear();

const temples = [
	{
        templeName: "Giant Ape",
        location: "7",
        dedicated: "Beast",
        area: "Huge",
        image: "images/giant-ape.jpg"
    },
    {
        templeName: "Giant Boar",
        location: "2",
        dedicated: "Beast",
        area: "Medium",
        image: "images/giant-boar.jpg"
    },
    {
        templeName: "Giant Crab",
        location: "1/8",
        dedicated: "Beast",
        area: "Medium",
        image: "images/giant-crab.jpg"
    },
    {
        templeName: "Giant Goat",
        location: "1/2",
        dedicated: "Beast",
        area: "Large",
        image: "images/giant-goat.jpg"
    },
    {
        templeName: "Giant Lizard",
        location: "1/4",
        dedicated: "Beast",
        area: "Large",
        image: "images/giant-lizard.jpg"
    },
    {
        templeName: "Giant Squid",
        location: "6",
        dedicated: "Beast",
        area: "Huge",
        image: "images/giant-squid.jpg"
    },
    {
        templeName: "Killer Whale",
        location: "3",
        dedicated: "Beast",
        area: "Huge",
        image: "images/killer-whale.jpg"
    },
    {
        templeName: "Rhinoceros",
        location: "2",
        dedicated: "Beast",
        area: "Large",
        image: "images/rhinoceros.jpg"
    },
    {
        templeName: "Tyrannosaurus Rex",
        location: "8",
        dedicated: "Beast",
        area: "Huge",
        image: "images/t-rex.jpg"
    },
    {
        templeName: "Wolf",
        location: "1/4",
        dedicated: "Beast",
        area: "Medium",
        image: "images/wolf.jpg"
    },

    {
        templeName: "Banshee",
        location: "4",
        dedicated: "Undead",
        area: "Medium",
        image: "images/banshee.jpg"
    },
    {
        templeName: "Boneclaw",
        location: "12",
        dedicated: "Undead",
        area: "Large",
        image: "images/boneclaw.jpg"
    },
    {
        templeName: "Death Knight",
        location: "17",
        dedicated: "Undead",
        area: "Medium",
        image: "images/death-knight.jpg"
    },
    {
        templeName: "Flame Skull",
        location: "4",
        dedicated: "Undead",
        area: "Tiny",
        image: "images/flame-skull.jpg"
    },
    {
        templeName: "Ghast",
        location: "2",
        dedicated: "Undead",
        area: "Medium",
        image: "images/ghast.jpg"
    },
    {
        templeName: "Ghost",
        location: "4",
        dedicated: "Undead",
        area: "Medium",
        image: "images/ghost.jpg"
    },
    {
        templeName: "Ghoul",
        location: "1",
        dedicated: "Undead",
        area: "Medium",
        image: "images/ghoul.jpg"
    },
    {
        templeName: "Jiangshi",
        location: "9",
        dedicated: "Undead",
        area: "Medium",
        image: "images/jiangshi.jpg"
    },
    {
        templeName: "Zombie",
        location: "1/4",
        dedicated: "Undead",
        area: "Medium",
        image: "images/zombie.jpg"
    },
	// Add more temple objects here...
];


function DisplayTemples(temples) {
	gallery.innerHTML = ""
	temples.forEach(t => {
		const gallery = document.querySelector("#gallery");
		const card = document.createElement("div");
		const templeHTML = `
		<h3>${t.templeName}</h3>
		<p><strong>Challenge Rating: </strong>${t.location}</p>
		<p><strong>Type: </strong>${t.dedicated}</p>
		<p><strong>Size: </strong>${t.area}</p>
		<img src="${t.image}" alt="A picture of ${t.templeName}" loading="lazy">
		`;

	card.innerHTML = templeHTML;
	gallery.appendChild(card);
	});
}


const allTemplesLink = document.querySelector("#all-temples");
const oldTemplesLink = document.querySelector("#old-temples");
const newTemplesLink = document.querySelector("#new-temples");
const largeTemplesLink = document.querySelector("#large-temples");
const smallTemplesLink = document.querySelector("#small-temples");
const selection = document.querySelector("#selection")


allTemplesLink.addEventListener("click", () => {
	DisplayTemples(temples);
	selection.innerText = "Home";
});
oldTemplesLink.addEventListener("click", () => {
	const filteredTemples = temples.filter(temple => temple.dedicated === "Undead")
	DisplayTemples(filteredTemples);
	selection.innerText = "Undead";
});
newTemplesLink.addEventListener("click", () => {
	const filteredTemples = temples.filter(temple => temple.dedicated === "Beast")
	DisplayTemples(filteredTemples);
	selection.innerText = "Beast";
});
largeTemplesLink.addEventListener("click", () => {
const filteredTemples = temples.filter(temple => temple.location >= 5)
DisplayTemples(filteredTemples);
selection.innerText = "Higher Level";
});
smallTemplesLink.addEventListener("click", () => {
	const filteredTemples = temples.filter(temple => temple.location < 5)
	DisplayTemples(filteredTemples);
	selection.innerText = "Lower Level";
});


DisplayTemples(temples);