// pega os elementos no html
const LISTA = document.getElementById("lista");
const REGISTROS = document.getElementById("registros");

REGISTROS.addEventListener("submit", async (event) =>{
    event.preventDefault();
    const dados = {
        NOME: REGISTROS.nome.value,
        EMAIL: REGISTROS.email.value,
}
});

