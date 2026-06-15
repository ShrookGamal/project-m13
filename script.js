document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const mobileMenu = document.getElementById('mobileMenu');
    const openBtn = document.getElementById('openMobileMenu');
    const closeBtn = document.getElementById('closeMobileMenu');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links .link');
    const counters = document.querySelectorAll('[data-target]');
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-p, .animate-on-scroll');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
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

    openBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const speed = 200;
        const inc = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + inc);
            setTimeout(() => startCounter(el), 1);
        } else {
            el.innerText = target;
        }
    };

    const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.hasAttribute('data-target')) {
                    startCounter(entry.target);
                } else if (entry.target.classList.contains('counter-box') || entry.target.classList.contains('about-section')) {
                    const innerCounters = entry.target.querySelectorAll('[data-target]');
                    innerCounters.forEach(c => startCounter(c));
                } else {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
                mainObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => mainObserver.observe(el));
    counters.forEach(c => mainObserver.observe(c));
    if (document.querySelector('.about-section')) {
        mainObserver.observe(document.querySelector('.about-section'));
    }
});