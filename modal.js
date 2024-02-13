export function modal_resposta(mensagem, situacao){
    const body  = document.querySelector("body");

    console.log("CHEGOU")

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