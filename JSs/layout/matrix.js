function iniciarMatrix() {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let columns = [];
  let columnCount = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    columnCount = Math.floor(canvas.width / fontSize);

    columns = [];
    for (let i = 0; i < columnCount; i++) {
      columns[i] = {
        y: Math.random() * canvas.height,
        speed: Math.random() * 1.5 + 0.5,
        digit: "1"
      };
    }
  }

  let frameCounter = 0;

  function draw() {
    frameCounter++;

    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#b33aff";
    ctx.font = "16px Orbitron, monospace";
    ctx.textAlign = "center";

    const fontSize = 16;

    for (let i = 0; i < columnCount; i++) {
      if (frameCounter % 10 === 0) {
        columns[i].digit = Math.random() > 0.3 ? "1" : "0";
      }

      const x = i * fontSize + fontSize / 2;
      ctx.fillText(columns[i].digit, x, columns[i].y);

      columns[i].y += columns[i].speed;

      if (columns[i].y > canvas.height) {
        columns[i].y = -fontSize;
        columns[i].speed = Math.random() * 1.5 + 0.5;
      }
    }

    requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();
  window.addEventListener("resize", resizeCanvas);
}

/* --------- FADE DO MATRIX --------- */

function iniciarFadeMatrix() {
  const fade = document.getElementById("matrix-fade");
  if (!fade) return;

  window.addEventListener("scroll", () => {
    const maxFade = 600;
    const opacity = Math.min(window.scrollY / maxFade, 1);
    fade.style.opacity = opacity;
  });
}

export { iniciarMatrix, iniciarFadeMatrix };