// Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const fullMenu = document.getElementById('fullMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    // Función para abrir el menú
    function openMenu() {
        fullMenu.classList.add('active');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
    
    // Función para cerrar el menú
    function closeMenuFunc() {
        fullMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // Event listeners
    menuBtn.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    
    // Cerrar menú al hacer clic fuera del contenido
    fullMenu.addEventListener('click', function(e) {
        if (e.target === fullMenu) {
            closeMenuFunc();
        }
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && fullMenu.classList.contains('active')) {
            closeMenuFunc();
        }
    });
    
    // Animación suave para los enlaces del menú
    const menuLinks = document.querySelectorAll('.menu-list a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar menú después de un pequeño delay
            setTimeout(() => {
                closeMenuFunc();
            }, 300);
            
            // Aquí puedes agregar la lógica para navegar a las secciones
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efecto hover en el botón de menú - REMOVIDO
    // menuBtn.addEventListener('mouseenter', function() {
    //     if (!fullMenu.classList.contains('active')) {
    //         this.style.transform = 'scale(1.05)';
    //     }
    // });
    
    // menuBtn.addEventListener('mouseleave', function() {
    //     this.style.transform = 'scale(1)';
    // });
    
    // Animación de entrada para los elementos del menú
    function animateMenuItems() {
        const menuItems = document.querySelectorAll('.menu-list li');
        const downloadBtn = document.querySelector('.menu-list-download');
        
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // Animar el botón de descarga
        if (downloadBtn) {
            downloadBtn.style.opacity = '0';
            downloadBtn.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                downloadBtn.style.transition = 'all 0.5s ease';
                downloadBtn.style.opacity = '1';
                downloadBtn.style.transform = 'translateY(0)';
            }, 100 * (menuItems.length + 1));
        }
    }
    
    // Observar cuando el menú se abre para animar los elementos
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (fullMenu.classList.contains('active')) {
                    animateMenuItems();
                }
            }
        });
    });
    
    observer.observe(fullMenu, {
        attributes: true
    });
    
    // Funcionalidad del botón de descarga CV
    const downloadBtn = document.querySelector('.menu-list-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear un enlace temporal para descargar
            const link = document.createElement('a');
            link.href = 'assets/image/CurriculumEmilio.pdf'; // Ruta a tu CV
            link.download = 'CV_Emilio_Mochon.pdf';
            link.target = '_blank';
            
            // Agregar efecto visual de descarga
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simular descarga (puedes cambiar la ruta real de tu CV)
            try {
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Mostrar notificación de descarga exitosa
                showDownloadNotification();
            } catch (error) {
                console.log('Error al descargar CV:', error);
                // Fallback: abrir en nueva pestaña
                window.open('assets/image/CurriculumEmilio.pdf', '_blank');
            }
        });
    }
    
    // Función para mostrar notificación de descarga
    function showDownloadNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: 'Poppins', sans-serif;
            font-size: 0.9rem;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            CV descargado exitosamente
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}); 