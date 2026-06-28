//pegar dados da api
export async function pegarDados() {
    const url = "https://crudcrud.com/api/d4e46efc61a24f9eb0ab4c4fa2b6e00a/clientes";
    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados;
}

//apaga dado da api
export async function apagaDado(id) {
    const url = `https://crudcrud.com/api/d4e46efc61a24f9eb0ab4c4fa2b6e00a/clientes/${id}`;

    const resposta = await fetch(url, {
        method: "DELETE"
    });

    if (resposta.ok) {
        console.log("Item apagado!");
    } else {
        console.log("Erro ao apagar", resposta.status);
    }   
}