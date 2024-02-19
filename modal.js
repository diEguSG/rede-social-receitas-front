import {baseURL} from "./conexao_servidor.js";
import {myHeaders} from "./headers.js"

export function modal_resposta(mensagem, situacao){
    const body  = document.querySelector("body");

    body.insertAdjacentHTML("afterbegin",`
        <div class="modal-src-resposta">
            <div class="modal-${situacao}" id="modal">
                <p>${mensagem}</p>
            </div>
        </div>
    `)

    const div = document.querySelector(".modal-src-resposta")

    if(situacao == "error"){       
        
        setTimeout(()=>{
            body.removeChild(div)
        }, 3000)
    }

    if(situacao == "ok"){

        setTimeout(()=>{
            body.removeChild(div)
        }, 2000)
        
    }
}

export function modal_confirmar_exclusao(id, situacao){
    const body  = document.querySelector("body");

    body.insertAdjacentHTML("afterbegin",`
        <div class="modal-src-resposta">
            <div class="modal-${situacao}" id="modal">
                <p>Deseja realmente prosseguir com a exlcusão?</p>
                <div>
                    <button id="btn-confirmar-exclusao">Sim</button>
                    <button id="btn-cancelar-exclusao">Não</button>
                </div>
            </div>
        </div>
    `)

    const div = document.querySelector(".modal-src-resposta")

    if(situacao == "admin"){      
        
        const btn_confirmar_exclusao = document.querySelector("#btn-confirmar-exclusao");
        const btn_cancelar_exclusao = document.querySelector("#btn-cancelar-exclusao");

        btn_confirmar_exclusao.addEventListener('click', async ()=>{
            const id_receita = {id};

            const id_receita_json = JSON.stringify(id_receita);

            console.log(id_receita_json);

            const res = await fetch(`${baseURL}/admin_deletar_postagem`, 
            {
                headers: myHeaders,
                method: "POST",
                body: id_receita_json
            });

            if(res.status == 204){
                window.location.reload();
            }

        })

        btn_cancelar_exclusao.addEventListener('click', ()=>{
            body.removeChild(div)
        })
    }
}

export function modal_confirmar_bloqueio(id, situacao){
    const body  = document.querySelector("body");

    body.insertAdjacentHTML("afterbegin",`
        <div class="modal-src-resposta">
            <div class="modal-${situacao}" id="modal">
                <p>Deseja realmente bloquear o usuário?</p>
                <div>
                    <button id="btn-confirmar-bloqueio">Sim</button>
                    <button id="btn-cancelar-bloqueio">Não</button>
                </div>
            </div>
        </div>
    `)

    const div = document.querySelector(".modal-src-resposta")

    if(situacao == "admin"){      
        
        const btn_confirmar_bloqueio = document.querySelector("#btn-confirmar-bloqueio");
        const btn_cancelar_bloqueio = document.querySelector("#btn-cancelar-bloqueio");

        btn_confirmar_bloqueio.addEventListener('click', async ()=>{
            
            const dados_usuario = {
                id_usuario: id,
                id_situacao_usuario: 2 
            };

            const dados_usuario_json = JSON.stringify(dados_usuario);

            const res = await fetch(`${baseURL}/cadastro/${dados_usuario.id_usuario}`, 
            {
                headers: myHeaders,
                method: "PATCH",
                body: dados_usuario_json
            });

            if(res.status == 204){
                location.reload();
            }

        })

        btn_cancelar_bloqueio.addEventListener('click', ()=>{
            body.removeChild(div)
        })
    }
}