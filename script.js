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
const compteur = document.querySelector("#players-count");
const message = document.querySelector("#message");
let minuterieMessage;

function afficherMessage(texte, type) {
    clearTimeout(minuterieMessage);

    message.textContent = texte;
    message.className = "block p-2.5 my-2.5 rounded";

    if (type === "succes") {
        message.classList.add("bg-green-200", "text-green-800");
    } else {
        message.classList.add("bg-red-200", "text-red-800");
    }

    minuterieMessage = setTimeout(function () {
        message.className = "hidden";
        message.textContent = "";
    }, 3000);
}

let joueurs = [];
let joueurAModifier = null;

const positions = {
    GB : ".col37" ,
    DG : ".col16" ,
    DC1: ".col36" ,
    DC2: ".col66" ,
    DD : ".col102" ,
    MG : ".col19" ,
    MC1: ".col40" ,
    MC2: ".col69" ,
    MD : ".col89" ,
    BU1 :".col33" ,
    BU2 : ".col81"
};

const postesCompatibles = {
    GB: ["GB"],
    DG: ["DG"],
    DC: ["DC1", "DC2"],
    DD: ["DD"],
    MG: ["MG"],
    MC: ["MC1", "MC2"],
    MD: ["MD"],
    BU: ["BU1", "BU2"]
};


function afficherTerrain() {
    for (const position in positions) {
        const terrain = document.querySelector(positions[position]);

        const joueur = joueurs.find(function (j) {
            return j.position === position;
        });

        if (joueur) {
            terrain.textContent =
                joueur.numero + " - " + joueur.nom + " (Occupée)";
        } else {
            terrain.textContent = position + " (Libre)";
        }
    }
}

// compteur
function afficherCompteur() {
    compteur.textContent = joueurs.length + " joueurs";
}
afficherCompteur();

function afficherCompteurTerrain() {
    const joueursTerrain = joueurs.filter(function (joueur) {
        return joueur.position !== "";
    });

    const nombreTerrain = joueursTerrain.length;
    const nombreBanc = joueurs.length - nombreTerrain;

    console.log("Joueurs sur le terrain :", nombreTerrain);
    console.log("Joueurs sur le banc :", nombreBanc);
}




if (localStorage.getItem("joueurs")) {
    joueurs = JSON.parse(localStorage.getItem("joueurs"));
}

// Ajouter une position vide aux anciens joueurs
joueurs.forEach(function (joueur) {
    if (!joueur.position) {
        joueur.position = "";
    }
});

btnAjouter.addEventListener("click", function () {
    joueurAModifier = null;
    form.reset();
    modal.classList.remove("hidden");
});


    // fermeture de modal

function viderErreurs() {
    erreurNom.textContent = "";
    erreurPoste.textContent = "";
    erreurNumero.textContent = "";
}

function fermerModal() {
    modal.classList.add("hidden");
    form.reset();
    viderErreurs();
}


btnAnnuler.addEventListener("click",fermerModal)
btnFermer.addEventListener("click",fermerModal)

document.addEventListener("keydown",function(event){
    if(event.key==="Escape") {
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

        if (joueur.position) {
            carte.classList.add("opacity-50");
        }

        // Numéro du joueur
        const numero = document.createElement("span");
        numero.textContent = joueur.numero;

        // Nom du joueur
        const nom = document.createElement("h3");
        nom.textContent = joueur.nom;

        // Poste du joueur
        const poste = document.createElement("p");
        poste.textContent = joueur.poste;

        if (joueur.poste === "GB") {
            poste.style.color = "yellow";
        } else if (["DG", "DC", "DD"].includes(joueur.poste)) {
            poste.style.color = "blue";
        } else if (["MG", "MC", "MD"].includes(joueur.poste)) {
            poste.style.color = "green";
        } else if (joueur.poste === "BU") {
            poste.style.color = "red";
        }

        // Choisir une position
        const select = document.createElement("select");

        select.innerHTML = '<option value="">Sur le banc</option>';

        const postes = postesCompatibles[joueur.poste] || [];

        postes.forEach(function (position) {
            select.innerHTML +=
                '<option value="' + position + '">' + position + '</option>';
        });

        select.value = joueur.position || "";

        // Bouton Modifier
        const btnModifier = document.createElement("button");
        btnModifier.textContent = "Modifier";
        btnModifier.type = "button";


    btnModifier.addEventListener("click", function () {
    joueurAModifier = joueur;
    champNom.value = joueur.nom;
    champPoste.value = joueur.poste;
    champNumero.value = joueur.numero;

    modal.classList.remove("hidden");
});


        // Bouton Supprimer
        const btnSupprimer = document.createElement("button");
        btnSupprimer.textContent = "Supprimer";
        btnSupprimer.type = "button";

        btnSupprimer.addEventListener("click", function () {
            const confirmation = confirm(
                "Voulez-vous supprimer " + joueur.nom + " ?"
            );

            if (confirmation) {
                joueurs = joueurs.filter(function (j) {
                    return j !== joueur;
                });

                localStorage.setItem(
                    "joueurs",
                    JSON.stringify(joueurs)
                );

                afficherJoueurs();
                afficherTerrain();
                afficherCompteur();
            }
        });

        // Ajouter les éléments à la carte
        carte.append(
            numero,
            nom,
            poste,
            select,
            btnModifier,
            btnSupprimer
        );

        banc.appendChild(carte);
    });
}





afficherJoueurs();
afficherTerrain();
afficherCompteur();
banc.addEventListener("change" ,function(event){
    if (event.target.tagName !== "SELECT") {
        return;
    }

    const carte = event.target.closest(".joueur");
    const numero = Number(carte.querySelector("span").textContent);

    const joueur = joueurs.find(function (j) {
        return Number(j.numero) === numero;
    });

    const position = event.target.value;
    if (
    position !== "" &&
    !postesCompatibles[joueur.poste].includes(position)) {
    alert("Ce poste ne correspond pas au joueur !");
    afficherJoueurs();
    return;
}

  const occupe = joueurs.some(function (j) {
    return j.position === position &&
        j !== joueur &&
        position !== "";
});

    if (occupe) {
        alert("Cette position est déjà occupée !");
        afficherJoueurs();
        return;
    }

    joueur.position = position;

    localStorage.setItem("joueurs", JSON.stringify(joueurs));

    afficherTerrain();

    afficherJoueurs();

    afficherCompteur();
    afficherCompteurTerrain();

}) 

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

    const numeroDejaUtilise = joueurs.some(function (joueur) {
        return Number(joueur.numero) === Number(valeur)
            && joueur !== joueurAModifier;
    });

    if (valeur === "") {
        erreurNumero.textContent = "Le numéro est obligatoire.";
    } else if (!numeroValide) {
        erreurNumero.textContent = "Le numéro doit être entre 1 et 99.";
    } else if (numeroDejaUtilise) {
        erreurNumero.textContent = "Ce numéro est déjà attribué.";
    } else {
        erreurNumero.textContent = "";
    }

    champNumero.setAttribute(
        "aria-invalid",
        String(!numeroValide || numeroDejaUtilise || valeur === "")
    );

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
        afficherMessage("Veuillez corriger les erreurs !", "erreur");
        return;
    }

    const nom = champNom.value.trim();
    const poste = champPoste.value;
    const numero = Number(champNumero.value);


if (joueurAModifier) {
    joueurAModifier.nom = nom;
    joueurAModifier.poste = poste;
    joueurAModifier.numero = numero;

    if (
        joueurAModifier.position &&
        !postesCompatibles[poste].includes(joueurAModifier.position)
    ) {
        joueurAModifier.position = "";
    }
}else {
    // Ajouter un nouveau joueur
    const joueur = {
        nom: nom,
        poste: poste,
        numero: numero,
        position: ""
    };

    joueurs.push(joueur);
}


    localStorage.setItem("joueurs", JSON.stringify(joueurs));

afficherJoueurs();
afficherTerrain();
afficherCompteur();
afficherMessage("Joueur enregistré avec succès !", "succes");

    form.reset();
    [champNom, champPoste, champNumero].forEach(champ => champ.removeAttribute("aria-invalid"));
    [erreurNom, erreurPoste, erreurNumero].forEach(erreur => erreur.textContent = "");
    joueurAModifier = null;
    modal.classList.add("hidden");
});


