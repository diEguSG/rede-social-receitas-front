import {baseURL} from "../conexao_servidor.js";

const myHeaders = {
    "Content-Type": "application/json"
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
        console.log(receitas);
        const admin = localStorage.getItem("@tipo-usuario")
        const ul = document.querySelector("ul")
        receitas.forEach(receita => {
            console.log(receita)
            ul.insertAdjacentHTML("beforeend",`
                <li id="${receita.id}">
                    <div>
                        <h3>
                            ${receita.titulo}
                        </h3>
                    </div>
                    ${admin && "<p>Excluir</p>"}
                    <img src="${receita.imagem}" alt="Imagem da Receita">

                    <div class="botao" id="div-descricao-${receita.id}">
                        <button><a href="https://api.whatsapp.com/send?text=[Hambúrger Caseiro]">Compartilhar</a></button>    
                        <button id="btn-curtida-${receita.id}" onclick="curtir(${receita.id})">Curtir <span id="contador-curtida">0</span></button>                        
                        <button class="ver-mais" id="btn-ver-mais-${receita.id}">Ver Mais</button>                              
                    </div>
                </li>`)

            const btn_ver_mais = document.getElementById(`btn-ver-mais-${receita.id}`)
            btn_ver_mais.addEventListener("click",()=>{
            btn_ver_mais.setAttribute("style","display:none;")
            const div = document.getElementById(`div-descricao-${receita.id}`)
            div.insertAdjacentHTML("beforeend", `  <li><p>${receita.descricao}</p></li> `)  
            });
        });
    };
};

carregarPostagens();