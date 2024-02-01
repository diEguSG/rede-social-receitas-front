// import {baseURL} from "../conexao_servidor.js"

const form = document.querySelector("form");

const myHeaders = {
    "Content-Type": "application/json"
}

form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    cadastro();
})

async function cadastro(){

    const validar_usuario = {
        nome: document.querySelector("#inp-nome").value,
        sobrenome: document.querySelector("#inp-sobrenome").value,
        email_telefone: document.querySelector("#inp-email-telefone").value,
        senha: document.querySelector("#inp-senha").value,
        confirmar_senha: document.querySelector("#inp-confirmar-senha").value
    }

    const usuario_valido = [];

    console.log(validar_usuario.nome.toLowerCase())
    console.log(validar_usuario.sobrenome.toLowerCase())
    console.log(validar_usuario.nome.trim())
    console.log(validar_usuario.sobrenome.trim())

    console.log(validar_usuario.email_telefone.toLowerCase());


    let array = [];
    for(let i = 0; i < validar_usuario.sobrenome.length; i++){
        
        let teste = validar_usuario.sobrenome.slice(i);
        if(teste[0] == " "){
            let teste2 = teste.slice(1);
            array.push();
        }
    }

    console.log(array)
    function capitalizeFirstLetter(sobrenome) {
        console.log(sobrenome.charAt(0).toUpperCase() + sobrenome.slice(1))
        return sobrenome.charAt(0).toUpperCase() + sobrenome.slice(1);
    }

    capitalizeFirstLetter(validar_usuario.sobrenome);


    if(validar_usuario.nome == "" || validar_usuario.sobrenome == "" || validar_usuario.email_telefone == "" || validar_usuario.senha == "" || validar_usuario.confirmar_senha == ""){
        console.log("Campos em Brancos");   
    }

    if(validar_usuario.senha != validar_usuario.confirmar_senha){
        console.log("Senhas Diferentes")
    }

    for(let i = 0; i < 10; i++){
        if(validar_usuario.email_telefone.includes(i)){

            if(validar_usuario.email_telefone.includes("@")){
                //console.log("Email")
                
            }
            //console.log("Telefone")
            
        }
    }

    console.log(usuario_valido);

    const usuario_valido_json = JSON.stringify(usuario_valido)

    // const usuarioJson = JSON.stringify(usuario);
    
    // const res = await fetch(`${baseURL}/post`,
    // {
    //     headers: myHeaders,
    //     method: "POST",
    //     body: usuarioJson
    // })
}