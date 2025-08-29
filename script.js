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

    const fadeInElements = document.querySelectorAll('.fade-in-element');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeInElements.forEach(el => {
        observer.observe(el);
    });


    // --- LÓGICA DO CARROSSEL DE PORTFÓLIO (ATUALIZADA) ---
    const carousel = document.querySelector('.carousel');
    if (carousel) { // Garante que o código só rode se o carrossel existir na página
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        const totalItems = items.length;
        let currentIndex = 0;

        // Cria os pontos de navegação
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');

        function updateCarousel() {
            items.forEach((item, index) => {
                item.classList.remove('active', 'prev', 'next');
            });

            const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
            const nextIndex = (currentIndex + 1) % totalItems;

            items[prevIndex].classList.add('prev');
            items[currentIndex].classList.add('active');
            items[nextIndex].classList.add('next');
            
            // Atualiza o ponto ativo
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        // Event Listeners para os botões
        nextBtn.addEventListener('click', () => {
            goToSlide((currentIndex + 1) % totalItems);
        });

        prevBtn.addEventListener('click', () => {
            goToSlide((currentIndex - 1 + totalItems) % totalItems);
        });

        // Inicializa o carrossel
        updateCarousel();
    }


    // --- CÓDIGO ORIGINAL (CABEÇALHO, MENU, ETC.) ---
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        const headline = document.getElementById("headline");
        let textSwitched = false;
        let animating = false;
        let startY = 0;

        window.scrollTo(0, 0);
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
            } else if (textSwitched && deltaY < -20 && window.scrollY === 0) {
                e.preventDefault();
                animateRevertText();
            }
        }, { passive: false });

        function animateSwitchText() {
            animating = true;
            headline.style.opacity = 0;
            setTimeout(() => {
                headline.textContent = "Transformamos ideias em soluções digitais inteligentes.";
                void headline.offsetWidth;
                headline.style.opacity = 1;
                textSwitched = true;
                animating = false;
            }, 300);
        }

        function animateRevertText() {
            animating = true;
            headline.style.opacity = 0;
            setTimeout(() => {
                headline.textContent = "Inove. Floresça.";
                void headline.offsetWidth;
                headline.style.opacity = 1;
                textSwitched = false;
                animating = false;
            }, 300);
        }
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
