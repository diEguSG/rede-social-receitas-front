import {baseURL} from "../conexao_servidor.js";
import {modal_erro} from "../modal.js";

const form = document.querySelector("form");

const myHeaders = {
    "Content-Type": "application/json"
}

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
        modal_erro("Favor, preencher campos vazios!", "error")
        return true;  
    }

    const usuario_json = JSON.stringify(usuario);
    
    const res = await fetch(`${baseURL}/login`,
    {
        headers: myHeaders,
        method: "POST",
        body: usuario_json
    })   

    

    if(res.status == 200){

        const res_json = await res.json();
        localStorage.setItem("@token-usuario", res_json.acesso_token);

        if(res_json.tipo_usuario == 1){
            console.log("Login Admin")
        }   
        else{
            window.location.href = '../home/index.html';
        }   
    }
    else{
        modal_erro("Usuário ou Senha Inválidos", "error")
    }
}
