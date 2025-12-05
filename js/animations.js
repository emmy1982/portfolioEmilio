// Efecto de escritura para el título principal
function initTypewriterEffect() {
    const title = document.querySelector('.text-hero-1 h1');
    if (!title) return;
    
    const originalText = title.innerHTML;
    const spanText = title.querySelector('span');
    
    if (spanText) {
        const spanOriginalText = spanText.textContent;
        spanText.textContent = '';
        
        // Remover el cursor parpadeante inicialmente
        spanText.style.setProperty('--cursor-visible', 'none');
        
        let i = 0;
        const typeWriter = () => {
            if (i < spanOriginalText.length) {
                spanText.textContent += spanOriginalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Mostrar el cursor parpadeante cuando termine la escritura
                spanText.style.setProperty('--cursor-visible', 'block');
            }
        };
        
        // Iniciar inmediatamente
        setTimeout(typeWriter, 500);
    }
}

// Función para iniciar las animaciones del hero
function initHeroAnimations() {
    const heroElements = [
        '.text-hero',
        '.image-hero',
        '.text-hero-1',
        '.text-hero-2',
        '.links-hero',
        '.scroll-down',
        '.image-hero img',
        '.sidebar'
    ];
    
    // Remover las animaciones CSS iniciales
    heroElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.animation = 'none';
        }
    });
    
    // Reiniciar las animaciones después de un pequeño delay
    setTimeout(() => {
        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (!element) return;
            
            // Limpiar estilos iniciales
            element.style.opacity = '';
            element.style.transform = '';
            
            // Verificar si es responsive (ancho menor a 768px)
            const isMobile = window.innerWidth <= 768;
            
            // Aplicar animación según el elemento
            const animationName = getAnimationName(selector);
            const delay = 0.2 + (index * 0.15);
            
            // Para la imagen en responsive, solo aplicar float sin animación de entrada
            if (selector === '.image-hero img' && isMobile) {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
                element.style.filter = 'none';
                // Mantener solo la animación float
                element.style.animation = 'float 6s ease-in-out infinite';
            } 
            // Para el contenedor de la imagen en responsive
            else if (selector === '.image-hero' && isMobile) {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
                element.style.animation = 'none';
            }
            else {
                // Aplicar animación normal para otros elementos
                element.style.animation = `${animationName} 1s ease-out ${delay}s both`;
                
                // Para la imagen en desktop, restaurar float después de la animación
                if (selector === '.image-hero img' && !isMobile) {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                        element.style.animation = 'float 6s ease-in-out infinite';
                    }, (delay + 1) * 1000);
                }
            }
        });
    }, 50);
}

// Función para obtener el nombre de la animación según el selector
function getAnimationName(selector) {
    switch(selector) {
        case '.text-hero':
        case '.text-hero-1':
            return 'slideInFromLeft';
        case '.image-hero':
            return 'slideInFromRight';
        case '.text-hero-2':
        case '.links-hero':
        case '.scroll-down':
            return 'fadeInUp';
        case '.image-hero img':
            return 'zoomIn';
        case '.sidebar':
            return 'expandWidth';
        default:
            return 'fadeInUp';
    }
}

// Función para animaciones de scroll
function initScrollAnimations() {
    // Elementos que se animarán al hacer scroll
    const scrollElements = [
        '.about-header',
        '.about-main-title',
        '.about-profile',
        '.about-right img',
        '.skills-header',
        '.skills-grid',
        '.skills-vertical-line',
        '.projects-header',
        '.project-item',
        '.footer-left',
        '.footer-right'
    ];

    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.05, // Se activa cuando el 5% del elemento es visible
        rootMargin: '0px 0px -200px 0px' // Se activa 200px antes de que el elemento entre en viewport
    };

    // Crear el observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Aplicar animación según el tipo de elemento
                if (element.classList.contains('about-right') || element.matches('.about-right img')) {
                    element.style.animation = 'slideInFromRight 1s ease-out both';
                } else if (element.classList.contains('project-item')) {
                    // Animación escalonada para proyectos
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    const delay = index * 0.1;
                    element.style.animation = `fadeInUp 0.6s ease-out ${delay}s both`;
                } else if (element.classList.contains('skill-item')) {
                    // Animación escalonada para skills
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    const delay = index * 0.1;
                    element.style.animation = `fadeInUp 0.6s ease-out ${delay}s both`;
                } else {
                    element.style.animation = 'fadeInUp 1s ease-out both';
                }
                
                // Dejar de observar el elemento una vez animado
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observar todos los elementos
    scrollElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Establecer estado inicial
            element.style.opacity = '0';
            
            // Estado inicial específico para elementos que se deslizan desde la derecha
            if (element.classList.contains('about-right') || element.matches('.about-right img')) {
                element.style.transform = 'translateX(100px)';
            } else {
                element.style.transform = 'translateY(30px)';
            }
            
            element.style.transition = 'none';
            
            // Observar el elemento
            observer.observe(element);
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initTypewriterEffect();
    
    // Iniciar animaciones del hero inmediatamente
    initHeroAnimations();
    
    // Iniciar animaciones de scroll después de un pequeño delay
    setTimeout(() => {
        initScrollAnimations();
    }, 2000); // Esperar 2 segundos después de que termine el hero
}); 