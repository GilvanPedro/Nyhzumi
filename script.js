// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the hamburger menu elements
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const body = document.body;
    
    // Toggle menu when clicking the hamburger icon
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a menu item (for mobile)
        const menuItems = document.querySelectorAll('.nav-menu .item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    body.classList.remove('menu-open');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open') && 
                !e.target.closest('.nav-8') && 
                !e.target.closest('.hamburger-menu')) {
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                body.classList.remove('menu-open');
            }
        });
    }
    // Função para animação ao rolar a página
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.scroll-animate');
        const windowHeight = window.innerHeight;
        const elementVisible = 150; // Distância do topo para ativar a animação

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            // Verifica se o elemento está visível na tela
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animate');
                
                // Efeito especial para cards de modelo
                if (element.classList.contains('model-card')) {
                    setTimeout(() => {
                        element.style.transform = 'translateY(-10px)';
                    }, 100);
                }
                
                // Tratamento especial para a seção de lore
                if (element.classList.contains('about-nyh') && element.querySelector('h1').textContent === 'Lore') {
                    element.classList.add('animate');
                }
            }
        });
    };

    // Executa a animação uma vez ao carregar a página
    animateOnScroll();
    
    // Configura o evento de scroll com debounce para melhor performance
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            animateOnScroll();
        }, 66); // Taxa de atualização de ~60fps
    }, false);

    // Configura rolagem suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(ancora => {
        ancora.addEventListener('click', function (e) {
            e.preventDefault();
            const alvo = document.querySelector(this.getAttribute('href'));
            if (alvo) {
                window.scrollTo({
                    top: alvo.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializa todos os carrosséis
    document.querySelectorAll('.carousel').forEach(carrossel => {
        const imagens = carrossel.querySelectorAll('img');
        const botaoAnterior = carrossel.querySelector('.prev');
        const botaoProximo = carrossel.querySelector('.next');
        
        // Verifica se há mais de uma imagem
        if (imagens.length <= 1) {
            if (imagens[0]) imagens[0].classList.add('active');
            return;
        }

        let indiceAtual = 0;
        
        // Mostra a primeira imagem
        imagens[0].classList.add('active');
        
        // Função para mostrar imagem pelo índice
        function mostrarImagem(indice) {
            // Esconde todas as imagens
            imagens.forEach(img => img.classList.remove('active'));
            
            // Mostra a imagem selecionada
            imagens[indice].classList.add('active');
            indiceAtual = indice;
        }
        
        // Configura o botão de próxima imagem
        if (botaoProximo) {
            botaoProximo.addEventListener('click', () => {
                const proximoIndice = (indiceAtual + 1) % imagens.length;
                mostrarImagem(proximoIndice);
            });
        }
        
        // Configura o botão de imagem anterior
        if (botaoAnterior) {
            botaoAnterior.addEventListener('click', () => {
                const indiceAnterior = (indiceAtual - 1 + imagens.length) % imagens.length;
                mostrarImagem(indiceAnterior);
            });
        }
        
        // Configura a troca automática de imagens a cada 5 segundos
        let intervaloSlide = setInterval(() => {
            const proximoIndice = (indiceAtual + 1) % imagens.length;
            mostrarImagem(proximoIndice);
        }, 5000);
        
        // Pausa a troca automática ao passar o mouse sobre o carrossel
        carrossel.addEventListener('mouseenter', () => {
            clearInterval(intervaloSlide);
        });
        
        // Retoma a troca automática ao remover o mouse do carrossel
        carrossel.addEventListener('mouseleave', () => {
            intervaloSlide = setInterval(() => {
                const proximoIndice = (indiceAtual + 1) % imagens.length;
                mostrarImagem(proximoIndice);
            }, 5000);
        });
    });
});