document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const mobileMenu = document.getElementById('mobileMenu');
    const openBtn = document.getElementById('openMobileMenu');
    const closeBtn = document.getElementById('closeMobileMenu');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links .link');

    // 1. Header Scroll Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active Link on Scroll (ScrollSpy)
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
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

    // 2. Mobile Menu Logic
    openBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // منع السكرول عند فتح المنيو
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 3. Smooth Reveal Animation (Basic Observer)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .reveal-p').forEach(el => observer.observe(el));
    // إضافة هذا الكود داخل الـ DOMContentLoaded
const counters = document.querySelectorAll('.counter-box h3, .experience-badge .number');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// تشغيل العداد عند الوصول إليه بالسكرول
const aboutSection = document.querySelector('.about-section');
const observerCounter = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        startCounters();
        observerCounter.unobserve(aboutSection);
    }
}, { threshold: 0.5 });

observerCounter.observe(aboutSection);
});