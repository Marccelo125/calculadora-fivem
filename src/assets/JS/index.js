const divValorTotal = document.getElementById("valor-total");
const divRelatorio = document.getElementById("relatorio");
let valorTotal = 0;
let relatorio = [];

async function gerarProdutos() {
  const resposta = await fetch("./assets/JSON/produtos.json");
  const items = await resposta.json();

  items.forEach((produto) => {
    const divProdutos = document.getElementById("produtos");
    const trElement = document.createElement("tr");

    trElement.innerHTML = `
        <th scope="row">${produto.id.charAt(0).toUpperCase() + produto.id.slice(1)}</th>
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

// Calculadora
function adicionar(valor, nome, quantidade) {
  if (quantidade) {
    let indexItem;

    while (quantidade != 0) {
      valorTotal = valorTotal + valor;
      divValorTotal.innerText = `${valorTotal}`;

      const newItem = { quantidade: 5, nome: nome };
      indexItem = relatorio.indexOf(newItem);
      relatorio.push(newItem);
      quantidade--;
    }
    divRelatorio.innerHTML += `
    <li class="list-group-item d-flex align-items-center justify-content-between" id="${indexItem}">${
      nome.charAt(0).toUpperCase() + nome.slice(1)
    } x5
    <button type="button" class="btn btn-danger" onclick="remover(${valor}, ${indexItem}, 5)"><i class="bi bi-trash-fill"></i></.button></li>
    `;
  } else {
    valorTotal = valorTotal + valor;
    divValorTotal.innerText = `${valorTotal}`;

    const newItem = { quantidade: 1, nome: nome };
    relatorio.push(newItem);

    const indexItem = relatorio.indexOf(newItem);
    divRelatorio.innerHTML += `
    <li class="list-group-item d-flex align-items-center justify-content-between" id="${indexItem}">${
      nome.charAt(0).toUpperCase() + nome.slice(1)
    }<button type="button" class="btn btn-danger" onclick="remover(${valor}, ${indexItem})"><i class="bi bi-trash-fill"></i></button></li>
    `;
  }
}

function remover(valor, id, quantidade) {
  if (quantidade) {
    while (quantidade != 0) {
      valorTotal = valorTotal - valor;
      divValorTotal.innerText = `${valorTotal}`;
      quantidade--
    }
    const elementToRemove = document.getElementById(`${id}`);
    if (elementToRemove) {
      relatorio.splice(id, 1); // Removendo da lista
      divRelatorio.removeChild(elementToRemove);
    }
  } else {
    if (!(valorTotal - valor < 0)) {
      valorTotal = valorTotal - valor;
      divValorTotal.innerText = `${valorTotal}`;

      const elementToRemove = document.getElementById(`${id}`);

      if (elementToRemove) {
        relatorio.splice(id, 1); // Removendo da lista
        divRelatorio.removeChild(elementToRemove);
      }
    }
  }
}

function resetar() {
  divValorTotal.innerText = `${(valorTotal = 0)}`;
  divRelatorio.innerHTML = "";
}

gerarProdutos();
