const produtosInfo = {
  Frutas: [
    { nome: "Maçã", preco: 2.5 },
    { nome: "Banana", preco: 1.8 },
    { nome: "Laranja", preco: 2.0 },
    { nome: "Abacaxi", preco: 4.0 },
    { nome: "Uva", preco: 3.5 },
    { nome: "Melancia", preco: 7.0 },
    { nome: "Mamão", preco: 3.8 },
    { nome: "Pera", preco: 4.2 },
    { nome: "Manga", preco: 3.0 },
    { nome: "Kiwi", preco: 5.0 },
    { nome: "Morango", preco: 6.0 },
    { nome: "Limão", preco: 1.5 },
    { nome: "Coco", preco: 4.5 },
    { nome: "Ameixa", preco: 4.0 },
    { nome: "Pêssego", preco: 3.8 }
  ],
  Legumes: [
    { nome: "Cenoura", preco: 2.0 },
    { nome: "Batata", preco: 2.5 },
    { nome: "Abobrinha", preco: 3.0 },
    { nome: "Berinjela", preco: 3.5 },
    { nome: "Beterraba", preco: 2.8 },
    { nome: "Chuchu", preco: 2.2 },
    { nome: "Abóbora", preco: 2.5 },
    { nome: "Pepino", preco: 2.0 },
    { nome: "Pimentão", preco: 3.0 },
    { nome: "Quiabo", preco: 2.5 }
  ],
  Bebidas: [
    { nome: "Água", preco: 1.0 },
    { nome: "Refrigerante", preco: 5.0 },
    { nome: "Suco Natural", preco: 6.5 },
    { nome: "Chá Gelado", preco: 4.0 },
    { nome: "Cerveja", preco: 5.5 },
    { nome: "Vinho", preco: 20.0 },
    { nome: "Energético", preco: 7.5 },
    { nome: "Isotônico", preco: 6.0 },
    { nome: "Leite", preco: 4.2 }
  ],
  Higiene: [
    { nome: "Sabonete", preco: 2.0 },
    { nome: "Shampoo", preco: 7.0 },
    { nome: "Condicionador", preco: 8.0 },
    { nome: "Desodorante", preco: 5.5 },
    { nome: "Pasta de Dente", preco: 3.5 },
    { nome: "Escova de Dente", preco: 4.0 },
    { nome: "Fio Dental", preco: 3.0 },
    { nome: "Enxaguante Bucal", preco: 6.0 },
    { nome: "Papel Higiênico", preco: 10.0 }
  ],
  Limpeza: [
    { nome: "Detergente", preco: 2.5 },
    { nome: "Sabão em Pó", preco: 8.0 },
    { nome: "Amaciante", preco: 6.0 },
    { nome: "Água Sanitária", preco: 3.0 },
    { nome: "Desinfetante", preco: 4.5 },
    { nome: "Esponja", preco: 2.0 },
    { nome: "Vassoura", preco: 15.0 },
    { nome: "Rodo", preco: 12.0 },
    { nome: "Pano de Chão", preco: 3.5 }
  ]
};

const selectCategoria = document.getElementById("categoria");
const selectProduto = document.getElementById("produto");
const inputQuantidade = document.getElementById("quantidade");
const btnAdicionar = document.getElementById("adicionar");
const listaCompras = document.getElementById("lista-compras");
const totalCompra = document.getElementById("total");

let total = 0;

// Preenche categorias
for (let categoria in produtosInfo) {
  const option = document.createElement("option");
  option.value = categoria;
  option.textContent = categoria;
  selectCategoria.appendChild(option);
}

// Atualiza produtos
selectCategoria.addEventListener("change", () => {
  const produtos = produtosInfo[selectCategoria.value];
  selectProduto.innerHTML = '<option value="">Selecione o produto</option>';

  if (produtos) {
    produtos.forEach(produto => {
      const option = document.createElement("option");
      option.value = produto.nome;
      option.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
      selectProduto.appendChild(option);
    });
  }
});

// Adiciona item
btnAdicionar.addEventListener("click", () => {
  const categoria = selectCategoria.value;
  const produtoNome = selectProduto.value;
  const quantidade = parseInt(inputQuantidade.value);

  if (!categoria) {
    alert("Por favor, selecione uma categoria!");
    return;
  }

  if (!produtoNome) {
    alert("Por favor, selecione um produto!");
    return;
  }

  if (isNaN(quantidade) || quantidade <= 0) {
    alert("Por favor, insira uma quantidade válida!");
    return;
  }

  const produto = produtosInfo[categoria].find(p => p.nome === produtoNome);
  const precoTotal = produto.preco * quantidade;

  const li = document.createElement("li");
  li.textContent = `${produtoNome} (${quantidade}x) - R$ ${precoTotal.toFixed(2)}`;

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.addEventListener("click", () => {
    listaCompras.removeChild(li);
    total -= precoTotal;
    atualizarTotal();
  });

  li.appendChild(btnRemover);
  listaCompras.appendChild(li);

  total += precoTotal;
  atualizarTotal();

  // Resetar campos
  selectCategoria.value = "";
  selectProduto.innerHTML = '<option value="">Selecione o produto</option>';
  inputQuantidade.value = "";
});

function atualizarTotal() {
  totalCompra.textContent = `Total: R$ ${total.toFixed(2)}`;
}
