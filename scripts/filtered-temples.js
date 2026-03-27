document.getElementById("currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent =  `Last Modified: ${document.lastModified}`

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
];

const templeTitle =document.querySelector("#section-title");
function displayAllTemples(temples){  
    const templeContainer = document.querySelector(".image-container");
    templeContainer.innerHTML ="";
    for (const temple of temples){
        let templeCard = `
                <figure>
            <img src="${temple.src}"
                 alt="${temple.templeName}"
                 loading="lazy">

             <h2>${temple.templeName}</h2>
             <p><strong class="var">Location:</strong> ${temple.location}</p>
             <p><strong class="var">Dedicated:</strong> ${temple.dedicated}</p>
             <p><strong class="var">Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
         </figure>`; 

         templeContainer.innerHTML += templeCard;
    }
}       
displayAllTemples(temples);

const homeTemple = document.querySelector(".home-temple");
homeTemple.addEventListener("click", () => {
    templeTitle.innerHTML = "Home";
    displayAllTemples(temples);

});


const oldTemple = document.querySelector(".old-temple");
oldTemple.addEventListener("click", () => {
    const filteredOld= temples.filter((temple) => new Date(temple.dedicated).getFullYear()< 1990 );
    templeTitle.innerHTML = "Old Temples";
    displayAllTemples(filteredOld)
})


const recentTemple = document.querySelector(".new-temple");
recentTemple.addEventListener("click", () =>{
    const filteredNew= temples.filter((temple) => new Date(temple.dedicated).getFullYear()>2000 );
    templeTitle.innerHTML = "New Temples";
    displayAllTemples(filteredNew)
})

const largeTemple = document.querySelector(".large-temple");
largeTemple.addEventListener("click", () => {
    const filteredLarge= temples.filter((temple) => temple.area > 90000 );
    templeTitle.innerHTML = "Large Temples";
    displayAllTemples(filteredLarge)
})
const smallTemple = document.querySelector(".small-temple");
smallTemple.addEventListener("click", () => {
    const filteredSmall= temples.filter((temple) => temple.area < 10000 );
    templeTitle.innerHTML = "Small Temples";
    displayAllTemples(filteredSmall)
})

//Mobile Nav

const homeTempleMob = document.querySelector(".home-temple-mob");
homeTempleMob.addEventListener("click", () => {
    templeTitle.innerHTML = "Home";
    displayAllTemples(temples);

});

const oldTempleMob = document.querySelector(".old-temple-mob");
oldTempleMob.addEventListener("click", () => {
    const filteredOld= temples.filter((temple) => new Date(temple.dedicated).getFullYear()< 1990 );
    templeTitle.innerHTML = "Old Temples";
    displayAllTemples(filteredOld)
})


const recentTempleMob = document.querySelector(".new-temple-mob");
recentTempleMob.addEventListener("click", () =>{
    const filteredNew= temples.filter((temple) => new Date(temple.dedicated).getFullYear()>2000 );
    templeTitle.innerHTML = "New Temples";
    displayAllTemples(filteredNew)
})

const largeTempleMob = document.querySelector(".large-temple-mob");
largeTempleMob.addEventListener("click", () => {
    const filteredLarge= temples.filter((temple) => temple.area > 90000 );
    templeTitle.innerHTML = "Large Temples";
    displayAllTemples(filteredLarge)
})
const smallTempleMob = document.querySelector(".small-temple-mob");
smallTempleMob.addEventListener("click", () => {
    const filteredSmall= temples.filter((temple) => temple.area < 10000 );
    templeTitle.innerHTML = "Small Temples";
    displayAllTemples(filteredSmall)
})