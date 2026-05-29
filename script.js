document.addEventListener('DOMContentLoaded', () => {

    const spaLinks = document.querySelectorAll('.spa-link');
    const sections = document.querySelectorAll('.section-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const btnPersonajes = document.getElementById('btn-personajes');
    const dropdown = document.querySelector('.dropdown');

    // --- LOGICA SPA ---
    spaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                e.preventDefault();

                sections.forEach(sec => sec.classList.remove('active-section'));
                targetSection.classList.add('active-section');

                navLinks.forEach(nl => nl.classList.remove('active'));
                
                if (link.classList.contains('dropdown-item')) {
                    btnPersonajes.classList.add('active');
                } else {
                    link.classList.add('active');
                }

                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                dropdown.classList.remove('mobile-open');
                
                window.scrollTo(0, 0);
            }
        });
    });

    // --- MENU MOBILE ---
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    btnPersonajes.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            dropdown.classList.toggle('mobile-open');
        }
    });

    // --- VALIDACION FORMULARIO ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            let isValid = true;

            const inputs = [
                { id: 'nombre', errorId: 'error-nombre', type: 'text' },
                { id: 'email', errorId: 'error-email', type: 'email' },
                { id: 'mensaje', errorId: 'error-mensaje', type: 'text' }
            ];

            inputs.forEach(input => {
                const el = document.getElementById(input.id);
                const errEl = document.getElementById(input.errorId);
                
                errEl.style.display = 'none';
                el.style.borderColor = '#333';

                if (el.value.trim() === '') {
                    errEl.style.display = 'block';
                    el.style.borderColor = '#e74c3c';
                    isValid = false;
                } else if (input.type === 'email') {
                    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                    if (!el.value.match(emailPattern)) {
                        errEl.style.display = 'block';
                        el.style.borderColor = '#e74c3c';
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                alert('¡Formulario enviado! Todo funciona 10 puntos.');
                form.reset(); 
            }
        });
    }

    // --- LOGICA VISOR GALERIA (LIGHTBOX) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src; 
            lightboxImg.alt = img.alt;
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});