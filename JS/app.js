import { Cliente } from "./classes.js";
import { pegarDados } from "./utils.js";
import { gerenciaCliet } from "./classes.js";

//instacia do gerenciador
const gerenciador = new gerenciaCliet();
await gerenciador.carregarDaApii();

console.log(gerenciador.clientes);

//pega elementos do HTML
const REGISTROS = document.getElementById("registros");


REGISTROS.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cliente = new Cliente(
        REGISTROS.nome.value,
        REGISTROS.email.value
    );

    try {
        const resposta = await fetch("https://crudcrud.com/api/d4e46efc61a24f9eb0ab4c4fa2b6e00a/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        if (!resposta.ok){
            return alert("erro ao salvar");
        }
        alert("Cliente salvo"); 
        pegarDados();    
        REGISTROS.reset();
    } catch(erro){
        console.error("Erro inesperado:", erro);
        alert("Erro inesperado");
    }

});

 
