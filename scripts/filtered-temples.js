document.getElementById("currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = `Last Modified: ${document.lastModified}`
document.getElementById('hamburger').addEventListener('click', function () {
    const menu = document.getElementById('nav-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

// Animated hamburger menu starts here

const hamburger = document.querySelector(".hamburger")
const mobileLinks = document.querySelector(".nav-mobile-link")

hamburger.addEventListener("click", function(){
    hamburger.classList.toggle('crossburger')
    mobileLinks.classList.toggle("showmobilemenu")
})


// Animated hamburger menu ends here

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Gilbert Arizona",
    location: "Gilbert, Az",
    dedicated: "2014, March, 2",
    area: 85326,
    src:"images/gilbert-arizona-temple.jpg"
  },
  {
    templeName: "Hermosillo Mexico",
    location: "Hermosillo, Mexico",
    dedicated: "2000, February, 27",
    area: 10769,
    src:"images/hermosillo-mexico-temple.jpg"
  },
  {
    templeName: "Spokane Washington",
    location: "Spokane, Wa",
    dedicated: "1999, August, 21",
    area: 10700,
    src:"images/spokane-washington-temple.jpg"
  },

];

function DisplayTemples(temples) {
	gallery.innerHTML = ""
	temples.forEach(t => {
		const gallery = document.querySelector("#gallery");
		const card = document.createElement("div");
		const templeHTML = `
		<h3>${t.templeName}</h3>
		<p><strong>Location: </strong>${t.location}</p>
		<p><strong>Dedicated: </strong>${t.dedicated}</p>
		<p><strong>Size: </strong>${t.area}</p>
		<img src="${t.imageUrl}" alt="A picture of ${t.templeName} Temple" loading="lazy">
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
	const filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900)
	DisplayTemples(filteredTemples);
	selection.innerText = "Old";
});
newTemplesLink.addEventListener("click", () => {
	const filteredTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() > 2000)
	DisplayTemples(filteredTemples);
	selection.innerText = "New";
});
largeTemplesLink.addEventListener("click", () => {
const filteredTemples = temples.filter(temple => temple.area > 90000)
DisplayTemples(filteredTemples);
selection.innerText = "Large";
});
smallTemplesLink.addEventListener("click", () => {
	const filteredTemples = temples.filter(temple => temple.area < 10000)
	DisplayTemples(filteredTemples);
	selection.innerText = "Small";
});


DisplayTemples(temples);