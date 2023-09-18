let chrono = document.getElementById("chrono");
let temps = 5;
compteurTravail = true ; //si true alors travail sinon repos



function diminuerTemps() { //permet la gestion du chrono, diminue le temps et l'arrete a 00:00
    let minutes = parseInt(temps / 60, 10)
    let secondes = parseInt(temps % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    chrono.innerText = `${minutes}:${secondes}`
    temps = temps <= 0 ? 0 : temps - 1
}

function travailRepos(){ //verifie si on change de travail a repos et change de travail a repos (vice et versa)
    if (temps == 0){
        if(compteurTravail){
            compteurTravail=false;
        }else{
            compteurTravail=true;
        }
    }
        
    if (compteurTravail){
        document.getElementById("travailRepos").textContent = travail;
    }else{
        document.getElementById("travailRepos").textContent = repos;
    }
}

setInterval(diminuerTemps, 1000);
travailRepos();