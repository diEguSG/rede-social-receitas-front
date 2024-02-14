import {baseURL} from "./conexao_servidor.js";

const myHeaders = {
    "Content-Type": "application/json"
}

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
                <button id="btn-confirmar-exclusao">Sim</button>
                <button id="btn-cancelar-exclusao">Não</button>
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
                location.reload();
            }

        })

        btn_cancelar_exclusao.addEventListener('click', ()=>{
            body.removeChild(div)
        })
    }
}