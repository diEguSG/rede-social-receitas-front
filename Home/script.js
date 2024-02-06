import {baseURL} from "../conexao_servidor.js"

const token = localStorage.getItem("@token-usuario");

if(!token){
    window.location.replace("../index.html");
}

const img_perfil_usuario = document.querySelector("#img-perfil-usuario");

img_perfil_usuario.addEventListener('click', ()=>{
    window.location.href = '../tela_perfil/index.html';
})


function curtir() {
    let likeCount = parseInt(localStorage.getItem(`likeCount${id}`)) || 0; 
    console.log(likeCount)
    likeCount++;
    localStorage.setItem(`likeCount${id}`, likeCount);
    document.getElementById(`likeBtn${id}`).innerText = 'Curtir ' + likeCount;
}

async function getreceita(){
    const res = await fetch(`${baseURL}/receita`)
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
                    <div class="botao" id="desc${element.id}">
                        <button><a href="https://api.whatsapp.com/send?text=[Hambúrger Caseiro]">Compartilhar</a></button>    
                        <button id="likeBtn${element.id}" onclick="curtir(${element.id})">Curtir <span id="likeCount">0</span></button>                        
                        <button class="vermais" id="ver${element.id}">Ver Mais</button>                              
                    </div>
        </li>`)
        const btnvermais = document.getElementById(`ver${element.id}`)
        btnvermais.addEventListener("click",()=>{
        btnvermais.setAttribute("style","display:none;")
        const div = document.getElementById(`desc${element.id}`)
        div.insertAdjacentHTML("beforeend", `  <li><p>${element.descricao}</p></li> `)
       
    });
   
   
    })
}

 getreceita()
