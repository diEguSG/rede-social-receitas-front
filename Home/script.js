const token = localStorage.getItem("@token-usuario");

if(!token){
    window.location.replace("../index.html");
}

function curtir() {
    likeCount++;
    localStorage.setItem('likeCount', likeCount);
    document.getElementById('likeCount').innerText = likeCount;
}

async function getreceita(){
    const res = await fetch("http://localhost:3003/receita")
    const receita = await res.json()
    console.log(receita)
    const ul = document.querySelector("ul")
    receita.forEach(element => {
        console.log(element)
        ul.insertAdjacentHTML("beforeend",`
        <li>
            <div>
                <img src="https://i.pinimg.com/550x/fd/b0/50/fdb050d4b24a2d0afacbf934113b0112.jpg" alt=""class="fotoperfil">
                    <h3>
                            Hambúrger
                    </h3>
            </div>
                <img src="https://s2-casavogue.glbimg.com/GRF9KCq-1hiz5uSs-xX9Go_KqIc=/0x0:2048x1365/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2022/p/X/eb4KQdToys327cGqnRGg/receita-ceboloni-bacon.jpg" alt="Receita de Hambúrger Artesanal">
                    <div class="botao">
                        <button><a href="https://api.whatsapp.com/send?text=[Hambúrger Caseiro]">Compartilhar</a></button>    
                        <button id="likeBtn" onclick="curtir()">Curtir <span id="likeCount">0</span></button>                        
                        <button class="vermais">Ver Mais</button>                              
                    </div>
        </li>`)
    });
    
    let likeCount = localStorage.getItem('likeCount') || 0;
    document.getElementById('likeCount').innerText = likeCount;
    const btnvermais = document.querySelector(".vermais")
    btnvermais.addEventListener("click",()=>{
    btnvermais.setAttribute("style","display:none;")
    const div = document.querySelector(".botao")
    div.insertAdjacentHTML("beforeend", `<p>Ingredientes:Pão de hambúrguer,Carne moída com 20 a 25% de gordura (Sugestão: Fraldinha),Sal a gosto,Queijo prato,Cebola,Azeite,Açúcar mascavo,Maionese,Fatias de Bacon</p> `)

})
}
 getreceita()
