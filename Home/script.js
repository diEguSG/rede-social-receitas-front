import {myHeaders} from "../headers.js"
import {baseURL} from "../conexao_servidor.js";

const token = localStorage.getItem("@token-usuario");
const id_usuario = localStorage.getItem("@id-usuario");

if(!token){
    window.location.replace("../login/index.html");
}

const img_perfil_usuario = document.querySelector("#img-perfil-usuario");

img_perfil_usuario.addEventListener('click', () => {
    localStorage.setItem("@seleciona-id-usuario-receita", id_usuario);
    window.location.href = '../tela_perfil/index.html';
})

async function curtir(id) {
    localStorage.setItem(`likeCount${id}`, true);
    const body = JSON.stringify({ curtida: true })
    await fetch(`${baseURL}/receita/${id}/curtida`, {
        method: "PATCH",
        body: body,
        headers: myHeaders
    })
    await getreceita()
}
async function descurtir(id) {
    localStorage.removeItem(`likeCount${id}`);
    const body = JSON.stringify({ curtida: false });

    await fetch(`${baseURL}/receita/${id}/curtida`, {
        method: "PATCH",
        body: body,
        headers: myHeaders
    });
    await getreceita();
}

async function getreceita(){
    
    const res_receita = await fetch(`${baseURL}/receita`, 
    {
        headers: myHeaders,
        method: "GET"
    })

    const elements = await res_receita.json()
    localStorage.setItem("receitas",JSON.stringify(elements))
    const ul = document.querySelector("ul")
    ul.innerHTML=""
    elements.forEach(async (element) => {
       console.log(element)
       const res = await fetch(`${baseURL}/cadastro/${element.id_usuario}`,
        {
            headers: myHeaders,
            method: "GET"
        })  

        const res_usuario = await res.json();
      
        ul.insertAdjacentHTML("beforeend",`
        <li>
        <div class="div-pai">
        <div class="div-avatar_name">
        
        
        <img id="img-perfil-receita${element.id}" src="${res_usuario.usuario.imagem_perfil}" alt="" class="fotoperfil">
        <span class="nome-usuario">${res_usuario.usuario.nome}</span>
        <span class="data_criacao">${element.data_criacao}</span>
       
        </div>
        <h3>
            ${element.titulo}
        </h3>
        </div>
        <img src="${element.imagem}" alt="Imagem da Receita ${element.titulo}">
        <div class="botao" id="desc${element.id}">
        <button class="link"><a href="https://api.whatsapp.com/send?text=[${element.titulo}]">Compartilhar</a></button>
        <button id="likeBtn${element.id}">Curtir<span id="likeCount">${element.curtida}</span></button>
        <button class="vermais" id="ver${element.id}">Ver Mais</button>
        </div>
        </li>`)
        const imgReceita = document.querySelector(`#img-perfil-receita${element.id}`)
        imgReceita.addEventListener("click", () => {
            console.log(element.id)
            localStorage.setItem("seleciona_receita", element.id);
            localStorage.setItem("@seleciona-id-usuario-receita", element.id_usuario);
            window.location.href = '../tela_perfil/index.html';
        });

        const btn_ver_mais = document.getElementById(`ver${element.id}`)
        btn_ver_mais.addEventListener("click",()=>{
            btn_ver_mais.setAttribute("style","display:none;")
            const div = document.getElementById(`desc${element.id}`)
            div.insertAdjacentHTML("beforeend", `  <li class="preview"><p>${element.descricao}</p></li> `)
        });


        const btncurtir = document.getElementById(`likeBtn${element.id}`)
        btncurtir.addEventListener("click", () => {
            const curtido = localStorage.getItem(`likeCount${element.id}`)
            if (curtido) {
                descurtir(element.id);
                btncurtir.classList.remove('curtido');
            } else {
                curtir(element.id);
                btncurtir.classList.add('curtido');
            }
        });
        }
    )
    const btn_sair = document.querySelector("#img-icone-sair");
        btn_sair.addEventListener("click", () => {
            window.location.href = '../index.html';
            localStorage.clear();
    })
}
getreceita()