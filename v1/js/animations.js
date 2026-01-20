// js/animations.js
function initAnimations() {
    console.log('Инициализация анимаций...');
    
    // Параллакс эффект
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // Intersection Observer для анимаций
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Для статистики
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Для шагов процесса
                if (entry.target.classList.contains('process-step')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 200}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    const elementsToAnimate = document.querySelectorAll(
        '.animate-on-scroll, .stat-number, .process-step, .faq-item, .advantage-card, .price-card, .gallery-item'
    );
    
    elementsToAnimate.forEach((element, index) => {
        observer.observe(element);
    });
    
    // Кнопка "Наверх"
    initScrollTop();
    
    // Анимация счетчиков
    function animateCounter(element) {
        if (!element || element.dataset.animated === 'true') return;
        
        element.dataset.animated = 'true';
        const text = element.textContent;
        const target = parseInt(text.replace('+', '')) || 0;
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = text;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
            }
        }, 50);
    }
    
    function initScrollTop() {
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (!scrollTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Добавляем классы для плавного появления
    setTimeout(() => {
        document.querySelectorAll('.process-step').forEach(step => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        });
    }, 500);
    
    console.log('Анимации инициализированы успешно');
}