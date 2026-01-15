export function initCarousel() {
    const cards = Array.from(document.querySelectorAll('.carousel-card'));
    const btnLeft = document.querySelector('.carousel-btn.left');
    const btnRight = document.querySelector('.carousel-btn.right');

    if (cards.length !== 3) {
        console.error("O carrossel precisa ter exatamente 3 cards.");
        return;
    }

    let index = 0; // card central = 0

    function atualizarPosicoes() {
        cards.forEach(card => {
            card.classList.remove("left", "center", "right");
        });

        const leftIndex = (index - 1 + 3) % 3;
        const centerIndex = index;
        const rightIndex = (index + 1) % 3;

        cards[leftIndex].classList.add("left");
        cards[centerIndex].classList.add("center");
        cards[rightIndex].classList.add("right");
    }

    btnRight.onclick = () => {
        index = (index + 1) % 3;
        atualizarPosicoes();
    };

    btnLeft.onclick = () => {
        index = (index - 1 + 3) % 3;
        atualizarPosicoes();
    };

    // POSIÇÃO INICIAL
    atualizarPosicoes();

    // Ativar transições somente depois das posições estarem aplicadas
    setTimeout(() => {
        document.querySelector('.carousel-container').classList.add('loaded');
    }, 50);
}