import { atualizarPagina } from "./core/router.js";

window.addEventListener("load", atualizarPagina);
window.addEventListener("hashchange", atualizarPagina);