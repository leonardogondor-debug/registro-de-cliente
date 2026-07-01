import { gerenciaClient } from "./classes.js";
import { clienteExiste, totalClientes } from "./utils.js";

//instacia do gerenciador
const gerenciador = new gerenciaClient();
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

    const clientes = gerenciador.getAll();

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
    const lista = gerenciador.getAll();

    //checa duplicado
    if (clienteExiste(lista, cliente)) {
        alert("nome ou email ja cadastrado!");
        Benviar.disabled = false;
        return;
    }

    try {
        await gerenciador.addCliente(cliente);
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

 
