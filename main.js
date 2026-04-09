document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. CONFIGURACIÓN DE INICIO Y SCROLL --- */
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    /* --- 2. FONDO ANIMADO (VANTA.JS) --- */
    const vantaEffect = VANTA.NET({
        el: "#animated-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x06b6d4,
        backgroundColor: 0x0a0a0a,
        points: 10.00,
        maxDistance: 20.00,
        spacing: 16.00
    });

    window.addEventListener('resize', () => {
        vantaEffect.resize();
    });

    /* --- 3. NAVEGACIÓN (MENÚ MÓVIL Y ACTIVE LINKS) --- */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Cerrar menú móvil
            navMenu.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
            // Marcar link como activo
            navLinks.forEach(lnk => lnk.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /* --- 4. LÓGICA DEL MODAL DE CONSULTORÍA (PROYECTOS) --- */
    const modalConsulta = document.getElementById("modal-consulta");
    const btnAbrirConsulta = document.getElementById("btn-iniciar-proyecto");
    const spanCerrarConsulta = document.querySelector(".close-modal");

    if (btnAbrirConsulta) {
        btnAbrirConsulta.onclick = (e) => {
            e.preventDefault();
            modalConsulta.style.display = "block";
            document.body.style.overflow = 'hidden';
        }
    }

    /* --- 5. LÓGICA DEL MODAL DE SERVICIOS (DETALLES) --- */
    const serviceModal = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body-content');
    const closeServiceBtn = document.querySelector('.close-service');

    const serviceDetails = {
        'Desarrollo Web': 'Creamos sitios modernos, rápidos y optimizados para SEO utilizando las últimas tecnologías como React, Next.js y Node.js.',
        'E-commerce': 'Tiendas en línea robustas con pasarelas de pago seguras y gestión de inventario intuitiva para escalar tu negocio.',
        'Gestión Académica (SIS)': 'Sistemas integrales para instituciones educativas: control de notas, asistencia y comunicación con padres.',
        'Infraestructura de Redes': 'Diseño y montaje de redes estructuradas, asegurando conectividad estable y segura para empresas.',
        'Cámaras de Seguridad': 'Instalación de sistemas de vigilancia IP con acceso remoto para monitorear tu espacio desde cualquier lugar.',
        'Puntos de Acceso (AP)': 'Optimización de cobertura Wi-Fi mediante puntos de acceso de alta densidad para entornos de alto tráfico.'
    };

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const iconClass = card.querySelector('i').className;
            const description = serviceDetails[title] || 'Detalles técnicos próximamente...';

            modalBody.innerHTML = `
                <i class="${iconClass} modal-detail-icon"></i>
                <h2 class="modal-detail-title">${title}</h2>
                <p class="modal-detail-text">${description}</p>
            `;
            serviceModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    /* --- 6. CIERRE DE MODALES (GENERAL) --- */
    const cerrarModales = () => {
        if(modalConsulta) modalConsulta.style.display = "none";
        if(serviceModal) serviceModal.style.display = "none";
        document.body.style.overflow = 'auto';
    };

    if (spanCerrarConsulta) spanCerrarConsulta.onclick = cerrarModales;
    if (closeServiceBtn) closeServiceBtn.onclick = cerrarModales;

    window.onclick = (event) => {
        if (event.target == modalConsulta || event.target == serviceModal) {
            cerrarModales();
        }
    };

    /* --- 7. ENVÍO DE FORMULARIO CON EMAILJS --- */
    const formConsulta = document.getElementById("form-consulta");
    if (formConsulta) {
        formConsulta.onsubmit = function(e) {
            e.preventDefault();
            const btn = this.querySelector("button");
            const originalText = btn.innerText;
            btn.innerText = "Sincronizando Protocolos...";
            btn.disabled = true;

            const templateParams = {
                from_name: this.querySelector('input[type="text"]').value,
                client_phone: document.getElementById("tel-cliente").value,
                service_type: document.getElementById("tipo-servicio").value,
                message: this.querySelector('textarea').value
            };

            emailjs.send('service_ar841iy', 'template_tzb6m1k', templateParams)
                .then(() => {
                    mostrarNotificacion("Protocolo completado. Un ingeniero lo contactará pronto.");
                    cerrarModales();
                    this.reset();
                })
                .catch((error) => {
                    console.error("Fallo:", error);
                    mostrarNotificacion("Error de conexión. Intente nuevamente.");
                })
                .finally(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        };
    }

    function mostrarNotificacion(mensaje) {
        const toast = document.getElementById("custom-notification");
        const msgElem = document.getElementById("notification-message");
        if (toast && msgElem) {
            msgElem.innerText = mensaje;
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 4000);
        }
    }
});