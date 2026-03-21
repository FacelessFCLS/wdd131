document.getElementById("currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = `Last Modified: ${document.lastModified}`;

const temperature = 8; //Degree in celsius ()
const windSpeed = 5; //km/h

//W = 13.12 + 0.6215T - 11.37V**0.16 + 0.3965TV**0.16

function calculateWindChill(temperature, windSpeed){
    windChill = 13.12 + 0.6215*(temperature) - 11.37* (windSpeed)**0.16 + 0.3965*temperature*windSpeed**0.16
    return windSpeed
}

let windChillDisplay;

if(temperature <= 10 && windSpeed> 4.8){
    const wc = calculateWindChill(temperature, windSpeed);
    windChillDisplay = wc.toFixed(1) + "&degC"
}

else{
    windChillDisplay = "NA"
}

document.querySelector("#wind-chill").innerHTML = windChillDisplay;