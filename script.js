const produtosInfo = [
    { nome: "Maçã", categoria: "Frutas", unidade: "kg", preco: 6.99 },
    { nome: "Banana", categoria: "Frutas", unidade: "kg", preco: 4.29 },
    { nome: "Cenoura", categoria: "Legumes", unidade: "kg", preco: 3.79 },
    { nome: "Batata", categoria: "Legumes", unidade: "kg", preco: 3.50 },
    { nome: "Alface", categoria: "Verduras", unidade: "un", preco: 2.99 },
    { nome: "Arroz", categoria: "Mercearia", unidade: "kg", preco: 5.89 },
    { nome: "Feijão", categoria: "Mercearia", unidade: "kg", preco: 6.49 },
    { nome: "Leite", categoria: "Laticínios", unidade: "L", preco: 4.19 },
    { nome: "Detergente", categoria: "Limpeza", unidade: "un", preco: 2.49 },
    { nome: "Sabonete", categoria: "Higiene", unidade: "un", preco: 1.99 }
  ];
  
  let lista = [];
  
  document.addEventListener("DOMContentLoaded", () => {
    popularDatalist();
    renderizar();
  
    document.getElementById("nome").addEventListener("change", function () {
      autoPreencherCampos(this.value);
    });
  
    document.getElementById("form-produto").addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const categoria = document.getElementById("categoria").value;
      const quantidade = parseFloat(document.getElementById("quantidade").value);
      const preco = parseFloat(document.getElementById("preco").value);
  
      if (nome && categoria && quantidade > 0 && preco >= 0) {
        lista.push({ nome, categoria, quantidade, preco });
        renderizar();
        e.target.reset();
      }
    });
  });
  
  function popularDatalist() {
    const datalist = document.getElementById("sugestoes-produtos");
    produtosInfo.forEach(produto => {
      const option = document.createElement("option");
      option.value = produto.nome;
      datalist.appendChild(option);
    });
  }
  
  function autoPreencherCampos(nomeProduto) {
    const produto = produtosInfo.find(p => p.nome.toLowerCase() === nomeProduto.toLowerCase());
    if (produto) {
      document.getElementById("categoria").value = produto.categoria;
      document.getElementById("preco").value = produto.preco.toFixed(2);
    }
  }
  
  function renderizar() {
    const container = document.getElementById("lista-compras");
    container.innerHTML = "";
  
    let total = 0;
  
    lista.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("produto");
  
      const precoTotal = (item.preco * item.quantidade).toFixed(2);
      total += parseFloat(precoTotal);
  
      div.innerHTML = `
        <span>${item.nome} (${item.categoria}) - ${item.quantidade} × R$ ${item.preco.toFixed(2)} = <strong>R$ ${precoTotal}</strong></span>
        <button onclick="remover(${index})">🗑️</button>
      `;
      container.appendChild(div);
    });
  
    document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2)}`;
  }
  
  function remover(index) {
    lista.splice(index, 1);
    renderizar();
  }
  