const token = localStorage.getItem("@token-usuario")

if(token){
    window.location.href = '../home/index.html';
}

import {baseURL} from "./conexao_servidor.js";
import {modal_resposta} from "./modal.js";
import {myHeaders} from "./headers.js";

const form = document.querySelector("form");

form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    login();
})

async function login(){
    const usuario = {
        email: document.querySelector("#inp-email").value,
        senha: document.querySelector("#inp-senha").value 
    }

    if(usuario.email == "" || usuario.senha == ""){
        modal_resposta("Favor, preencher os campos vazios!", "error")
        return true;  
    }

    const usuario_json = JSON.stringify(usuario);
    
    const res = await fetch(`${baseURL}/login`,
    {
        headers: myHeaders,
        method: "POST",
        body: usuario_json
    })   

    const res_json = await res.json();

    if(res.status == 200 && res_json.id_situacao_usuario == 1){
        modal_resposta("Usuário Autenticado!", "ok")
        localStorage.setItem("@token-usuario", res_json.acesso_token);
        localStorage.setItem("@id-usuario", res_json.id_usuario);
        localStorage.setItem("@tipo-usuario", res_json.tipo_usuario);
        setTimeout(()=>{
            window.location.href = '../home/index.html';
        }, 2000)    
    }
    else{

        if(res_json.id_situacao_usuario == 2){
            modal_resposta("Usuário bloqueado!", "bloqueio");
            return true;
        }

        modal_resposta("Usuário ou Senha Inválidos", "error")
    }
}
