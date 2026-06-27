//pegar dados da api
export async function pegarDados() {
    const url = "https://crudcrud.com/api/f1241da4ad5d474f9e919318db97617f/clientes";
    const resposta = await fetch(url);
    const dados = await resposta.json();
    console.log(dados);
}

//apaga dado da api
export async function apagaDado(id) {
    const url = `https://crudcrud.com/api/f1241da4ad5d474f9e919318db97617f/clientes/${id}`;

    const resposta = await fetch(url, {
        method: "DELETE"
    });

    if (resposta.ok) {
        console.log("Item apagado!");
    } else {
        console.log("Erro ao apagar", resposta.status);
    }   
}