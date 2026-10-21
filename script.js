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









