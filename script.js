// Анимация загрузки
document.addEventListener('DOMContentLoaded', () => {
    // Скрываем прелоадер
    setTimeout(() => {
        document.querySelector('.loading')?.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1000);
    
    // Инициализация анимаций
    initAnimations();
    initNavigation();
    initTabs();
    initFAQ();
    initGallery();
    initScrollEffects();
    initContactForms();
    initSEO();
});

// Инициализация навигации
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const mainNav = document.querySelector('.main-nav');

    if (!mobileMenuBtn || !navList) return;

    // Функция переключения мобильного меню
    function toggleMobileMenu() {
        navList.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                toggleMobileMenu();
                
                // Плавный скролл после закрытия меню
                setTimeout(() => {
                    if (targetId !== '#') {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            smoothScrollTo(targetElement, 80);
                        }
                    }
                }, 300);
            }
        });
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (navList?.classList.contains('active') && 
            !navList.contains(e.target) && 
            !mobileMenuBtn?.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Sticky header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Показываем/скрываем хедер при скролле
        if (currentScroll > 100) {
            header?.classList.add('sticky');
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
                mainNav.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
                mainNav.style.transform = 'translateY(0)';
            }
        } else {
            header?.classList.remove('sticky');
        }
        
        lastScroll = currentScroll;
        
        // Обновляем активную навигацию
        updateActiveNav();
    });
}

// Табы услуг
// Оптимизированные табы
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Предзагрузка изображений для неактивных табов
    function preloadTabImages(tabId) {
        const pane = document.getElementById(tabId);
        if (pane) {
            const images = pane.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.loaded !== 'true') {
                    const tempImg = new Image();
                    tempImg.src = img.src;
                    tempImg.onload = () => {
                        img.dataset.loaded = 'true';
                    };
                }
            });
        }
    }
    
    // Предзагружаем изображения для второго таба
    setTimeout(() => preloadTabImages('tab2'), 1000);
    setTimeout(() => preloadTabImages('tab3'), 2000);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Быстрое переключение без анимации для плавности
            tabButtons.forEach(btn => {
                btn.style.transition = 'none';
                btn.classList.remove('active');
                setTimeout(() => {
                    btn.style.transition = '';
                }, 10);
            });
            
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Применяем изменения
            button.classList.add('active');
            const activePane = document.getElementById(tabId);
            
            if (activePane) {
                // Используем requestAnimationFrame для плавного отображения
                requestAnimationFrame(() => {
                    activePane.classList.add('active');
                    activePane.style.opacity = '0';
                    
                    requestAnimationFrame(() => {
                        activePane.style.transition = 'opacity 0.3s ease';
                        activePane.style.opacity = '1';
                        
                        // Через 300ms убираем transition
                        setTimeout(() => {
                            activePane.style.transition = '';
                        }, 300);
                    });
                });
            }
        });
    });
}

// FAQ аккордеон
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            
            // Закрываем другие элементы
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                }
            });
            
            // Переключаем текущий
            question.classList.toggle('active');
            answer.classList.toggle('show');
            
            // Анимация
            if (answer.classList.contains('show')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
}

// Галерея
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img')?.src;
            if (imgSrc) {
                // Можно добавить модальное окно с увеличенным изображением
                openLightbox(imgSrc);
            }
        });
        
        // Анимация при наведении
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.03)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function openLightbox(imgSrc) {
    // Создаем модальное окно
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imgSrc}" alt="Увеличенное изображение">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Закрытие по клику
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }
    });
}

// Эффекты при скролле
function initScrollEffects() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Кнопка "Наверх"
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    });
    
    scrollTopBtn?.addEventListener('click', () => {
        smoothScrollTo(document.body, 0);
    });
    
    // Анимация элементов при скролле
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
                    entry.target.style.transitionDelay = `${entry.target.dataset.delay || 0}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами
    document.querySelectorAll('.animate-on-scroll, .stat-number, .process-step, .faq-item, .advantage-card, .price-card, .gallery-item').forEach((element, index) => {
        if (element.classList.contains('process-step')) {
            element.dataset.delay = index * 100;
        }
        observer.observe(element);
    });
}

// Анимация счетчиков
function animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace('+', ''));
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

// Плавный скролл
function smoothScrollTo(target, offset = 0) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - offset;
    const duration = 800;
    let start = null;
    
    function animation(currentTime) {
        if (!start) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Активная навигация при скролле
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Инициализация анимаций
function initAnimations() {
    // Параллакс эффект
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            // Параллакс для других элементов
            document.querySelectorAll('.parallax').forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Анимация появления героя
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Контактные формы
function initContactForms() {
    // Обработка кликов по телефонам
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth > 768) {
                e.preventDefault();
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                
                // Аналитика
                console.log(`Звонок по номеру: ${phoneNumber}`);
                
                // Открываем звонок на мобильных
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    window.location.href = this.getAttribute('href');
                }
            }
        });
    });
    
    // Обработка кликов по email
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log(`Email клик: ${this.getAttribute('href')}`);
        });
    });
}

// SEO оптимизация
function initSEO() {
    // Динамическое обновление title для внутренних страниц
    const updatePageTitle = () => {
        const section = document.querySelector('section[id]:target');
        if (section) {
            const sectionName = section.querySelector('h2')?.textContent || '';
            document.title = `${sectionName} - Центр «РЕЗОН 152»`;
        }
    };
    
    window.addEventListener('hashchange', updatePageTitle);
    
    // Schema разметка
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "Центр «РЕЗОН 152»",
        "description": "Профессиональная покраска и ремонт автомобильных дисков в Нижнем Новгороде",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Деловая, 2Д",
            "addressLocality": "Нижний Новгород",
            "addressCountry": "RU"
        },
        "telephone": "+78314138841",
        "openingHours": "Mo-Sa 09:00-18:00",
        "priceRange": "₽₽",
        "image": window.location.origin + "/image/4.jpg"
    });
    document.head.appendChild(schemaScript);
}

// Адаптация изображений
function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}

// Обработка ресайза
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Закрываем мобильное меню при увеличении экрана
        if (window.innerWidth > 768) {
            const navList = document.querySelector('.nav-list');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navList?.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuBtn?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }, 250);
});

// Предзагрузка критических изображений
function preloadCriticalImages() {
    const criticalImages = [
        './image/4.jpg',
        './image/a1.jpg',
        './image/a3.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Запускаем предзагрузку
preloadCriticalImages();
optimizeImages();