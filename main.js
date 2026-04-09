document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. CONFIGURACIÓN DE INICIO Y SCROLL --- */
    // Forzar el scroll al inicio al recargar la página
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

    /* --- 3. MENÚ MÓVIL (HAMBURGUESA) --- */
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

    // Cerrar menú al tocar cualquier opción (importante para iPhone)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    /* --- 4. ACORDEÓN DE SERVICIOS --- */
    const detalles = document.querySelectorAll("details");
    detalles.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            detalles.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });

    /* --- 5. LÓGICA DEL MODAL DE CONSULTORÍA --- */
    const modal = document.getElementById("modal-consulta");
    const btnAbrir = document.getElementById("btn-iniciar-proyecto");
    const spanCerrar = document.querySelector(".close-modal");

    if (btnAbrir) {
        btnAbrir.onclick = function(e) {
            e.preventDefault();
            modal.style.display = "block";
        }
    }

    if (spanCerrar) {
        spanCerrar.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /* --- 6. ENVÍO DE FORMULARIO CON EMAILJS --- */
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

            const SERVICE_ID = 'service_ar841iy'; 
            const TEMPLATE_ID = 'template_tzb6m1k';

            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
                .then(() => {
                    mostrarNotificacion("Protocolo completado. Un ingeniero lo contactará pronto.");
                    modal.style.display = "none";
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
        }
    }

    /* --- 7. SISTEMA DE NOTIFICACIONES (TOAST) --- */
    function mostrarNotificacion(mensaje) {
        const toast = document.getElementById("custom-notification");
        const msgElem = document.getElementById("notification-message");
        
        if (toast && msgElem) {
            msgElem.innerText = mensaje;
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 4000);
        }
    }

    
});

// Seleccionamos todos los enlaces del menú
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Quitamos la clase 'active' de todos los enlaces
        navLinks.forEach(lnk => lnk.classList.remove('active'));
        // Se la ponemos al que acabamos de cliquear
        this.classList.add('active');
    });
});