import {myHeaders} from "../headers.js"
import {baseURL} from "../conexao_servidor.js";
import {modal_resposta} from "../modal.js";

const token = localStorage.getItem("@token-usuario");
const id_usuario = localStorage.getItem("@id-usuario");
const tipo_usuario = localStorage.getItem("@tipo-usuario");

if(!token){
    window.location.replace("../index.html");
}

const img_perfil_usuario = document.querySelector("#img-perfil-usuario");

img_perfil_usuario.addEventListener('click', () => {
    localStorage.setItem("@seleciona-id-usuario-receita", id_usuario);
    window.location.href = '../tela_perfil/index.html';
})

const btn_criar_receita = document.querySelector("#btn-criar-receita");

btn_criar_receita.addEventListener('click', () => {
    criar_receita();
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
       const res = await fetch(`${baseURL}/cadastro/${element.id_usuario}`,
        {
            headers: myHeaders,
            method: "GET"
        })  

        const res_usuario = await res.json();

        if(element.id_usuario != id_usuario){
            if(res_usuario.usuario.id_situacao_usuario == 1){
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
                <button class="link"><a target="_blank" href="https://api.whatsapp.com/send?text=[https://www.tudogostoso.com.br/receita/2477-pastel-de-forno.html]">Compartilhar</a></button>
                <button id="likeBtn${element.id}">Curtir <span id="likeCount">${element.curtida}</span></button>
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
            }
            
            if(tipo_usuario == 1){
                if(res_usuario.usuario.id_situacao_usuario == 2){
                    ul.insertAdjacentHTML("beforeend",`
                        <li>
                        <div class="div-pai">
                        <div class="div-avatar_name">
                        
                        
                        <img id="img-perfil-receita${element.id}" src="${res_usuario.usuario.imagem_perfil}" alt="" class="fotoperfil">
                        <span class="nome-usuario">${res_usuario.usuario.nome} - Bloqueado</span>
                    
                        </div>
                        </li>`
                    );
                    const imgReceita = document.querySelector(`#img-perfil-receita${element.id}`)
                    imgReceita.addEventListener("click", () => {
                    console.log(element.id)
                    localStorage.setItem("seleciona_receita", element.id);
                    localStorage.setItem("@seleciona-id-usuario-receita", element.id_usuario);
                    window.location.href = '../tela_perfil/index.html';
                });
                }
            }   
        }
    )
    const btn_sair = document.querySelector("#img-icone-sair");
        btn_sair.addEventListener("click", () => {
            window.location.href = '../index.html';
            localStorage.clear();
    })
}
getreceita()


async function criar_receita(){
    
    
    const usuario = {
        id_usuario:  localStorage.getItem("@id-usuario")
    }

    const res = await fetch(`${baseURL}/cadastro/${usuario.id_usuario}`,
    {
        headers: myHeaders,
        method: "GET"
    })

    const res_json = await res.json();
    const dados_usuario = res_json.usuario;

    const main = document.querySelector("main");

    main.insertAdjacentHTML("afterbegin",`
        <div class="modal-src">
            <form method="post" class="modal" id="modal">
            
                <div class="div-cabecalho">
                    <h1 id="h1-criar-receita">Receita</h1>
                    <button id="btn-fechar-modal">X</button>
                </div>

                <div id="div-inputs">
                    <label for="inp-titulo">Título</label>
                    <input type="text" id="inp-titulo">

                    <label for="txtarea-descricao">Descrição</label>
                    <textarea name="" id="txtarea-descricao" cols="30" rows="10"></textarea>

                    <label for="inp-imagem">Imagem</label>
                    <input type="text" id="inp-imagem" placeholder="URL">
                </div>
            
                <button type="submit" id="btn-publicar">Publicar</button>
            </form>
            
        </div>
    `)

    const form = document.querySelector("form");

    form.addEventListener('submit', async(event)=>{
        event.preventDefault();

        if(document.querySelector("#inp-titulo").value == ""){
            modal_resposta("O título não pode estar vazio!", "error");
            return true;   
        }

        if(document.querySelector("#txtarea-descricao").value == ""){
            modal_resposta("A receita precisa ter uma descrição!", "error");
            return true;   
        }

        const dados = {
            id_usuario: dados_usuario.id,
            id_categoria: 1,
            titulo: document.querySelector("#inp-titulo").value,
            descricao: document.querySelector("#txtarea-descricao").value.toString()
        }

        if(document.querySelector("#inp-imagem").value == ""){
            dados.imagem = "https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg/image" 
        }
        else{
            dados.imagem = document.querySelector("#inp-imagem").value;
        }

        const dados_json = JSON.stringify(dados)

        const res_receita = await fetch(`${baseURL}/receita`,
        {
            headers: myHeaders,
            method: "POST",
            body: dados_json
        })

        if(res_receita.status == 200){
           modal_resposta("Receita criada com sucesso!", "ok")
            setTimeout(()=>{
            window.location.reload();
        }, 2000)          
        }
    })

    const div = document.querySelector(".modal-src")
    const btn_fechar_modal = document.querySelector("#btn-fechar-modal");

    btn_fechar_modal.addEventListener('click', ()=>{
        main.removeChild(div)
        getreceita();
    })
}