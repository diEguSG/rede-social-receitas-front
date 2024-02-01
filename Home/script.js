
let likeCount = localStorage.getItem('likeCount') || 0;
document.getElementById('likeCount').innerText = likeCount;

function curtir() {
    likeCount++;
    localStorage.setItem('likeCount', likeCount);
    document.getElementById('likeCount').innerText = likeCount;
}

const btnvermais = document.querySelector(".vermais")
btnvermais.addEventListener("click",()=>{
    btnvermais.setAttribute("style","display:none;")
    const div = document.querySelector(".botao")
    div.insertAdjacentHTML("beforeend", `<p>Ingredientes:Pão de hambúrguer,Carne moída com 20 a 25% de gordura (Sugestão: Fraldinha),Sal a gosto,Queijo prato,Cebola,Azeite,Açúcar mascavo,Maionese,Fatias de Bacon</p> `)

})

