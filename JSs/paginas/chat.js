// 🔥 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚙️ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAZYiHungOKy0fgTnLGgQYPfaZ3d6j5_uo",
  authDomain: "codex-oficial-chat.firebaseapp.com",
  projectId: "codex-oficial-chat"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🧑 ID anônimo
let userId = localStorage.getItem("codex_user_id");
if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("codex_user_id", userId);
}

// 📌 Estado
let chatAtual = "python";
let unsubscribe = null;

// 🚀 INIT
export function iniciarChat() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input-field");
  const mensagens = document.getElementById("chat-mensagens");
  const titulo = document.getElementById("chat-title");

  if (!form || !input || !mensagens) return;

  titulo.textContent = "Chat de " + chatAtual.toUpperCase();
  mensagens.innerHTML = "";

  // ❌ mata listener antigo
  if (unsubscribe) unsubscribe();

  // 👂 novo listener
  const q = query(
    collection(db, `chats/${chatAtual}/mensagens`),
    orderBy("createdAt")
  );

  unsubscribe = onSnapshot(q, snapshot => {
    mensagens.innerHTML = "";
    snapshot.forEach(doc => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.classList.add("message");
      if (msg.userId === userId) div.classList.add("me");
      div.textContent = msg.texto;
      mensagens.appendChild(div);
    });
    mensagens.scrollTop = mensagens.scrollHeight;
  });

  // ✉️ envio (garante 1 listener só)
  form.onsubmit = async e => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) return;

    await addDoc(collection(db, `chats/${chatAtual}/mensagens`), {
      texto,
      userId,
      createdAt: serverTimestamp()
    });

    input.value = "";
  };
}

// 🔄 troca de chat
export function trocarChat(chat) {
  chatAtual = chat;
  iniciarChat();
}


