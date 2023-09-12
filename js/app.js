chrono = document.getElementById("chrono");
temps = 25;

function a() {
    if (temps != 0) {
        let minutes = Math.floor(temps / 60);
        let secondes = temps % 60;
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        secondes = secondes < 10 ? "0" + secondes : secondes;


        chrono.textContent = minutes + ":" + secondes;
        temps--;
    } else {
        chrono.innerHTML = "<i class='fa-brands fa-discord fa-bounce fa-2xl'></i>";
    }
}

setInterval(a, 1000);