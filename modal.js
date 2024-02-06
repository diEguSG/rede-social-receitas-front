export function modal_erro(mensagem, situacao){
    const main  = document.querySelector("main");

    main.insertAdjacentHTML("afterbegin",`
        <div class="modal-src">
            <div class="modal" id="modal">
                <p>${mensagem}</p>
            </div>
        </div>
    `)

    const div = document.querySelector(".modal-src")

    if(situacao == "error"){       
        
        const modal = document.querySelector(".modal")
        modal.classList.add("error")
        
        setTimeout(()=>{
            main.removeChild(div)
        }, 3000)
    }

}