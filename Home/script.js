import {baseURL} from "../conexao_servidor.js";
import {myHeaders} from "../headers.js"

const token = localStorage.getItem("@token-usuario");

if(!token){
    window.location.replace("../login/index.html");
}

const img_perfil_usuario = document.querySelector("#img-perfil-usuario");

img_perfil_usuario.addEventListener('click', ()=>{
    window.location.href = '../tela_perfil/index.html';
})

async function curtir(id) {
    localStorage.setItem(`likeCount${id}`, true);
    const body = JSON.stringify({curtida:true})
    await fetch(`${baseURL}/receita/${id}/curtida`,{
        method:"PATCH",
        body:body,
        headers:myHeaders
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
}

async function getreceita(){
    
    const res = await fetch(`${baseURL}/receita`, 
    {
        headers: myHeaders,
        method: "GET"
    })

    const receitas = await res.json()
    localStorage.setItem("receitas",JSON.stringify(receitas))
    const ul = document.querySelector("ul")
    ul.innerHTML=""
    receitas.forEach(receita => {
        
        ul.insertAdjacentHTML("beforeend",`
        <li>
            <div>
                <img id="img-perfil-receita${receita.id}"src="https://i.pinimg.com/550x/fd/b0/50/fdb050d4b24a2d0afacbf934113b0112.jpg" alt=""class="fotoperfil">
                    <h3>
                         ${receita.titulo}
                    </h3>
            </div>
                <img src="${receita.imagem}" alt="Imagem da Receita">
                    <div class="botao" id="desc${receita.id}">
                        <button><a href="https://api.whatsapp.com/send?text=[${receita.titulo}]">Compartilhar</a></button>    
                        <button id="likeBtn${receita.id}">Curtir<span id="likeCount">${receita.curtida}</span></button>                        
                        <button class="vermais" id="ver${receita.id}">Ver Mais</button>                              
                    </div>
        </li>`);

        const imgReceita = document.querySelector(`#img-perfil-receita${receita.id}`)
        imgReceita.addEventListener("click",()=>{
            console.log(receita.id)
            localStorage.setItem("seleciona_receita", receita.id)
            location.href = "/tela_receita"
        });

        const btn_ver_mais = document.getElementById(`ver${receita.id}`)
        btn_ver_mais.addEventListener("click",()=>{
            btn_ver_mais.setAttribute("style","display:none;")
            const div = document.getElementById(`desc${receita.id}`)
            div.insertAdjacentHTML("beforeend", `  <li class="preview"><p>${receita.descricao}</p></li> `)
        });


        const btncurtir = document.getElementById(`likeBtn${receita.id}`)
        btncurtir.addEventListener("click", () => {
            const curtido = localStorage.getItem(`likeCount${receita.id}`)
            if (curtido) {
                descurtir(receita.id);
                btncurtir.classList.remove('curtido');
            } else {
                curtir(receita.id);
                btncurtir.classList.add('curtido');
            }
        });
    })
}
 getreceita()
