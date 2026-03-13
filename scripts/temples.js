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

