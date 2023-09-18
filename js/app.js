let chrono = document.getElementById("chrono");
let temps = 5;
let tempsTravail = 5;
let tempsRepos = 4;
compteurTravail = true; //si true alors travail sinon repos

function affichageTemps() {
    let minutes = parseInt(temps / 60, 10);
    let secondes = parseInt(temps % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    chrono.innerText = `${minutes}:${secondes}`;
}

function diminuerTemps() { //permet la gestion du chrono, diminue le temps et l'arrete a 00:00 
    temps = temps <= 0 ? 0 : temps - 1;
}

function travailRepos() { //verifie si on change de travail a repos et change de travail a repos (vice et versa)
    if (compteurTravail) {
        compteurTravail = false;
    } else {
        compteurTravail = true;
    }

    if (compteurTravail) {
        document.getElementById("travailRepos").textContent = "Travail";
        passageTempsTravailRepos();
    } else {
        document.getElementById("travailRepos").textContent = "Repos";
        passageTempsTravailRepos();
    }
}

function passageTempsTravailRepos() {
    if (compteurTravail) {
        temps = tempsTravail;
        affichageTemps();
    } else {
        temps = tempsRepos;
        affichageTemps();
    }
}


setInterval(
    () => {
        affichageTemps();
        if (temps == 0) {
            travailRepos();
        }
    }, 1000);
setInterval(diminuerTemps, 1000);


