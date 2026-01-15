import { iniciarChat, trocarChat } from "../paginas/chat.js";

// inicia chat ao carregar página
iniciarChat();

// liga sidebar aos chats
document.querySelectorAll("[data-chat]").forEach(item => {
  item.addEventListener("click", () => {
    const chat = item.dataset.chat;
    trocarChat(chat);
  });
});