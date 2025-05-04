const sugestoesList = document.getElementById("sugestoes");

const produtosDisponiveis = [
  { nome: "Maçã", preco: 2.5, categoria: "Frutas" },
  { nome: "Banana", preco: 2.1, categoria: "Frutas" },
  { nome: "Laranja", preco: 3.0, categoria: "Frutas" },
  { nome: "Mamão", preco: 7.0, categoria: "Frutas" },
  { nome: "Melão", preco: 6.0, categoria: "Frutas" },
  { nome: "Abacate", preco: 6.5, categoria: "Frutas" },
  { nome: "Cáqui", preco: 5.0, categoria: "Frutas" },
  { nome: "Abacaxi", preco: 5.5, categoria: "Frutas" },
  { nome: "Manga", preco: 5.5, categoria: "Frutas" },
  { nome: "Pêssego", preco: 5.5, categoria: "Frutas" },
  { nome: "Limão", preco: 5.5, categoria: "Frutas" },
  { nome: "Bergamota", preco: 5.5, categoria: "Frutas" },
  {nome: "Batata", preco: 1.5, categoria: "Legumes"},
  {nome: "Cenoura", preco: 2.2, categoria: "Legumes"},
  {nome: "Batata-doce", preco: 2.8, categoria: "Legumes"},
  {nome: "Abóbora", preco: 3.5 , categoria: "Legumes"},
  {nome: "Moranga", preco: 3.5 , categoria: "Legumes"},
  {nome: "Beterraba", preco: 2.9 , categoria: "Legumes"},
  {nome: "Cebola", preco: 1.9 , categoria: "Legumes"},
  {nome: "Ervilha", preco: 5.0 , categoria: "Legumes"},
  {nome: "Milho", preco: 5.5 , categoria: "Legumes"},
  {nome: "Gengibre", preco: 3.5 , categoria: "Legumes"},
  {nome: "Pepino", preco: 2.8 , categoria: "Legumes"},
  {nome: "Pimenta", preco: 1.8 , categoria: "Legumes"},
  {nome: "Tomate", preco: 2.0 , categoria: "Legumes"},
  { nome: "Morango", preco: 5.5, categoria: "Frutas" },
  { nome: "Leite", preco: 4.2, categoria: "Laticínios" },
  { nome: "Iogurte", preco: 5.5, categoria: "Laticínios" },
  { nome: "Manteiga", preco: 5.5, categoria: "Laticínios" },
  { nome: "Margarina", preco: 5.5, categoria: "Laticínios" },
  { nome: "Creme de leite", preco: 5.5, categoria: "Laticínios" },
  { nome: "Requeijão", preco: 5.5, categoria: "Laticínios" },
  { nome: "Doce de leite", preco: 9.9, categoria: "Laticínios" },
  { nome: "Sabão", preco: 3.9, categoria: "Limpeza" },
  { nome: "Detergente", preco: 2.8, categoria: "Limpeza" },
  { nome: "Desinfetante", preco: 5.0, categoria: "Limpeza" },
  {nome: "Sabonete", preco: 3.0, categoria: "Limpeza"},
  {nome: "Shampoo", preco: 7.5, categoria: "Limpeza"},
  {nome: "Pasta de dente", preco: 6.0, categoria: "Limpeza"},
  {nome: "Álcool em gel", preco: 4.5, categoria: "Limpeza"}
  
];

let listaDeCompras = [];

const produtoSelect = document.getElementById("produtoSelect");
const listaContainer = document.getElementById("listaProdutos");
const pesquisaInput = document.getElementById("pesquisa");
const totalSpan = document.getElementById("total");
const btnAdicionar = document.getElementById("btnAdicionar");
const quantidadeInput = document.getElementById("quantidade");
const btnLimpar = document.getElementById("btnLimpar");

// Preencher select com produtos
const categoriasMap = {};
produtosDisponiveis.forEach((p, index) => {
  if(!categoriasMap[p.categoria]){
    categoriasMap[p.categoria] = [];
  }
  categoriasMap[p.categoria].push({...p, index});
});
for (const cat in categoriasMap){
  const group = document.createElement("optgroup");
  group.label = cat;

  categoriasMap[cat].forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.index;
    opt.textContent = `${p.nome} - R$${p.preco.toFixed(2)}`;
    group.appendChild(opt);
  });
  produtoSelect.appendChild(group);
}

function atualizarLista() {
  listaContainer.innerHTML = "";
  const termo = pesquisaInput.value.toLowerCase();

  const categorias = {};

  listaDeCompras.forEach((item, index) => {
    if (!item.nome.toLowerCase().includes(termo)) return;

    if (!categorias[item.categoria]) categorias[item.categoria] = [];
    categorias[item.categoria].push({ ...item, index });
  });

  let total = 0;

  for (const cat in categorias) {
    const secao = document.createElement("div");
    secao.classList.add("categoria");
    secao.innerHTML = `<h2>${cat}</h2>`;

    categorias[cat].forEach(prod => {
      const div = document.createElement("div");
      div.className = `produto${prod.riscado ? " riscado" : ""}`;
      div.innerHTML = `
        <span>${prod.nome} - R$ ${prod.preco.toFixed(2)} x ${prod.quantidade}</span>
        <span>Subtotal: R$ ${(prod.preco * prod.quantidade).toFixed(2)}</span>
      `;
      div.addEventListener("click", () => {
        listaDeCompras[prod.index].riscado = !listaDeCompras[prod.index].riscado;
        atualizarLista();
      });
      secao.appendChild(div);
      if(!prod.riscado) {
        total += prod.preco * prod.quantidade; 
      }
    });

    listaContainer.appendChild(secao);
  }

  totalSpan.textContent = total.toFixed(2);
}

btnAdicionar.addEventListener("click", () => {
  const produtoSelecionado = produtosDisponiveis[produtoSelect.value];
  const quantidade = parseInt(quantidadeInput.value);

  if (quantidade <= 0 || isNaN(quantidade)) {
    alert("Informe uma quantidade válida!");
    return;
  }

  const existente = listaDeCompras.find(p => p.nome === produtoSelecionado.nome);
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    listaDeCompras.push({
      ...produtoSelecionado,
      quantidade,
      riscado: false
    });
  }

  atualizarLista();
  quantidadeInput.value = 1;
});



pesquisaInput.addEventListener("input", () => {
  const termo = pesquisaInput.value.toLowerCase();
  atualizarLista();

  sugestoesList.innerHTML = "";

  if(termo.length === 0) return;

  const correspondencias = produtosDisponiveis.filter(p => p.nome.toLocaleLowerCase().includes(termo));
  correspondencias.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.nome;
    li.addEventListener("click", () => {
      pesquisaInput.value = "";
      sugestoesList.innerHTML = "";

      const existente = listaDeCompras.find(prod => prod.nome === p.nome);
      if (existente) {
        existente.quantidade += 1;
      } else {
        listaDeCompras.push({
          ...p, quantidade: 1, riscado: false
        });
      }
      atualizarLista();
    });
    
    sugestoesList.appendChild(li);
  });
});


  document.addEventListener("click", (e) => {
    if(!pesquisaInput.contains(e.target) && !sugestoesList.contains(e.target)){
      sugestoesList.innerHTML = "";
    };
  });

