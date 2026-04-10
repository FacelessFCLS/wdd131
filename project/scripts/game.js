const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");
document.querySelector("#lastmodified").textContent =  `Last Modified: ${document.lastModified}`


hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// get current year
document.getElementById("currentyear").innerText = new Date().getFullYear();