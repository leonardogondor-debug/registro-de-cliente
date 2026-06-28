import { pegarDados } from "./utils.js";
import { apagaDado } from "./utils.js";

export class Cliente {
    constructor (nome, email, id){
        this.nome = nome;
        this.email = email; 
        this.id = id;
    }
}

//gerencia a lista
export class gerenciaCliet {
    constructor() {
        this.clientes = [];
    }

    async carregarDaApii() {
        const dados = await pegarDados();
        this.clientes = dados.map(c => new Cliente(c.nome, c.email, c._id));
    }
    
    async apagaCliente(id) {
        await apagaDado(id);
        this.clientes = this.clientes.filter(c => c._id !== id);
    }
    
    getAll() {
        return thi.clientes;
    }
}