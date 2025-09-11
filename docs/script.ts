// Portfolio Interactive Features - TypeScript

// Interface para definir configurações de animação
interface AnimationConfig {
    threshold: number;
    rootMargin: string;
}

// Interface para elementos observados
interface ObservedElement extends Element {
    dataset: DOMStringMap;
}

// Classe principal do Portfolio
class Portfolio {
    private navbar: HTMLElement | null;
    private sections: NodeListOf<Element>;
    private navLinks: NodeListOf<Element>;
    private observer: IntersectionObserver;

    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupNavbarEffects();
        this.setupTechProgressAnimation();
    }

    private init(): void {
        console.log('Portfolio inicializado');
        this.animateOnScroll();
    }

    // Configurar Intersection Observer para animações no scroll
    private setupIntersectionObserver(): void {
        const config: AnimationConfig = {
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

        // Observar todas as seções
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    // Destacar link ativo na navegação
    private highlightActiveNavLink(sectionId: string): void {
        this.navLinks.forEach(link => {
            const href = (link as HTMLAnchorElement).getAttribute('href');
            link.classList.remove('active');
            
            if (href === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Configurar rolagem suave
    private setupSmoothScrolling(): void {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = (link as HTMLAnchorElement).getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        const offsetTop = (targetSection as HTMLElement).offsetTop - 80;
                        
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
    private setupNavbarEffects(): void {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (this.navbar) {
                // Adicionar/remover classe de scroll
                if (currentScrollY > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }

                // Ocultar/mostrar navbar baseado na direção do scroll
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
    private animateOnScroll(): void {
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
    private setupTechProgressAnimation(): void {
        const techBars = document.querySelectorAll('.tech-progress');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target as HTMLElement;
                    const width = progressBar.style.width;
                    
                    // Resetar e animar
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
    private setupProjectHoverEffects(): void {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addParallaxEffect(card as HTMLElement);
            });

            card.addEventListener('mousemove', (e) => {
                this.handleMouseMove(e as MouseEvent, card as HTMLElement);
            });

            card.addEventListener('mouseleave', () => {
                this.resetCardTransform(card as HTMLElement);
            });
        });
    }

    // Efeito parallax nos cards
    private addParallaxEffect(card: HTMLElement): void {
        card.style.transition = 'transform 0.1s ease-out';
    }

    // Manipular movimento do mouse nos cards
    private handleMouseMove(e: MouseEvent, card: HTMLElement): void {
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
    private resetCardTransform(card: HTMLElement): void {
        card.style.transition = 'transform 0.3s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    // Efeito de digitação para o nome
    private setupTypingEffect(): void {
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
    private createBackgroundParticles(): void {
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

        // Criar partículas
        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }

    // Criar partícula individual
    private createParticle(container: HTMLElement): void {
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

        // Remover e recriar partícula quando sair da tela
        setTimeout(() => {
            particle.remove();
            this.createParticle(container);
        }, duration * 1000);
    }

    // Configurar tema dark/light (futuro)
    private setupThemeToggle(): void {
        // Implementação futura para toggle de tema
        console.log('Theme toggle configurado para implementação futura');
    }

    // Performance optimization
    private optimizePerformance(): void {
        // Lazy loading para imagens
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });

        // Debounce para eventos de scroll
        let scrollTimeout: NodeJS.Timeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Lógica de scroll otimizada
            }, 10);
        });
    }
}

// Estilos CSS adicionais para animações
const additionalStyles = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        33% {
            transform: translateY(-10px) rotate(120deg);
        }
        66% {
            transform: translateY(5px) rotate(240deg);
        }
    }

    .navbar.scrolled {
        background: rgba(26, 26, 26, 0.98);
        box-shadow: 0 2px 20px rgba(220, 20, 60, 0.1);
    }

    .nav-link.active {
        color: var(--accent-red) !important;
        background: rgba(220, 20, 60, 0.1);
    }

    .animate-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .project-card {
        transform-style: preserve-3d;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Adicionar estilos ao DOM
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    console.log('Portfolio carregado com sucesso!');
});

// Exportar para uso em outros módulos (se necessário)
export { Portfolio };