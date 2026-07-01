import { pegarDados, apagaDado } from "./utils.js";

//cria cliente
export class Cliente {
    constructor (nome, email, id){
        this.nome = nome;
        this.email = email; 
        this._id = id;
    }
}

//gerencia a lista
export class gerenciaClient {
    constructor() {
        this.clientes = [];
    }

    async carregarDaApi() {
        const resposta = await pegarDados();
        this.clientes = resposta.map(c => new Cliente(c.nome, c.email, c._id));
    }
    
    async addCliente(cliente) {
        try {
            const resposta = await fetch("https://crudcrud.com/api/010c2faaa0a843d0922ddd34af6cd387/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar cliente");
        }

        //pega o cliente criado da api e adiciona na lista
        const novoCliente = await resposta.json();
        this.clientes.push(new Cliente(novoCliente.nome, novoCliente.email, novoCliente._id));
        } catch (erro) {
            console.error("Erro ao adicionar cliente:", erro);
            throw erro;
        }
    }

    async apagaCliente(id) {
        await apagaDado(id);
        this.clientes = this.clientes.filter(c => c._id !== id);
    }
    
    getAll() {
        return this.clientes;
    }
}