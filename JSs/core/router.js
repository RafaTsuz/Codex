import { iniciarMatrix, iniciarFadeMatrix } from "../layout/matrix.js";
import { iniciarAccordions } from "../layout/accordion.js";
import { iniciarFAQ } from "../layout/faq.js";
import { iniciarChat } from "../paginas/chat.js";
import { trocarChat } from "../paginas/chat.js";
import { initCarousel } from "../paginas/sobre.js";


const PASTA_PAGINAS = "HTMLs";

const inicializadores = [
  iniciarMatrix,
  iniciarAccordions,
  iniciarFadeMatrix,
  iniciarFAQ
];

function removerCSSDaPagina() {
  document.querySelectorAll("link[data-page-css]").forEach(l => l.remove());
}

function carregarCSSDaPagina(nome) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `CSSs/${nome}.css`;
  link.dataset.pageCss = "true";
  document.head.appendChild(link);
}

function carregarPagina(nome) {
  const content = document.getElementById("content");
  content.classList.remove("loaded");

  removerCSSDaPagina();
  carregarCSSDaPagina(nome);

  return fetch(`${PASTA_PAGINAS}/${nome}.html`)
    .then(r => r.text())
    .then(html => {
      content.innerHTML = html;
      content.classList.add("loaded");

      // init específico da página
      if (nome === "chatsteste") {
        iniciarChat();
        iniciarSidebarChats();
      }
    });
}


function atualizarPagina() {
  const hash = location.hash.slice(1) || "paginainicialteste";

  carregarPagina(hash).then(() => {
    inicializadores.forEach(fn => fn());
    if (hash === "sobreteste") initCarousel();
  });
}

document.addEventListener("click", e => {
  const a = e.target.closest("a[href$='.html']");
  if (!a) return;

  e.preventDefault();
  location.hash = a.getAttribute("href").replace(".html", "");
});

function navegarPara(pagina, secao = null, delay = 400) {
  const destino = pagina + "teste";

  if (location.hash.replace("#", "") !== destino) {
    location.hash = destino;
  }

  if (!secao) return;

  setTimeout(() => {
    document.getElementById(secao)?.scrollIntoView({ behavior: "smooth" });
  }, delay);
}

window.irParaAula = secao => navegarPara("aulas", secao, 300);
window.irParaSecao = (pagina, secao) => navegarPara(pagina, secao);

export { atualizarPagina };

function iniciarSidebarChats() {
  document.querySelectorAll("[data-chat]").forEach(item => {
    item.onclick = () => {
      trocarChat(item.dataset.chat);
    };
  });
}