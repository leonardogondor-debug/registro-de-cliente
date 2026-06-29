import { Cliente } from "./classes.js";
import { pegarDados } from "./utils.js";
import { gerenciaCliet } from "./classes.js";

//instacia do gerenciador
const gerenciador = new gerenciaCliet();
await gerenciador.carregarDaApi();

console.log(gerenciador.clientes);

//pega elementos do HTML
const REGISTROS = document.getElementById("registros");
const Lista = document.getElementById("lista");

//atualiza lista no dom
async function render() {
    Lista.innerHTML = " ";

    const clientes = await gerenciador.getAll();

    clientes.forEach(clientes =>{
        const li = document.createElement("li");
        li.textContent = `${clientes.nome} ${clientes.email}`;

        const div = document.createElement("div");

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.classList.add("excluir");
        excluir.addEventListener("click", async () => {
            await gerenciador.apagaCliente(clientes._id);
            await gerenciador.carregarDaApi();
            render();
        });

        div.appendChild(excluir);
        li.appendChild(div);
        Lista.appendChild(li);
    });
}

//checa se email ja existe
const lista = gerenciador.getAll();
const emailExiste = lista.some(c => c.email === cliente.email);

if (emailExiste) {
    alert("Este email ja esta cadastrado");
    return;
}

REGISTROS.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cliente = {
        nome: REGISTROS.nome.value,
        email: REGISTROS.email.value
    };

    //checa se email ja existe
    const lista = gerenciador.getAll();
    const emailExiste = lista.some(c => c.email === cliente.email);

    funcion () => {
        if (emailExiste) {
        alert("Este email ja esta cadastrado");
        return;
    }

    };

    try {
        const resposta = await fetch("https://crudcrud.com/api/6ee4846d88d0455abd691a44d63d801b/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        if (!resposta.ok){
            return alert("erro ao salvar");
        }
        await gerenciador.carregarDaApi();
        render();    
        REGISTROS.reset();
    } catch(erro){
        console.error("Erro inesperado:", erro);
        alert("Erro inesperado");
    }

});

render();

 
