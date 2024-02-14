import {baseURL} from "../conexao_servidor.js";
import {modal_resposta} from "../modal.js";
import {myHeaders} from "../headers.js";

const form = document.querySelector("form");

form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    cadastro();
})

async function cadastro(){

    const validar_usuario = {
        nome: document.querySelector("#inp-nome").value,
        sobrenome: document.querySelector("#inp-sobrenome").value,
        email: document.querySelector("#inp-email").value,
        senha: document.querySelector("#inp-senha").value,
        confirmar_senha: document.querySelector("#inp-confirmar-senha").value
    }

    if(validar_usuario.nome == "" || validar_usuario.sobrenome == "" || validar_usuario.email_telefone == "" || validar_usuario.senha == "" || validar_usuario.confirmar_senha == ""){
        modal_resposta("Favor, preencher os campos vazios!", "error");
        return true;   
    }

    if(validar_usuario.senha.length < 7){
        modal_resposta("Senha abaixo de 7 caracteres", "error");
        return true;
    }

    if(validar_usuario.senha != validar_usuario.confirmar_senha){
        modal_resposta("As senhas não conferem!", "error");
        return true;
    }

    validar_usuario.nome = validar_usuario.nome.toLowerCase();
    validar_usuario.nome = validar_usuario.nome.trim();
    validar_usuario.nome = validar_usuario.nome.charAt(0).toUpperCase() + validar_usuario.nome.slice(1)
    validar_usuario.sobrenome = validar_usuario.sobrenome.toLowerCase();
    validar_usuario.sobrenome = validar_usuario.sobrenome.trim();
    validar_usuario.sobrenome = validar_usuario.sobrenome.charAt(0).toUpperCase() + validar_usuario.sobrenome.slice(1)
    validar_usuario.email = validar_usuario.email.toLowerCase()
    validar_usuario.email = validar_usuario.email.trim();
    

    const usuario_valido = {
        nome: `${validar_usuario.nome} ${validar_usuario.sobrenome}`,
        email: validar_usuario.email,
        senha: validar_usuario.senha,
        id_tipo_usuario: 2,
        id_situacao_usuario: 1
    }

    const usuario_valido_json = JSON.stringify(usuario_valido);
    
    const res = await fetch(`${baseURL}/cadastro`,
    {
        headers: myHeaders,
        method: "POST",
        body: usuario_valido_json
    })

    if(res.status == 200){
        modal_resposta("Cadastro Realizado com Sucesso!", "ok")
        setTimeout(()=>{
            window.location.href = '../login/index.html';
        }, 2000)          
    }
    else{
        const res_json = await res.json();
        
        if(res.status == 409){
            modal_resposta(res_json.error_mail, "error")
        }
        else{
            modal_resposta("Ocorreu um erro Inesperado!", "error");
        }
    }
}