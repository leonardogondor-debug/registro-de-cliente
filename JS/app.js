import { Cliente } from "./classes.js";
import { pegarDados } from "./utils.js";
import { clienteExiste } from "./utils.js";
import { totalClientes } from "./utils.js";
import { gerenciaCliet } from "./classes.js";


//instacia do gerenciador
const gerenciador = new gerenciaCliet();
await gerenciador.carregarDaApi();

console.log(gerenciador.clientes);

//pega elementos do HTML
const REGISTROS = document.getElementById("registros");
const Lista = document.getElementById("lista");
const totalP = document.getElementById("totalC");
const Benviar = document.getElementById("enviar");

//atualiza lista no dom
async function render() {
    Lista.innerHTML = "";

    const clientes = await gerenciador.getAll();

    const total = await totalClientes(clientes);
    totalP.textContent = `TOTAL DE CLIENTES: ${total}`;


    clientes.forEach(clientes =>{
        const li = document.createElement("li");
        li.textContent = `${clientes.nome} ${clientes.email}`;

        const div = document.createElement("div");

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.classList.add("excluir");
        excluir.addEventListener("click", async () => {
            excluir.disabled = true;
            try {
               await gerenciador.apagaCliente(clientes._id);
               await gerenciador.carregarDaApi();
               render();
            } catch (erro) {
                console.error(erro);
                alert("Erro ao excluir");
                excluir.disabled = false;
            }
        });

        div.appendChild(excluir);
        li.appendChild(div);
        Lista.appendChild(li);
    });
}

REGISTROS.addEventListener("submit", async (event) => {
    event.preventDefault();
    Benviar.disabled = true;

    const cliente = {
        nome: REGISTROS.nome.value,
        email: REGISTROS.email.value
    };
    
    //pega lista atual
    await gerenciador.carregarDaApi();
    const lista = await gerenciador.getAll();

    //checa duplicado
    if (clienteExiste(lista, cliente)) {
        alert("nome ou email ja cadastrado!");
        return;
    }

    try {
        const resposta = await fetch("https://crudcrud.com/api/010c2faaa0a843d0922ddd34af6cd387/clientes", {
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
    } finally {
        Benviar.disabled = false;
    }

});

render();

 
