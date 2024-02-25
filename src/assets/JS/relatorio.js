let divValorTotal = document.getElementById("valor-total");
let divRelatorio = document.getElementById("relatorio");

let valorTotal = 0;
let relatorio = [];

async function gerarProdutos() {
  const resposta = await fetch("./assets/JSON/produtos.json");
  const items = await resposta.json();

  items.forEach((produto) => {
    const divProdutos = document.getElementById("produtos");
    const trElement = document.createElement("tr");

    trElement.innerHTML = `
        <th scope="row">${
          produto.id.charAt(0).toUpperCase() + produto.id.slice(1)
        }</th>
        <td>${produto.venda}</td>
        <td>${produto.compra}</td>
        <td>
            <button type="button" class="container-fluid btn btn-primary" onclick="adicionar(${
              produto.venda
            }, '${produto.id}')">Adicionar</button>
        </td>
        <td><button type="button" class="container-fluid btn btn-secondary" onclick="adicionar(${
          produto.venda
        }, '${produto.id}', 5)">5x</button></td>
        `;
    divProdutos.appendChild(trElement);
  });
}

function adicionar(valor, nome, quantidade) {
  let verificar = false;
  if (isNaN(quantidade)) {quantidade = 1;}

  relatorio.forEach((item) => {
    if (item.nome === nome) {
      item.quantidade += quantidade;
      verificar = true;
      return;
    }
  });

  if (!verificar) {
    const novoItem = { nome: nome, valor: valor, quantidade: quantidade };
    relatorio.push(novoItem);
  }
  console.log(relatorio);

  divValorTotal.innerText = `${(valorTotal += valor * quantidade)}`;
  criarLista(relatorio);
}

function criarLista(array) {
  let listaItems = [];
  array.forEach((item) => {
    listaItems += `
        <li class="list-group-item d-flex align-items-center justify-content-between">${item.nome.charAt(0).toUpperCase() + item.nome.slice(1)} x${item.quantidade}
        <button type="button" class="btn btn-danger" onclick="apagar('${item.nome}')"><i class="bi bi-trash-fill"></i></button>
        </li>
        `;
    });
    divRelatorio.innerHTML = listaItems;
    
    // <button type="button" class="btn btn-dark" onclick="remover('${item.nome}')"><i class="bi bi-eraser"></i></button>
}

function remover(nome) {
    relatorio.forEach(item => {
        if (item.nome === nome) {
            if (item.quantidade >= 2) {
                item.quantidade --
                valorTotal -= (item.valor)
            }
            divValorTotal.innerText = `${valorTotal}`
        }
    });
    criarLista(relatorio)
}

function apagar(nome) {
    relatorio.forEach(item => {
        if (item.nome === nome) {
            relatorio.splice(relatorio.indexOf(item), 1)
            valorTotal -= (item.valor * item.quantidade)
            divValorTotal.innerText = `${valorTotal}`
        }
    });
    criarLista(relatorio)
}

function resetar() {
    criarLista(relatorio = [])
    divValorTotal.innerText = valorTotal = 0
}

gerarProdutos();
