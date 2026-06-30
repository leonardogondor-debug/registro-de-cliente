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
export class gerenciaCliet {
    constructor() {
        this.clientes = [];
    }

    async carregarDaApi() {
        const resposta = await pegarDados();
        this.clientes = resposta.map(c => new Cliente(c.nome, c.email, c._id));
    }
    
    async apagaCliente(id) {
        await apagaDado(id);
        this.clientes = this.clientes.filter(c => c._id !== id);
    }
    
    getAll() {
        return this.clientes;
    }
}