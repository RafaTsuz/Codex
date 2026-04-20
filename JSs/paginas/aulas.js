function iniciarBotonsAulas() {
  const total = 15;

  function irPara(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const topo = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: topo, behavior: 'smooth' });
  }

  for (let i = 1; i <= total; i++) {
    const titulo = document.getElementById('aula' + i);
    if (!titulo) continue;

    const bloco = titulo.nextElementSibling;
    if (!bloco) continue;

    const botoes = bloco.querySelectorAll('.btn-vai-volta');
    if (botoes.length < 1) continue;

    if (botoes.length === 1) {
      const [btn] = botoes;
      if (i === 1) {
        btn.onclick = () => irPara('aula' + (i + 1));
      } else {
        btn.onclick = () => irPara('aula' + (i - 1));
      }
    } else {
      const [btnVoltar, btnProxima] = botoes;

      btnVoltar.onclick = () => irPara('aula' + (i - 1));

      if (i === total) {
        btnProxima.disabled = true;
      } else {
        btnProxima.onclick = () => irPara('aula' + (i + 1));
      }
    }
  }
}

export { iniciarBotonsAulas };