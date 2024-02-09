export function modal_erro(mensagem, situacao){
    const body  = document.querySelector("body");

    body.insertAdjacentHTML("afterbegin",`
        <div class="modal-src-erro">
            <div class="modal" id="modal">
                <p>${mensagem}</p>
            </div>
        </div>
    `)

    const div = document.querySelector(".modal-src-erro")

    if(situacao == "error"){       
        
        const modal = document.querySelector(".modal")
        modal.classList.add("error")
        
        setTimeout(()=>{
            body.removeChild(div)
        }, 3000)
    }

}