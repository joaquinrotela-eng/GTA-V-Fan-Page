document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const spaLinks = document.querySelectorAll('.spa-link');               // Enlaces que manejan la navegación SPA
    const sections = document.querySelectorAll('.section-container');        // Contenedores de cada sección/pantalla
    const navLinks = document.querySelectorAll('.nav-link');                 // Enlaces generales en la barra de navegación
    const hamburger = document.getElementById('hamburger');                 // Botón de menú hamburguesa móvil
    const navMenu = document.getElementById('nav-menu');                     // Menú de navegación principal
    const btnPersonajes = document.getElementById('btn-personajes');         // Enlace dropdown "Personajes"
    const dropdown = document.querySelector('.dropdown');                     // Contenedor del dropdown de personajes

    // --- LÓGICA SPA (Single Page Application) ---
    // Escucha clics en todos los enlaces con clase '.spa-link' para alternar secciones sin recargar
    spaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);       // Obtiene el ID del destino (ej. "franklin")
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                e.preventDefault(); // Evita la recarga por defecto del enlace

                // Oculta todas las secciones activas y activa únicamente la sección destino
                sections.forEach(sec => sec.classList.remove('active-section'));
                targetSection.classList.add('active-section');

                // Remueve el estado activo visual de todos los enlaces del menú
                navLinks.forEach(nl => nl.classList.remove('active'));
                
                // Si el clic viene del menú desplegable, marca activo el botón padre "Personajes"
                if (link.classList.contains('dropdown-item')) {
                    btnPersonajes.classList.add('active');
                } else {
                    link.classList.add('active');
                }

                // Cierra automáticamente el menú móvil y los dropdowns abiertos tras navegar
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                dropdown.classList.remove('mobile-open');
                
                // Regresa el scroll a la parte superior de la página para una mejor experiencia visual
                window.scrollTo(0, 0);
            }
        });
    });

    // --- MENÚ RESPONSIVO (MOBILE) ---
    // Alterna la visibilidad del menú lateral al hacer clic en el botón hamburguesa
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // En dispositivos móviles (pantalla <= 900px), el botón de Personajes actúa para expandir el dropdown
    btnPersonajes.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault(); // Evita navegar a la parte superior al hacer clic
            dropdown.classList.toggle('mobile-open');
        }
    });

    // --- VALIDACIÓN DE FORMULARIO DE CONTACTO ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Detiene el envío y recarga nativos del formulario
            let isValid = true;

            // Configuración de los campos a validar y sus respectivos contenedores de error
            const inputs = [
                { id: 'nombre', errorId: 'error-nombre', type: 'text' },
                { id: 'email', errorId: 'error-email', type: 'email' },
                { id: 'mensaje', errorId: 'error-mensaje', type: 'text' }
            ];

            inputs.forEach(input => {
                const el = document.getElementById(input.id);
                const errEl = document.getElementById(input.errorId);
                
                // Limpia estilos de error previos
                errEl.style.display = 'none';
                el.style.borderColor = '#333';

                // Validación: Comprueba si el campo está vacío
                if (el.value.trim() === '') {
                    errEl.style.display = 'block';
                    el.style.borderColor = '#e74c3c'; // Borde rojo
                    isValid = false;
                } 
                // Validación específica para el formato de correo electrónico
                else if (input.type === 'email') {
                    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                    if (!el.value.match(emailPattern)) {
                        errEl.style.display = 'block';
                        el.style.borderColor = '#e74c3c';
                        isValid = false;
                    }
                }
            });

            // Si todos los campos son válidos, notifica al usuario y resetea el formulario
            if (isValid) {
                alert('¡Formulario enviado! Todo funciona 10 puntos.');
                form.reset(); 
            }
        });
    }

    // --- LÓGICA DEL VISOR DE GALERÍA AMPLIADA (LIGHTBOX) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Selecciona todas las imágenes interactivas del sitio (galería, portada y retratos de personajes)
    const expandibleImages = document.querySelectorAll('.gallery-grid .gallery-item img, #inicio .col-left .img-responsive, .char-img');

    // Abre el lightbox y clona la imagen y su atributo alt al hacer clic en ella
    expandibleImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src; 
            lightboxImg.alt = img.alt;
        });
    });

    // Cierra el lightbox al hacer clic en la 'X' de cierre
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Cierra el lightbox si se hace clic fuera de la imagen (en la zona oscura del fondo)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});