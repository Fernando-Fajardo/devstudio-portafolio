document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. CONFIGURACIÓN DE INICIO --- */
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    /* --- 2. FONDO ANIMADO --- */
    const vantaEffect = VANTA.NET({
        el: "#animated-bg",
        mouseControls: true, touchControls: true,
        minHeight: window.innerHeight, minWidth: window.innerWidth,
        scale: 1.00, scaleMobile: 1.00,
        color: 0x06b6d4, backgroundColor: 0x0a0a0a,
        points: 10.00, maxDistance: 20.00, spacing: 16.00
    });
    window.addEventListener('resize', () => vantaEffect.resize());

    /* --- 3. VARIABLES PRINCIPALES --- */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a'); // Ya están declaradas aquí
    const sections = document.querySelectorAll('section');      // Añadimos esta aquí arriba
    const serviceModal = document.getElementById('service-modal');
    const modalConsulta = document.getElementById("modal-consulta");
    const modalBody = document.getElementById('modal-body-content');
    const closeServiceBtn = document.querySelector('.close-service');
    const spanCerrarConsulta = document.querySelector(".close-modal");

    /* --- 4. FUNCIÓN UNIFICADA DE CIERRE --- */
    const cerrarTodo = () => {
        if(serviceModal) serviceModal.style.display = "none";
        if(modalConsulta) modalConsulta.style.display = "none";
        if(navMenu) navMenu.classList.remove('active');
        
        const icon = menuToggle?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
        document.body.style.overflow = 'auto';
    };

    /* --- 5. LÓGICA DEL MENÚ MÓVIL Y NAVEGACIÓN --- */
    if (menuToggle && navMenu) {
        menuToggle.onclick = (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.contains('active');
            if (isOpen) {
                cerrarTodo();
            } else {
                navMenu.classList.add('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-bars', 'fa-times');
            }
        };
    }

    // Manejo de clicks en el menú (Resaltado y Scroll)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Aplicar clase active visualmente
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                cerrarTodo();
            }
        });
    });

    /* --- 6. RESALTADO AUTOMÁTICO POR SCROLL --- */
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* --- 7. MODAL DE SERVICIOS --- */
    const serviceDetails = {
        'Desarrollo Web': 'Construimos ecosistemas digitales de alto rendimiento bajo arquitecturas escalables. Implementamos tecnologías de vanguardia para garantizar velocidad, seguridad avanzada y una experiencia de usuario (UX) de clase mundial orientada a la conversión profesional.',
        'E-commerce': 'Desarrollamos soluciones transaccionales de alto rendimiento con integración nativa de inventarios, automatización de pedidos y pasarelas de pago blindadas. Nuestros sistemas permiten la gestión omnicanal de stock en tiempo real, asegurando escalabilidad operativa con alta demanda transaccional.',
        'Gestión Académica (SIS)': 'Sistemas integrales para instituciones educativas: control de notas, asistencia y comunicación con padres.',
        'Infraestructura de Redes': 'Diseño y montaje de redes estructuradas, asegurando conectividad estable y segura para empresas, oficinas y centros de datos.',
        'Cámaras de Seguridad': 'Instalación de sistemas de vigilancia avanzada con acceso remoto y almacenamiento cifrado para monitoreo integral.',
        'Puntos de Acceso (AP)': 'Optimización de cobertura Wi-Fi mediante puntos de acceso de alta densidad para entornos corporativos de alto tráfico.'
    };

    document.querySelectorAll('.service-card').forEach(card => {
        card.onclick = () => {
            const title = card.querySelector('h3').innerText;
            const iconClass = card.querySelector('i').className;
            const description = serviceDetails[title] || 'Consultoría técnica disponible bajo demanda.';

            modalBody.innerHTML = `
                <i class="${iconClass} modal-detail-icon"></i>
                <h2 class="modal-detail-title">${title}</h2>
                <p class="modal-detail-text">${description}</p>
            `;
            serviceModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
    });

    /* --- 8. MODAL DE CONSULTORÍA --- */
    const btnAbrirConsulta = document.getElementById("btn-iniciar-proyecto");
    if (btnAbrirConsulta) {
        btnAbrirConsulta.onclick = (e) => {
            e.preventDefault();
            modalConsulta.style.display = "block";
            document.body.style.overflow = 'hidden';
        };
    }

    /* --- 9. CIERRES Y EVENTOS --- */
    if (closeServiceBtn) closeServiceBtn.onclick = cerrarTodo;
    if (spanCerrarConsulta) spanCerrarConsulta.onclick = cerrarTodo;

    window.onclick = (e) => {
        if (e.target == modalConsulta || e.target == serviceModal) cerrarTodo();
    };

    document.onkeydown = (e) => {
        if (e.key === "Escape") cerrarTodo();
    };

    /* --- 10. FORMULARIO EMAILJS --- */
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
                    cerrarTodo();
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