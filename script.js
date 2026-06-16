document.addEventListener('DOMContentLoaded', () => {
    // === 1. تعريف العناصر الأساسية ===
    const header = document.getElementById('main-header');
    const mobileMenu = document.getElementById('mobileMenu');
    const openBtn = document.getElementById('openMobileMenu');
    const closeBtn = document.getElementById('closeMobileMenu');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links .link');
    const counters = document.querySelectorAll('[data-target]');
    
    // العناصر التي ستحصل على أنيميشن عند الظهور
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-p, .animate-on-scroll, .glass-card, .glass-card-premium');

    // === 2. منطق التمرير (Header & ScrollSpy) ===
    window.addEventListener('scroll', () => {
        // تأثير الهيدر العائم عند السكرول
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // تحديث الرابط النشط في الناف بار (ScrollSpy)
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
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

    // === 3. قائمة الموبايل (Mobile Menu Control) ===
    if (openBtn && closeBtn) {
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
    }

    // === 4. منطق عداد الأرقام (Animated Counters) ===
    const startCounter = (el) => {
        if (el.classList.contains('counted')) return;
        const target = +el.getAttribute('data-target');
        let count = 0;
        const duration = 2000; 
        const increment = target / (duration / 16); 

        const updateCount = () => {
            if (count < target) {
                count += increment;
                el.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target;
                el.classList.add('counted');
            }
        };
        updateCount();
    };

    // === 5. مراقب الظهور الشامل (The Master Intersection Observer) ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // أ- تشغيل العدادات
                if (target.hasAttribute('data-target')) {
                    startCounter(target);
                } else if (target.classList.contains('about-section') || target.classList.contains('counter-grid')) {
                    target.querySelectorAll('[data-target]').forEach(c => startCounter(c));
                }

                // ب- تشغيل أشرطة التقدم (سكشن لماذا نحن)
                if (target.classList.contains('why-us-section')) {
                    const progressBars = target.querySelectorAll('.bar-inner');
                    progressBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }

                // ج- تنفيذ أنيميشن الظهور (Reveal Animations)
                target.style.opacity = "1";
                target.style.transform = "translateY(0)";
                
                // إلغاء المراقبة للعناصر التي لا تحتاج تكرار لزيادة الأداء
                if (!target.classList.contains('why-us-section')) {
                    mainObserver.unobserve(target);
                }
            }
        });
    }, observerOptions);

    // تفعيل المراقب على جميع العناصر المستهدفة
    revealElements.forEach(el => mainObserver.observe(el));
    counters.forEach(c => mainObserver.observe(c));
    
    // مراقبة السكاشن الخاصة بالوظائف المعقدة
    const specialSections = ['.about-section', '.why-us-section', '.counter-grid'];
    specialSections.forEach(selector => {
        const sec = document.querySelector(selector);
        if (sec) mainObserver.observe(sec);
    });

    // === 6. تهيئة سلايدر معرض الصور (Swiper.js) ===
    if (document.querySelector('.main-slider')) {
        const swiper = new Swiper('.main-slider', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: 150,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: { coverflowEffect: { rotate: 15, depth: 80 } },
                768: { coverflowEffect: { rotate: 30, depth: 150 } }
            }
        });
    }
});