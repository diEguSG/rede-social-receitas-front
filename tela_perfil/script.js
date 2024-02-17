import {baseURL} from "../conexao_servidor.js";
import {modal_atualizar_cadastro} from "../atualizar_cadastro/script.js";
import {modal_confirmar_bloqueio, modal_confirmar_exclusao} from "../modal.js";
import {myHeaders} from "../headers.js";

const admin = localStorage.getItem("@tipo-usuario");

async function carregarTelaPerfil(){
    
    const usuario = {}
    const receita = localStorage.getItem("seleciona_receita");

    if(receita){
        const res = await fetch(`${baseURL}/receita/${receita}`,
        {
            headers: myHeaders,
            method: "GET",
        });

        const res_json = await res.json();
        
        usuario.id_usuario = res_json.id_usuario;
        usuario.outro_perfil = true;
        localStorage.setItem("@id-perfil", usuario.id_usuario);
    }
    else{
        usuario.id_usuario = localStorage.getItem("@id-usuario"); 
        usuario.outro_perfil = false; 
        localStorage.setItem("@id-perfil", usuario.id_usuario); 
    }

    const res_usuario = await fetch(`${baseURL}/cadastro/${usuario.id_usuario}`,
    {
        headers: myHeaders,
        method: "GET"
    });

    const res_receita = await fetch(`${baseURL}/receita_usuario/${usuario.id_usuario}`,{
        headers: myHeaders,
        method: "GET"
    })

    const res_usuario_json = await res_usuario.json();
    const dados_usuario = res_usuario_json.usuario;

    const res_receita_json = await res_receita.json();
    const dados_receita = res_receita_json.receita;

    const div = document.querySelector(".profile-container");

    div.insertAdjacentHTML("afterbegin", `
        <div class="profile-header">

            <img src="${dados_usuario.imagem_perfil}" alt="Usuário">

            <div class="div-detalhes-usuario">
                <h1 id="h1-nome-usuario">${dados_usuario.nome}</h1>
                <p id="p-contador-curtidas">${dados_receita.curtida} Curtidas</p>
                ${usuario.outro_perfil == true ? "" : "<button id='btn-editar-perfil'>Editar Perfil</button>"}
                
                <div id="icone-bloquear-${dados_usuario.id}">
                    ${admin == 1 ? "<img src='https://cdn-icons-png.flaticon.com/512/25/25173.png' alt='icone-bloquear'>" : ""}
                </div>
            </div>

        </div>
    `);
    
    if(!usuario.outro_perfil){
        const btn_editar_perfil = document.querySelector("#btn-editar-perfil");

        btn_editar_perfil.addEventListener('click', ()=>{
            modal_atualizar_cadastro();
        })
    }

    const img_bloquear_perfil = document.getElementById(`icone-bloquear-${dados_usuario.id}`)
    img_bloquear_perfil.classList.add("icone-bloquear")

    img_bloquear_perfil.addEventListener('click', ()=>{
        bloquearUsuario(dados_usuario.id)
    })
}

async function curtir(id) {
    localStorage.setItem(`likeCount${id}`, true);
    const body = JSON.stringify({curtida:true})
    await fetch(`${baseURL}/receita/${id}/curtida`,{
        method:"PATCH",
        body:body,
        headers:myHeaders
    })
        await carregarPostagens();
}
async function descurtir(id) {
    localStorage.removeItem(`likeCount${id}`);
        const body = JSON.stringify({ curtida: false });

        await fetch(`${baseURL}/receita/${id}/curtida`, {
            method: "PATCH",
            body: body,
            headers: myHeaders
        });
        await carregarPostagens();
}

async function carregarPostagens(){

    const usuario = {
        id_usuario: localStorage.getItem("@id-perfil")
    }

    console.log(usuario);

    const usuario_json = JSON.stringify(usuario);

    const res = await fetch(`${baseURL}/receita_usuario`,
    {
        headers: myHeaders,
        method: "POST",
        body: usuario_json
    })

    if(res.status == 200){
        const res_json = await res.json();
        const receitas = res_json.receita;
        const ul = document.querySelector("ul");
        ul.innerHTML="";
        receitas.forEach(receita => {
            
            ul.insertAdjacentHTML("beforeend",`
                <li id="${receita.id}">

                    </div>
                        <h3>
                            ${receita.titulo}
                        </h3>
                    </div>  

                    <div class="icone-lixeira" id="icone-lixeira-${receita.id}">
                        ${admin == 1 ? "<img src='https://cdn-icons-png.flaticon.com/512/3976/3976956.png' alt='icone-lixeira'>" : ""}
                    </div>

                    <img src="${receita.imagem}" alt="Imagem da Receita" id="img-receita">

                    <div class="botao" id="div-descricao-${receita.id}">
                        <button class="link"><a href="https://api.whatsapp.com/send?text=[${receita.titulo}]">Compartilhar</a></button>    
                        <button id="btn-curtida-${receita.id}">Curtir <span id="contador-curtida">${receita.curtida}</span></button>                        
                        <button class="vermais" id="btn-ver-mais-${receita.id}">Ver Mais</button>                              
                    </div>
                </li>`);

            const btn_ver_mais = document.getElementById(`btn-ver-mais-${receita.id}`)
            
            btn_ver_mais.addEventListener("click",()=>{
                btn_ver_mais.setAttribute("style","display:none;")
                const div = document.getElementById(`div-descricao-${receita.id}`)
                div.insertAdjacentHTML("beforeend", `  <li class="preview"><p>${receita.descricao}</p></li>`)  
            });

            const btn_curtir = document.getElementById(`btn-curtida-${receita.id}`)
            
            btn_curtir.addEventListener("click", () => {
            const curtido = localStorage.getItem(`likeCount${receita.id}`)
                if (curtido) {
                    descurtir(receita.id);
                    btn_curtir.classList.remove('curtido');
                } else {
                    curtir(receita.id);
                    btn_curtir.classList.add('curtido');
                };
            });

            const img_icone_lixeira = document.getElementById(`icone-lixeira-${receita.id}`);
            img_icone_lixeira.classList.add("icone-lixeira")

            img_icone_lixeira.addEventListener('click', ()=>{
                deletarPostagem(receita.id);
            });
        });
    };
};

async function bloquearUsuario(id){
    modal_confirmar_bloqueio(id,"admin")
}

async function deletarPostagem(id){
    modal_confirmar_exclusao(id, "admin")
}

carregarTelaPerfil();
carregarPostagens();