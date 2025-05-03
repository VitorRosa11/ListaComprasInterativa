const lista = document.getElementById("lista");
const input = document.getElementById("itemInput");
const precoInput = document.getElementById("precoInput");

const emojis = {
  maçã: "🍎",
  banana: "🍌",
  tomate: "🍅",
  cenoura: "🥕",
  leite: "🥛",
  pão: "🍞",
  arroz: "🍚",
  feijão: "🫘",
  alface: "🥬",
  uva: "🍇",
  laranja: "🍊"
};

const categorias = {
  frutas: ["maçã", "banana", "laranja", "uva"],
  vegetais: ["cenoura", "alface", "tomate"],
  laticínios: ["leite"]
};

window.onload = () => {
  const itensSalvos = JSON.parse(localStorage.getItem("listaCompras")) || [];
  itensSalvos.forEach(item =>
    criarItem(item.texto, item.comprado, item.categoria, item.preco)
  );
};

function adicionarItem() {
  const texto = input.value.trim().toLowerCase();
  const preco = parseFloat(precoInput.value);

  if (texto === "") {
    alert("Digite o nome do item!");
    return;
  }

  if (isNaN(preco) || preco <= 0) {
    alert("Informe um preço válido!");
    return;
  }

  criarItem(texto, false, undefined, preco);
  salvarLista();
  input.value = "";
  precoInput.value = "";
}

function criarItem(texto, comprado, categoria = detectarCategoria(texto), preco = 0) {
  const li = document.createElement("li");
  li.className = comprado ? "comprado" : "";
  li.dataset.categoria = categoria;
  li.dataset.preco = preco;

  const emoji = emojis[texto] ? emojis[texto] + " " : "";
  const precoFormatado = preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  li.innerHTML = `
    <span onclick="alternarComprado(this)">
      ${emoji}${texto} <small>(${categoria})</small> - <strong>${precoFormatado}</strong>
    </span>
    <button onclick="removerItem(this)">❌</button>
  `;

  lista.appendChild(li);
  atualizarContador();
}

function detectarCategoria(texto) {
  for (let cat in categorias) {
    if (categorias[cat].includes(texto)) return cat;
  }
  return "outros";
}

function alternarComprado(span) {
  span.parentElement.classList.toggle("comprado");
  salvarLista();
  atualizarContador();
}

function removerItem(btn) {
  const li = btn.parentElement;
  li.classList.add("removendo");
  setTimeout(() => {
    li.remove();
    salvarLista();
    atualizarContador();
  }, 300);
}

function limparLista() {
  if (confirm("Tem certeza que deseja limpar toda a lista?")) {
    lista.innerHTML = "";
    localStorage.removeItem("listaCompras");
    atualizarContador();
  }
}

function salvarLista() {
  const itens = Array.from(lista.children).map(li => ({
    texto: li.textContent.replace("❌", "").trim().replace(/.+/, "").replace(/- R\$.*$/, "").trim(),
    comprado: li.classList.contains("comprado"),
    categoria: li.dataset.categoria,
    preco: parseFloat(li.dataset.preco)
  }));
  localStorage.setItem("listaCompras", JSON.stringify(itens));
}

function filtrarCategoria() {
  const filtro = document.getElementById("filtro").value;
  Array.from(lista.children).forEach(li => {
    if (filtro === "todos" || li.dataset.categoria === filtro) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
}

function atualizarContador() {
  const total = lista.children.length;
  const comprados = Array.from(lista.children).filter(li => li.classList.contains("comprado")).length;
  const totalGasto = Array.from(lista.children).reduce((soma, li) => {
    return soma + (li.classList.contains("comprado") ? parseFloat(li.dataset.preco) : 0);
  }, 0);

  document.getElementById("contador").textContent = `${total} itens | ${comprados} comprados`;
  document.getElementById("total").textContent = `Total: R$ ${totalGasto.toFixed(2).replace(".", ",")}`;
}
