import {baseURL} from "../conexao_servidor.js";

const myHeaders = {
    "Content-Type": "application/json"
}

async function gettela_receita(){
    const id = localStorage.getItem("seleciona_receita")
    const res = await fetch(`${baseURL}/receita/${id}`)
    const receita = await res.json()
    console.log(receita)
    console.log(id)
    const ul = document.querySelector('ul')
        ul.insertAdjacentHTML("beforeend",`
        <li>
            <a href="/Home">Voltar</a>
            <div>
                <img id="img-perfil-receita${id}"src="https://i.pinimg.com/550x/fd/b0/50/fdb050d4b24a2d0afacbf934113b0112.jpg" alt=""class="fotoperfil">
                    <h3>
                         Hambúrger
                    </h3>
            </div>
                <img src="https://s2-casavogue.glbimg.com/GRF9KCq-1hiz5uSs-xX9Go_KqIc=/0x0:2048x1365/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2022/p/X/eb4KQdToys327cGqnRGg/receita-ceboloni-bacon.jpg" alt="Receita de Hambúrger Artesanal">
                <div class="descricao" id="desc${id}">
                <p>${receita.descricao}</p>                                   
                </div>
        </li>`)  
}
gettela_receita()

