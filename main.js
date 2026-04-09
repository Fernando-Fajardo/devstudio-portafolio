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
        'Desarrollo Web': 'Construimos ecosistemas digitales de alto rendimiento bajo arquitecturas escalables. Implementamos tecnologías de vanguardia como React y Next.js para garantizar velocidad, seguridad avanzada y una experiencia de usuario (UX) de clase mundial orientada a la conversión profesional.',
        'E-commerce': 'Desarrollamos soluciones transaccionales de alto rendimiento con integración nativa de inventarios, automatización de pedidos y pasarelas de pago blindadas. Nuestros sistemas permiten la gestión omnicanal de stock en tiempo real, asegurando escalabilidad operativa con alta demanda transaccional.',
        'Gestión Académica (SIS)': 'Sistemas integrales para instituciones educativas: control de notas, asistencia y comunicación con padres.',
        'Infraestructura de Redes': 'Diseño y montaje de redes estructuradas, asegurando conectividad estable y segura para empresas, oficinas, hogares, etc.',
        'Cámaras de Seguridad': 'Instalación de sistemas de vigilancia con acceso remoto para monitorear tu espacio desde cualquier lugar.',
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
            serviceModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    /* --- 6. CIERRE DE MODALES (LIMPIEZA TOTAL) --- */
const cerrarModales = () => {
    // 1. Ocultamos el modal de servicios
    if(serviceModal) serviceModal.style.display = "none";
    
    // 2. Ocultamos el modal de consulta
    if(modalConsulta) modalConsulta.style.display = "none";

    // 3. ¡IMPORTANTE! Cerramos el menú lateral móvil
    const navMenu = document.querySelector('.nav-menu'); 
    if(navMenu) {
        navMenu.classList.remove('active'); // Quitamos la clase que lo deja abierto
    }

    // 4. Resetear el icono del menú (de X a barras)
    const menuIcon = document.querySelector('#mobile-menu i');
    if (menuIcon) {
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    }

    // 5. Devolvemos el scroll a la página
    document.body.style.overflow = 'auto';
};

/* --- 6.1 ASIGNACIÓN DE EVENTOS DE CIERRE --- */
    // 1. Clic en la X del modal de servicios
    if (closeServiceBtn) {
    closeServiceBtn.onclick = cerrarModales;
}

// Si tienes una X específica para el menú móvil, también conéctala:
if (menuToggle) {
    menuToggle.onclick = (e) => {
        // Si el menú está abierto, lo cerramos con la función general
        if(navMenu.classList.contains('active')) {
            cerrarModales();
        } else {
            // Si está cerrado, lo abrimos normalmente
            navMenu.classList.add('active');
            menuToggle.querySelector('i').classList.replace('fa-bars', 'fa-times');
        }
    };
}

    // 2. Clic en la X del modal de consulta
    if (spanCerrarConsulta) {
        spanCerrarConsulta.addEventListener('click', cerrarModales);
    }

    // 3. Clic fuera de los modales (en el fondo oscuro)
    window.addEventListener('click', (event) => {
        if (event.target == modalConsulta || event.target == serviceModal) {
            cerrarModales();
        }
    });

    // 4. Tecla Escape para cerrar todo
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") cerrarModales();
    });

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