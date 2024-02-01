import {baseURL} from "../conexao_servidor.js";

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

    const usuario_json = JSON.stringify(usuario);
    
    const res = await fetch(`${baseURL}/login`,
    {
        headers: myHeaders,
        method: "POST",
        body: usuario_json
    })   
}
