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

let joueurs=[];

btnAjouter.addEventListener("click", function () {
    modal.style.display = "block";
});

btnAnnuler.addEventListener("click", function () {
    modal.style.display = "none";
});


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nom = document.querySelector("#nom").value.trim();
    const poste = document.querySelector("#poste").value;
    const numero = Number(document.querySelector("#numero").value);

    if (!nom || !poste || numero < 1 || numero > 99) {
        alert("Veuillez remplir correctement tous les champs.");
        return;
    }

    const joueur = {
        nom: nom,
        poste: poste,
        numero: numero
    };

    joueurs.push(joueur);

    const carte = document.createElement("div");
    carte.classList.add("joueur");

    const nomJoueur = document.createElement("h3");
    nomJoueur.textContent = joueur.nom;

    const infoJoueur = document.createElement("p");
    infoJoueur.textContent = `${joueur.poste} - N° ${joueur.numero}`;

    carte.append(nomJoueur, infoJoueur);
    banc.appendChild(carte);

    form.reset();
    modal.style.display = "none";
});










