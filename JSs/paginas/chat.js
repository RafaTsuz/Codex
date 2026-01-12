// 🔥 Firebase (CDN)
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

// ⚙️ Config
const firebaseConfig = {
  apiKey: "AIzaSyAZYiHungOKy0fgTnLGgQYPfaZ3d6j5_uo",
  authDomain: "codex-oficial-chat.firebaseapp.com",
  projectId: "codex-oficial-chat",
  storageBucket: "codex-oficial-chat.firebasestorage.app",
  messagingSenderId: "98599997360",
  appId: "1:98599997360:web:d9efddd87ea4c23b1a5075"
};

// 🚀 Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🎯 Função principal
export function iniciarChat() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input-field");
  const mensagens = document.getElementById("chat-mensagens");

  if (!form || !input || !mensagens) return;

  // 👂 Escuta mensagens em tempo real
  const q = query(
    collection(db, "mensagens"),
    orderBy("createdAt")
  );

  onSnapshot(q, snapshot => {
    mensagens.innerHTML = "";
    snapshot.forEach(doc => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.className = "mensagem";
      div.textContent = msg.texto;
      mensagens.appendChild(div);
    });

    mensagens.scrollTop = mensagens.scrollHeight;
  });

  // ✉️ Enviar mensagem
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) return;

    await addDoc(collection(db, "mensagens"), {
      texto,
      createdAt: serverTimestamp()
    });

    input.value = "";
  });
}