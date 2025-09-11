// Portfolio Interactive Features - JavaScript

// Classe principal do Portfolio
class Portfolio {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.observer = null;

        this.init();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupNavbarEffects();
        this.setupTechProgressAnimation();
        this.setupProjectHoverEffects();
        this.setupTypingEffect();
        this.createBackgroundParticles();
        this.optimizePerformance();
    }

    init() {
        console.log('Portfolio inicializado');
        this.animateOnScroll();
    }

    // Configurar Intersection Observer para animações no scroll
    setupIntersectionObserver() {
        const config = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.highlightActiveNavLink(entry.target.id);
                }
            });
        }, config);

        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    // Destacar link ativo na navegação
    highlightActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Configurar rolagem suave
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Efeitos da barra de navegação
    setupNavbarEffects() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (this.navbar) {
                if (currentScrollY > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }

                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    this.navbar.style.transform = 'translateY(-100%)';
                } else {
                    this.navbar.style.transform = 'translateY(0)';
                }
            }

            lastScrollY = currentScrollY;
        });
    }

    // Animar elementos no scroll
    animateOnScroll() {
        const animatedElements = document.querySelectorAll('.section-title, .about-content, .projects-grid, .tech-grid');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    // Animar barras de progresso das tecnologias
    setupTechProgressAnimation() {
        const techBars = document.querySelectorAll('.tech-progress');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.3 });

        techBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    // Adicionar efeitos de hover nos cards de projeto
    setupProjectHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addParallaxEffect(card);
            });

            card.addEventListener('mousemove', (e) => {
                this.handleMouseMove(e, card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetCardTransform(card);
            });
        });
    }

    // Efeito parallax nos cards
    addParallaxEffect(card) {
        card.style.transition = 'transform 0.1s ease-out';
    }

    // Manipular movimento do mouse nos cards
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    // Resetar transformação do card
    resetCardTransform(card) {
        card.style.transition = 'transform 0.3s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    // Efeito de digitação para o nome
    setupTypingEffect() {
        const nameElement = document.querySelector('.about-name');
        if (nameElement) {
            const originalText = nameElement.textContent || '';
            nameElement.textContent = '';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < originalText.length) {
                    nameElement.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 100);
        }
    }

    // Adicionar partículas de fundo
    createBackgroundParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;

        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }

    // Criar partícula individual
    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, #dc143c, transparent);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: float ${duration}s infinite linear;
            opacity: 0.6;
        `;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            this.createParticle(container);
        }, duration * 1000);
    }

    // Configurar tema dark/light (futuro)
    setupThemeToggle() {
        console.log('Theme toggle configurado para implementação futura');
    }

    // Performance optimization
    optimizePerformance() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Lógica de scroll otimizada
            }, 10);
        });
    }
}

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    console.log('Portfolio carregado com sucesso!');
});
