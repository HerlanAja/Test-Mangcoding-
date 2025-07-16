// Fungsi Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');

      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
});

// KODE UNTUK EFEK SCROLL PADA NAVBAR
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        // Jika scroll ke bawah & sudah melewati 100px dari atas
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Tambahkan kelas untuk menyembunyikan navbar
            navbar.classList.add('navbar-hidden');
        } else {
            // Jika scroll ke atas
            navbar.classList.remove('navbar-hidden');
        }
    }

    // Perbarui posisi scroll terakhir untuk perbandingan berikutnya
    lastScrollY = currentScrollY;
});

// Services
 const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
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
        serviceBtn.addEventListener('mouseenter', () => {
            serviceBtn.style.transform = 'translateY(-2px)';
        });
        
        serviceBtn.addEventListener('mouseleave', () => {
            serviceBtn.style.transform = 'translateY(0)';
        });

        // Add floating animation to phones
        function addFloatingAnimation() {
            const phones = document.querySelectorAll('.phone-mockup, .phone-second');
            phones.forEach((phone, index) => {
                phone.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
            });
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
        document.querySelector('.phone-mockup').style.setProperty('--rotation', '-5deg');
        document.querySelector('.phone-second').style.setProperty('--rotation', '8deg');

        // Initialize floating animation
        addFloatingAnimation();

        // Parallax effect on scroll
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const phones = document.querySelectorAll('.phone-mockup, .phone-second');
            phones.forEach(phone => {
                phone.style.transform += ` translateY(${rate * 0.1}px)`;
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

         function handleDetailClick() {
            const button = event.target;
            button.style.transform = "scale(0.95)";
            setTimeout(() => {
                button.style.transform = "";
            }, 150);
            alert("Detail Services clicked! Add your custom functionality here.");
        }

        // Animasi masuk untuk semua card
        document.addEventListener("DOMContentLoaded", () => {
            const cards = document.querySelectorAll(".design-card");
            cards.forEach((card, index) => {
                card.style.opacity = "0";
                card.style.transform = "translateY(30px)";
                setTimeout(() => {
                    card.style.transition = "all 0.8s ease";
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 100 + index * 200);
            });
        });

        // Hover animasi untuk semua card
        document.querySelectorAll(".design-card").forEach((card) => {
            card.addEventListener("mouseenter", function () {
                this.style.transform = "translateY(-5px)";
                this.style.transition = "transform 0.3s ease";
            });
            card.addEventListener("mouseleave", function () {
                this.style.transform = "translateY(0)";
            });
        });