const chats = {
  python: [],
  javascript: [],
  htmlcss: []
};

let currentChat = "python";

/* Quando o usuário clicar na sidebar */
document.addEventListener("click", e => {
  if (e.target.classList.contains("accordion-link") && e.target.dataset.chat) {
    const chatName = e.target.dataset.chat;
    openChat(chatName);
  }
});

/* Abre o chat certo */
export function openChat(chatName) {
  currentChat = chatName;
  document.getElementById("chat-title").textContent =
    "Chat de " + formatChatName(chatName);

  renderMessages();
}

/* Nome bonitinho */
function formatChatName(name) {
  if (name === "htmlcss") return "HTML + CSS";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/* Renderiza as mensagens */
function renderMessages() {
  const box = document.getElementById("chat-messages");
  if (!box) return;

  box.innerHTML = "";

  chats[currentChat].forEach(msg => {
    const div = document.createElement("div");
    div.classList.add("message");
    if (msg.me) div.classList.add("me");
    div.textContent = msg.text;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

/* Enviar mensagem */


function sendMessage() {
  const input = document.getElementById("chat-input-field");
  const text = input.value.trim();
  if (!text) return;

  chats[currentChat].push({ text, me: true });
  input.value = "";

  renderMessages();
}

export function iniciarChat() {
  const btn = document.getElementById("chat-send-btn");
  const input = document.getElementById("chat-input-field");

  if (!btn || !input) return; // se não está na página de chat, sai

  console.log("✔ Chat iniciado.");

  btn.onclick = sendMessage;
  input.onkeydown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  renderMessages();
}