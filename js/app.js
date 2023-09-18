let chrono = document.getElementById("chrono");
let tempsTravail = 4;
let tempsRepos = 4;
let temps = tempsTravail;
const bouttonTravail = document.getElementById("travail");
const bouttonRepos = document.getElementById("repos");
const bouttonDebut = document.getElementById("debut");
compteurTravail = true; //si true alors travail sinon repos
compteurReset = false; //si true alors pret a reset sinon start

function affichageTemps() {//affiche le temps en minutes:secondes
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
        changementBouttons();
        passageTempsTravailRepos();
        changementCouleur();
    } else {
        changementBouttons();
        passageTempsTravailRepos();
        changementCouleur();
    }
}

function changementBouttons() {
    bouttonTravail.disabled = !compteurTravail;
    bouttonRepos.disabled = compteurTravail;
    if (compteurReset) {
        bouttonDebut.className = "fa-solid fa-rotate-right fa-2xl";
        bouttonDebut.textContent = "Relancer";
    } else {
        bouttonDebut.className = "fa-solid fa-play fa-2xl";
        bouttonDebut.textContent = "Debut";
    }
}

function changementCouleur() {
    if (compteurTravail) {
        document.getElementById("body").style.backgroundColor = "#ddebee";
    } else {
        document.getElementById("body").style.backgroundColor = "#185b64"
    }
}

function passageTempsTravailRepos() { //gere le changement de temps
    if (compteurTravail) {
        temps = tempsTravail + 1;
        affichageTemps(); //affiche le temps de début d'une itération
    } else {
        temps = tempsRepos + 1;
        affichageTemps();//affiche le temps de début d'une itération (évite l'affichage d'un 00:00 et d'un secondes perdu pour l'itération suivante)
    }
}

//debut script



changementBouttons();//met a jour les bouttons travail/repos/start

bouttonDebut.onclick = function () {
    compteurReset = !compteurReset;
    changementBouttons();//met a jour pour mettre le boutton en reset
    if (compteurReset) {
        setInterval(
            () => {
                affichageTemps();//affiche le temps
                if (temps == 0) {
                    travailRepos(); //verifie si le temps de travail/repos est fini puis fait les changements
                }
            }, 1000);
        setInterval(diminuerTemps, 1000);//fait diminuer le temps toute les secondes
    } else {
        location.reload();
    }
}

