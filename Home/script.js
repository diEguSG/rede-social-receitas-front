import { baseURL } from "../conexao_servidor.js"

const token = localStorage.getItem("@token-usuario");
const myHeaders = {
    "Content-Type": "application/json"
}
if (!token) {
    window.location.replace("../login/index.html");
}

const img_perfil_usuario = document.querySelector("#img-perfil-usuario");

img_perfil_usuario.addEventListener('click', () => {
    window.location.href = '../tela_perfil/index.html';
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

    console.log("descurtir");
}

async function getreceita() {
    const res = await fetch(`${baseURL}/receita`)

    const receita = await res.json()
    localStorage.setItem("receitas", JSON.stringify(receita))
    const ul = document.querySelector("ul")
    ul.innerHTML = ""
    receita.forEach(element => {
        console.log(element)
        ul.insertAdjacentHTML("beforeend", `
        <li>
        <div class="div-pai">
        <div class="div-avatar_name">
        <img id="img-perfil-receita${element.id}" src="https://th.bing.com/th/id/OIP.z1YYkhwNUvuguaRfYS-xXAHaF6?rs=1&pid=ImgDetMain" alt="" class="fotoperfil">
        <span class="nome-usuario">Ana Maria Braga</span>
        </div>
        
        <h3>
            Hambúrger
        </h3>
        </div>
        <img src="https://s2-casavogue.glbimg.com/GRF9KCq-1hiz5uSs-xX9Go_KqIc=/0x0:2048x1365/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2022/p/X/eb4KQdToys327cGqnRGg/receita-ceboloni-bacon.jpg" alt="Receita de Hambúrger Artesanal">
        <div class="botao" id="desc${element.id}">
        <button><a href="https://api.whatsapp.com/send?text=[Hambúrger Caseiro]">Compartilhar</a></button>
        <button id="likeBtn${element.id}">Curtir<span id="likeCount">${element.curtida}</span></button>
        <button class="vermais" id="ver${element.id}">Ver Mais</button>
        </div>
        </li>`)
        const imgReceita = document.querySelector(`#img-perfil-receita${element.id}`)
        imgReceita.addEventListener("click", () => {
            console.log(element.id)
            localStorage.setItem("seleciona_receita", element.id)
            location.href = "/tela_receita"
        })
        const btn_ver_mais = document.getElementById(`ver${element.id}`)
        btn_ver_mais.addEventListener("click", () => {
            btn_ver_mais.setAttribute("style", "display:none;")
            const div = document.getElementById(`desc${element.id}`)
            div.insertAdjacentHTML("beforeend", `  <li class="preview"><p>${element.descricao}</p></li> `)
        })


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
    })
}
getreceita()
