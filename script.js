window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(() => {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO PARA ÍCONES E ANIMAÇÃO DE SCROLL DOS SERVIÇOS ---
    lucide.createIcons();

    // --- CÓDIGO ORIGINAL (CABEÇALHO, MENU, ETC.) ---
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        const headline = document.getElementById("headline");
        let textSwitched = false;
        let animating = false;
        let startY = 0;

        window.scrollTo(0, 0);

        // Função genérica para trocar o texto suavemente
        function switchText(newText, switched) {
            animating = true;
            headline.classList.add("fade-out");

            // Aguarda o fim da transição de fade-out
            headline.addEventListener("transitionend", function handler() {
                headline.removeEventListener("transitionend", handler);

                // Troca o texto e remove a classe para fazer o fade-in
                headline.textContent = newText;
                headline.classList.remove("fade-out");

                textSwitched = switched;
                animating = false;
            });
        }

        function animateSwitchText() {
            switchText("Transformamos ideias em soluções digitais inteligentes.", true);
        }

        function animateRevertText() {
            switchText("Inove. Floresça.", false);
        }

        // --- Scroll desktop ---
        window.addEventListener("wheel", (e) => {
            if (animating) return;
            if (!textSwitched && e.deltaY > 0 && window.scrollY < 10) {
                e.preventDefault();
                animateSwitchText();
            } else if (textSwitched && e.deltaY < 0 && window.scrollY === 0) {
                e.preventDefault();
                animateRevertText();
            }
        }, { passive: false });

        // --- Scroll mobile (toque) ---
        window.addEventListener("touchstart", (e) => {
            startY = e.touches[0].clientY;
        }, { passive: false });

        window.addEventListener("touchmove", (e) => {
            if (animating) return;
            const currentY = e.touches[0].clientY;
            const deltaY = startY - currentY;

            if (!textSwitched && deltaY > 20 && window.scrollY < 10) {
                e.preventDefault();
                animateSwitchText();
                startY = currentY; // 🔑 atualiza para evitar bloqueio no "press drag"
            } else if (textSwitched && deltaY < -20 && window.scrollY === 0) {
                e.preventDefault();
                animateRevertText();
                startY = currentY; // 🔑 idem aqui
            }
        }, { passive: false });
    }


    const menu = document.getElementById('mobileMenu');
    const links = menu.querySelectorAll('a');
    const hamburger = document.querySelector('.hamburger');

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            hamburger.textContent = '☰';
            document.body.classList.remove('no-scroll');
        });
    });
});

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const isOpen = menu.classList.toggle('show');
    hamburger.textContent = isOpen ? '✕' : '☰';
    document.body.classList.toggle('no-scroll', isOpen);
}

function redirect() {
    const isMobile = window.innerWidth <= 768;
    const url = isMobile
        ? "https://bitbloomai.com/apresentacao-mobile.pdf"
        : "https://bitbloomai.com/apresentacao.pdf";
    window.open(url, '_blank');
}
