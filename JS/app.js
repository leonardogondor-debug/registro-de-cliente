import { Cliente } from "./classes.js";
import { pegarDados } from "./utils.js";
const REGISTROS = document.getElementById("registros");

REGISTROS.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cliente = new Cliente(
        REGISTROS.nome.value,
        REGISTROS.email.value
    );

    try {
        const resposta = await fetch("https://crudcrud.com/api/f1241da4ad5d474f9e919318db97617f/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        if (!resposta.ok){
            return alert("erro ao salvar");
        }
        pegarDados();
        alert("Cliente salvo");     
        REGISTROS.reset();
    } catch(erro){
        console.error("Erro inesperado:", erro);
        alert("Erro inesperado");
    }

});

 
