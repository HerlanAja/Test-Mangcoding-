// Fungsi Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (icon) { // Pastikan ikon juga ada
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // KODE UNTUK EFEK SCROLL PADA NAVBAR
    let lastScrollY = window.scrollY;

    // Tambahkan event listener untuk scroll di dalam DOMContentLoaded untuk konsistensi,
    // atau pastikan navbar ada saat script dimuat jika ini di luar DOMContentLoaded.
    // Lebih aman di dalam DOMContentLoaded.
    // Jika ada elemen navbar yang dinamis, mungkin perlu observer mutasi.
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const navbar = document.querySelector('.navbar'); 

        if (navbar) { // Pastikan elemen navbar ditemukan
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
        }
        lastScrollY = currentScrollY;
    });

    // --- Mulai bagian 'Services' dan seterusnya yang dipindahkan ke dalam DOMContentLoaded ---

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hanya set animationPlayState jika elemen memiliki animasi
                // atau jika Anda ingin mengontrol CSS animation di sini.
                // Pastikan entry.target adalah elemen HTML yang valid.
                if (entry.target instanceof HTMLElement) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.services-header, .service-card').forEach(el => {
        observer.observe(el);
    });

    // Phone mockup hover effects
    const phoneMockups = document.querySelectorAll('.phone-mockup, .phone-second');
    phoneMockups.forEach(phone => {
        phone.addEventListener('mouseenter', () => {
            phone.style.transform = phone.classList.contains('phone-second') 
                ? 'rotate(5deg) scale(1.02)' 
                : 'rotate(-2deg) scale(1.02)';
        });
        
        phone.addEventListener('mouseleave', () => {
            phone.style.transform = phone.classList.contains('phone-second') 
                ? 'rotate(8deg)' 
                : 'rotate(-5deg)';
        });
    });

    // Toggle switch interactions
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.style.background = toggle.style.background === 'rgb(158, 158, 158)' ? '#4caf50' : '#9e9e9e';
        });
    });

    // Service button hover effect
    const serviceBtn = document.querySelector('.service-btn');
    // **INI ADALAH FOKUS UTAMA KARENA ERROR KAMU DI SINI**
    if (serviceBtn) { // Pastikan serviceBtn ada sebelum mencoba menambahkan event listener
        serviceBtn.addEventListener('mouseenter', () => {
            serviceBtn.style.transform = 'translateY(-2px)';
        });
        
        serviceBtn.addEventListener('mouseleave', () => {
            serviceBtn.style.transform = 'translateY(0)';
        });

        // Event listener untuk handleDetailClick juga perlu serviceBtn ada
        serviceBtn.addEventListener('click', handleDetailClick);
    }


    // Add floating animation to phones
    function addFloatingAnimation() {
        const phones = document.querySelectorAll('.phone-mockup, .phone-second');
        // Hanya tambahkan animasi jika ada telepon
        if (phones.length > 0) {
            phones.forEach((phone, index) => {
                phone.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
            });
        }
    }

    // Add floating keyframes
    const floatingStyle = document.createElement('style');
    floatingStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(var(--rotation, -5deg)); }
            50% { transform: translateY(-10px) rotate(var(--rotation, -5deg)); }
        }
    `;
    document.head.appendChild(floatingStyle);

    // Set CSS custom properties for rotation
    const phoneMockup = document.querySelector('.phone-mockup');
    const phoneSecond = document.querySelector('.phone-second');

    if (phoneMockup) {
        phoneMockup.style.setProperty('--rotation', '-5deg');
    }
    if (phoneSecond) {
        phoneSecond.style.setProperty('--rotation', '8deg');
    }

    // Initialize floating animation
    addFloatingAnimation();

    // Parallax effect on scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const phones = document.querySelectorAll('.phone-mockup, .phone-second');
        if (phones.length > 0) { 
            phones.forEach(phone => {
                // Pastikan transformasi awal tidak ditimpa
                let currentTransform = phone.style.transform.replace(/translateY\(.*?\)/, '').trim();
                phone.style.transform = `${currentTransform} translateY(${rate * 0.1}px)`;
            });
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Fungsi handleDetailClick (Didefinisikan di dalam DOMContentLoaded)
    function handleDetailClick(event) {
        const button = event.target;
        if (button) { // Pastikan target event adalah elemen yang valid
            button.style.transform = "scale(0.95)";
            setTimeout(() => {
                button.style.transform = "";
            }, 150);
            alert("Detail Services clicked! Add your custom functionality here.");
        }
    }


    // Animasi masuk untuk semua card
    const cards = document.querySelectorAll(".design-card");
    cards.forEach((card, index) => {
        if (card instanceof HTMLElement) { // Pastikan card adalah elemen HTML
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            setTimeout(() => {
                card.style.transition = "all 0.8s ease";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 100 + index * 200);
        }
    });

    // Hover animasi untuk semua card
    document.querySelectorAll(".design-card").forEach((card) => {
        if (card instanceof HTMLElement) { // Pastikan card adalah elemen HTML
            card.addEventListener("mouseenter", function () {
                this.style.transform = "translateY(-5px)";
                this.style.transition = "transform 0.3s ease";
            });
            card.addEventListener("mouseleave", function () {
                this.style.transform = "translateY(0)";
            });
        }
    });
});