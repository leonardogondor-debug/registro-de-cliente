
//pegar dados da api
export async function pegarDados() {
    const url = "https://crudcrud.com/api/010c2faaa0a843d0922ddd34af6cd387/clientes";
    try {
       const resposta = await fetch(url);
       return resposta.json();
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        return [];
    }
}

//apaga dado da api
export async function apagaDado(id) {
    const url = `https://crudcrud.com/api/010c2faaa0a843d0922ddd34af6cd387/clientes/${id}`;

    const resposta = await fetch(url, {
        method: "DELETE"
    });

    if (resposta.ok) {
        console.log("Item apagado!");
    } else {
        console.log("Erro ao apagar", resposta.status);
    }   
}

//checa se email ou usuario ja existe
export function clienteExiste(lista, novoCliente) {
    return lista.find(c => 
        c.email === novoCliente.email || c.nome.toLowerCase().trim() === novoCliente.nome.toLowerCase().trim()
    );
}

//total de cliente cadastrados o ideal seria length mas e so para treinar o reduce
export function totalClientes (lista) {
    return lista.reduce((total, cliente) => {
        return total + 1;
    }, 0);
} 