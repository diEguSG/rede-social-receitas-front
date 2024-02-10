import {baseURL} from "../conexao_servidor.js";

const img_perfil_receita = document.querySelector("#img-perfil-receita");

img_perfil_receita.addEventListener('click', ()=>{
    window.location.href = './Home';
})

const myHeaders = {
    "Content-Type": "application/json"
}
async function detalhesPostagens(){

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

};

carregarPostagens();