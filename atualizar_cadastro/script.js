import {baseURL} from "../conexao_servidor.js";
import {modal_resposta} from "../modal.js";
import {myHeaders} from "../headers.js"

const token = localStorage.getItem("@token-usuario")

if(!token){
    window.location.href = '../index.html';
}

async function carregar_dados_usuario(){
    const usuario = {
        id_usuario:  localStorage.getItem("@id-usuario")
    }

    const usuario_json = JSON.stringify(usuario);

    const res = await fetch(`${baseURL}/cadastro/${usuario.id_usuario}`,
    {
        headers: myHeaders,
        method: "GET"
    })

    const res_json = await res.json();
    const dados_usuario = res_json.usuario;

    return dados_usuario;
}

export async function modal_atualizar_cadastro(){

    const usuario = await carregar_dados_usuario();

    const main = document.querySelector("main");

    main.insertAdjacentHTML("afterbegin",`
        <div class="modal-src">
            <form method="post" class="modal" id="modal">
            
                <h1 id="h1-atualizar-cadastro">Atualizar Cadastro</h1>

                <div id="div-inputs">
                    <label for="inp-nome">Nome</label>
                    <input type="text" id="inp-nome" value="${usuario.nome}">
                    <label for="inp-telefone">Telefone</label>
                    <input type="number" id="inp-telefone" value="${usuario.telefone}">

                    <label for="inp-senha">Senha</label>
                    <input type="password" id="inp-senha">
                    <label for="inp-confirmar-senha">Confirmar Senha</label>
                    <input type="password" id="inp-confirmar-senha">
                </div>
            
                <button type="submit" id="btn-cadastrar">Atualizar</button>
            </form>
            <button id="btn-fechar-modal">X</button>
        </div>
    `)

    const form = document.querySelector("form");

    form.addEventListener('submit', async(event)=>{
        event.preventDefault();

        if(document.querySelector("#inp-nome").value == ""){
            modal_resposta("Nome do usuário não pode estar Vazio!", "error");
            return true;   
        }

        const dados_usuario = {
            id_usuario: usuario.id,
            nome: document.querySelector("#inp-nome").value,
            telefone: document.querySelector("#inp-telefone").value.toString()
        }

        if(document.querySelector("#inp-senha").value != "" || document.querySelector("#inp-confirmar-senha").value != ""){
            
            if(document.querySelector("#inp-senha").value.length < 7){
                modal_resposta("Senha abaixo de 7 caracteres", "error");
                return true;
            }

            if(document.querySelector("#inp-senha").value != document.querySelector("#inp-confirmar-senha").value){
                modal_resposta("As senhas não conferem!", "error");
                return true;
            }
            
            dados_usuario.senha = document.querySelector("#inp-senha").value;
        }
    

        atualizar_cadastro_usuario(dados_usuario);
    })

    const div = document.querySelector(".modal-src")
    const btn_fechar_modal = document.querySelector("#btn-fechar-modal");

    btn_fechar_modal.addEventListener('click', ()=>{
        main.removeChild(div)
    })
}

async function atualizar_cadastro_usuario(dados_usuario){

    const dados_usuario_json = JSON.stringify(dados_usuario);

    const res = await fetch(`${baseURL}/cadastro/${dados_usuario.id_usuario}`,
    {
        headers: myHeaders,
        method: "PATCH",
        body: dados_usuario_json
    })

    if(res.status == 200){
        modal_resposta("Perfil Atualizado!", "ok")
    }

}