
//declaration des variables

let chrono = document.getElementById("chrono");
let temps;
let tempsTravail = document.getElementById("travailTemps");
let tempsRepos = document.getElementById("reposTemps");
const bouttonTravail = document.getElementById("travail");
const bouttonRepos = document.getElementById("repos");
const bouttonDebut = document.getElementById("debut");
compteurTravail = true; //si true alors travail sinon repos
compteurReset = false; //si true alors pret à reset sinon start

//change les temps écrit a coté des slider qui permettent de changer le temps et change le temps actuellement écrit

tempsTravail.oninput = function(){
    document.getElementById("texteTravail").textContent = "Temps Travail: " +this.value+ " minutes";
    chrono.textContent= (this.value< 10 ? "0" + this.value : this.value)+":00";
}
tempsRepos.oninput = function(){
    document.getElementById("texteRepos").textContent = "Temps Repos: " +this.value+ " minutes";
}


//declaration des fonctions

function affichageTemps() {//affiche le temps en minutes:secondes
    let minutes = parseInt(temps / 60, 10); //parseInt pour eviter les virguiles. 
    let secondes = parseInt(temps % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    chrono.innerText = `${minutes}:${secondes}`;
}

function diminuerTemps() { //diminue le temps et l'arrete à 00:00 
    temps = temps <= 0 ? 0 : temps - 1;
}

function travailRepos() { //change de travail à repos (vice et versa) et fait les actions necessaires.
    if (compteurTravail) {
        compteurTravail = false;
        changementBouttons();
        passageTempsTravailRepos();
        changementCouleur();
    } else {
        compteurTravail = true;
        changementBouttons();
        passageTempsTravailRepos();
        changementCouleur();
    }
}

function changementBouttons() {  //met à jour les boutons
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

function changementCouleur() { //change la couleur du fond pour mieux montrer la difference entre travail et repos.
    if (compteurTravail) {
        document.getElementById("body").style.backgroundColor = "#ddebee";
    } else {
        document.getElementById("body").style.backgroundColor = "#185b64"
    }
}

function passageTempsTravailRepos() { //gere le changement de temps entre repos et travail
    if (compteurTravail) {
        temps = tempsTravail+1;
        affichageTemps(); //affiche le temps de début d'une itération
    } else {
        temps = tempsRepos+1;
        affichageTemps();//affiche le temps de début d'une itération (évite l'affichage d'un 00:00 et d'un secondes perdu pour l'itération suivante)
    }
}

//debut script

changementBouttons();//met à jour les bouttons travail/repos/debut pour etre sur de leur contenu

bouttonDebut.onclick = function () {

    //prend le temps actuelle sur les barres coulisantes pour initier les temps de travail, de repos, et le temps actuel
    tempsTravail=parseInt(tempsTravail.value)*60-1;
    tempsRepos=parseInt(tempsRepos.value)*60-1;    
    temps = tempsTravail;

    compteurReset = !compteurReset;
    changementBouttons();//met à jour pour mettre le boutton en relancer
    if (compteurReset) {
        setInterval(
            () => {
                affichageTemps();//affiche le temps
                if (temps == 0) {
                    travailRepos(); //verifie si le temps de travail/repos est fini puis fait les changements
                }
            }, 1000);
        setInterval(diminuerTemps, 1000);//fait diminuer le temps toutes les secondes
    } else {
        location.reload();
    }
}

