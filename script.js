const container =document.querySelector("#container");
for(let i=1 ; i<=103 ; i++){
    const div = document.createElement("div");
    div.classList.add ("col") ;
    div.classList.add("col"+i);

    container.appendChild(div)
}
const post = document.querySelector(".col37");
post.textContent="GB"
post.style.color = "red";

const posteDG=document.querySelector(".col16");
posteDG.textContent="DG"
posteDG.style.color = "red";


const posteDC1=document.querySelector(".col36 ");
posteDC1.textContent="DC";
posteDC1.style.color="red"

const posteDC2=document.querySelector(".col66 ");
posteDC2.textContent="DC";
posteDC2.style.color="red"

const posteDD=document.querySelector(".col102");
posteDD.textContent="DD";
posteDD.style.color="red"

const posteMG=document.querySelector(" .col19");
posteMG.textContent="MG";
posteMG.style.color="red"

const posteMC1=document.querySelector(" .col40");
posteMC1.textContent="MC";
posteMC1.style.color="red"

const posteMC2=document.querySelector(" .col69");
posteMC2.textContent="MC";
posteMC2.style.color="red"

const posteMD=document.querySelector(" .col89");
posteMD.textContent="MD";
posteMD.style.color="red"

const posteBU1=document.querySelector(" .col33");
posteBU1.textContent="BU";
posteBU1.style.color="red"

const posteBU2=document.querySelector(" .col81");
posteBU2.textContent="BU";
posteBU2.style.color="red"

const btnAjouter = document.querySelector("#btn-ajouter");
const modal = document.querySelector("#modal-joueur");
const form = document.querySelector("#form-joueur");
const banc = document.querySelector("#banc");
const btnAnnuler = document.querySelector("#btn-annuler");
const btnFermer = document.querySelector("#btn-fermer")
const champNom = document.querySelector("#nom");
const champPoste = document.querySelector("#poste");
const champNumero = document.querySelector("#numero");
const erreurNom = document.querySelector("#erreur-nom");
const erreurPoste = document.querySelector("#erreur-poste");
const erreurNumero = document.querySelector("#erreur-numero");

let joueurs = [];

if (localStorage.getItem("joueurs")) {
    joueurs = JSON.parse(localStorage.getItem("joueurs"));
}

btnAjouter.addEventListener("click", function () {
    modal.style.display = "block";
});

    // fermeture de modal
function fermerModal () {
    modal.style.display="none"
}

btnAnnuler.addEventListener("click",fermerModal)
btnFermer.addEventListener("click",fermerModal)

document.addEventListener("keydown",function(event){
    if(event.key==="escape") {
        fermerModal();
    }
})

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        fermerModal();
    }
});



function afficherJoueurs() {
    banc.innerHTML = "";

    joueurs.forEach(function (joueur) {
        const carte = document.createElement("div");
        carte.classList.add("joueur");

        const numero = document.createElement("span");
        numero.textContent = joueur.numero;

        const nom = document.createElement("h3");
        nom.textContent = joueur.nom;

        const poste = document.createElement("p");
        poste.textContent = joueur.poste;

        if (joueur.poste === "GB") {
            poste.style.color = "yellow";
        } else if (
            joueur.poste === "DG" ||
            joueur.poste === "DC" ||
            joueur.poste === "DD"
        ) {
            poste.style.color = "blue";
        } else if (
            joueur.poste === "MG" ||
            joueur.poste === "MC" ||
            joueur.poste === "MD"
        ) {
            poste.style.color = "green";
        } else if (
            joueur.poste === "BU"
        ) {
            poste.style.color = "red";
        }

        carte.append(numero, nom, poste);
        banc.appendChild(carte);
    });
}


afficherJoueurs();

function validerNom() {
    const nom = champNom.value.trim();
    const nomValide = /^[\p{L}][\p{L} '-]{1,28}[\p{L}]$/u.test(nom);


if (nom === "") {
    erreurNom.textContent = "Le nom est obligatoire.";
} else if (!nomValide) {
    erreurNom.textContent = "Le nom doit contenir 3 à 30 caractères.";
} else {
    erreurNom.textContent = "";
}

champNom.setAttribute("aria-invalid", !nomValide);
return nomValide;

}

function validerPoste() {
    const posteValide = champPoste.value !== "";

    erreurPoste.textContent = posteValide ? "" : "Le poste est obligatoire.";
    champPoste.setAttribute("aria-invalid", String(!posteValide));
    return posteValide;
}

function validerNumero() {
    const valeur = champNumero.value;
    const numeroValide = /^(?:[1-9]|[1-9]\d)$/.test(valeur);
    const numeroDejaUtilise = numeroValide
        && joueurs.some(joueur => Number(joueur.numero) === Number(valeur));

    erreurNumero.textContent = !valeur
        ? "Le numéro est obligatoire."
        : (!numeroValide
            ? "Le numéro doit être un entier compris entre 1 et 99."
            : (numeroDejaUtilise ? "Ce numéro est déjà attribué." : ""));
    champNumero.setAttribute("aria-invalid", String(!numeroValide || numeroDejaUtilise));
    return numeroValide && !numeroDejaUtilise;
}

champNom.addEventListener("input", validerNom);
champPoste.addEventListener("change", validerPoste);
champNumero.addEventListener("input", validerNumero);

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomValide = validerNom();
    const posteValide = validerPoste();
    const numeroValide = validerNumero();
    const formulaireValide = nomValide && posteValide && numeroValide;
    if (!formulaireValide) {
        return;
    }

    const nom = champNom.value.trim();
    const poste = champPoste.value;
    const numero = Number(champNumero.value);

    const joueur = {
        nom: nom,
        poste: poste,
        numero: numero
    };

    joueurs.push(joueur);

    localStorage.setItem("joueurs", JSON.stringify(joueurs));

    afficherJoueurs();

    form.reset();
    [champNom, champPoste, champNumero].forEach(champ => champ.removeAttribute("aria-invalid"));
    [erreurNom, erreurPoste, erreurNumero].forEach(erreur => erreur.textContent = "");
    modal.style.display = "none";
});