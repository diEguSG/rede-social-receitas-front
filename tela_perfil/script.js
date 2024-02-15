import {baseURL} from "../conexao_servidor.js";
import {modal_atualizar_cadastro} from "../atualizar_cadastro/script.js";
import {modal_confirmar_exclusao} from "../modal.js";
import {myHeaders} from "../headers.js";

async function carregarTelaPerfil(){
    
    const usuario = {
        id_usuario: localStorage.getItem("@id-usuario")
    }

    const usuario_json = JSON.stringify(usuario);

    const res = await fetch(`${baseURL}/atualizar_cadastro`,
    {
        headers: myHeaders,
        method: "POST",
        body: usuario_json
    });

    const res_json = await res.json();
    const dados_usuario = res_json.usuario;

    const div = document.querySelector(".profile-container");

    div.insertAdjacentHTML("afterbegin", `
        <div class="profile-header">

            <img src="" alt="Usuário">

            <div class="div-detalhes-usuario">
                <h1 id="h1-nome-usuario">${dados_usuario.nome}</h1>
                <p id="p-contador-curtidas">22 Curtidas</p>
                <button id="btn-editar-perfil">Editar Perfil</button>
            </div>

        </div>
    `);
    
    const btn_editar_perfil = document.querySelector("#btn-editar-perfil");

    btn_editar_perfil.addEventListener('click', ()=>{
        modal_atualizar_cadastro();
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

    console.log("descurtir");
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
    
    console.log("descurtir");
}

async function carregarPostagens(){

    const usuario = {
        id_usuario:  localStorage.getItem("@id-usuario")
    }

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
        const admin = localStorage.getItem("@tipo-usuario")
        const ul = document.querySelector("ul")
        
        receitas.forEach(receita => {
            
            ul.insertAdjacentHTML("beforeend",`
                <li id="${receita.id}">
                    <div>
                        <h3>
                            ${receita.titulo}
                        </h3>
                    </div>

                    <div id="icone-lixeira-${receita.id}">
                        ${admin == 1 ? "<img src='https://cdn-icons-png.flaticon.com/512/3976/3976956.png' alt='icone-lixeira'>" : ""}
                    </div>

                    <img src="${receita.imagem} alt="Imagem da Receita">

                    <div class="botao" id="div-descricao-${receita.id}">
                        <button><a href="https://api.whatsapp.com/send?text=[${receita.titulo}]">Compartilhar</a></button>    
                        <button id="btn-curtida-${receita.id}">Curtir <span id="contador-curtida">0</span></button>                        
                        <button class="ver-mais" id="btn-ver-mais-${receita.id}">Ver Mais</button>                              
                    </div>
                </li>`);

            const btn_ver_mais = document.getElementById(`btn-ver-mais-${receita.id}`)
            
            btn_ver_mais.addEventListener("click",()=>{
                btn_ver_mais.setAttribute("style","display:none;")
                const div = document.getElementById(`div-descricao-${receita.id}`)
                div.insertAdjacentHTML("beforeend", `  <li><p>${receita.descricao}</p></li>`)  
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

            img_icone_lixeira.addEventListener('click', ()=>{
                deletarPostagem(receita.id);
            });
        });
    };
};

async function deletarPostagem(id){
    modal_confirmar_exclusao(id, "admin")
}

carregarTelaPerfil();
carregarPostagens();