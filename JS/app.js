import { Cliente } from "./classes.js";
const REGISTROS = document.getElementById("registros");

REGISTROS.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cliente = new Cliente(
        REGISTROS.nome.value,
        REGISTROS.email.value
    );

    try {
        const resposta = await fetch("https://crudcrud.com/api/0b6e10a174714a9f982466b583a8592c/clientes", {
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
        REGISTROS.reset();
    } catch(erro){
        console.error("Erro inesperado:", erro);
        alert("Erro inesperado");
    }

});
