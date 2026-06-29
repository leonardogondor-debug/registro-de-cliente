
//pegar dados da api
export async function pegarDados() {
    const url = "https://crudcrud.com/api/6ee4846d88d0455abd691a44d63d801b/clientes";
    const resposta = await fetch(url);
    return await resposta.json();
}

//apaga dado da api
export async function apagaDado(id) {
    const url = `https://crudcrud.com/api/6ee4846d88d0455abd691a44d63d801b/clientes/${id}`;

    const resposta = await fetch(url, {
        method: "DELETE"
    });

    if (resposta.ok) {
        console.log("Item apagado!");
    } else {
        console.log("Erro ao apagar", resposta.status);
    }   
}