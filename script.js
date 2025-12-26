// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMobileMenu() {
    navList.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    
    // Анимация кнопки гамбургера
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (navList.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Закрываем меню
            toggleMobileMenu();
            
            // Ждем закрытия меню и делаем скролл
            setTimeout(() => {
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            }, 300);
        }
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (navList.classList.contains('active') && 
        !navList.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu();
    }
});

// Табы услуг
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Убираем активный класс у всех кнопок и панелей
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке и панели
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// FAQ аккордеон
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = question.nextElementSibling;
        
        // Закрываем все открытые элементы
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
            }
        });
        
        // Переключаем текущий элемент
        question.classList.toggle('active');
        answer.classList.toggle('show');
    });
});

// Плавная прокрутка для навигации (для десктопов)
if (window.innerWidth > 768) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Активная навигация при скролле
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Обновляем активную ссылку в навигации
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Кнопка "Наверх"
const scrollTopBtn = document.querySelector('.scroll-top');

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

// Анимация при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.advantage-card, .service-detail, .price-card, .gallery-item, .process-step, .faq-item').forEach(element => {
    observer.observe(element);
});

// Параллакс эффект для героя (только на десктопах)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Счетчик статистики
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    if (!animated && window.pageYOffset < 500) {
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const target = parseInt(text);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = text;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
                }
            }, 30);
        });
        animated = true;
    }
}

// Запускаем счетчики когда секция в поле зрения
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Адаптивная загрузка изображений
function loadImages() {
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

// Обработка кликов по телефонным номерам
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            // Можно добавить аналитику здесь
            console.log(`Клиент звонит по номеру: ${phoneNumber}`);
            // Открываем звонок через подтверждение на мобильных
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = this.getAttribute('href');
            }
        }
    });
});

// Предзагрузка критических изображений
function preloadCriticalImages() {
    const criticalImages = [
        './image/4.jpg',
        './image/a1.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Обработка ресайза окна
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, 250);
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Показываем элементы с задержкой
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 300);
    
    // Предзагрузка изображений
    preloadCriticalImages();
    loadImages();
    
    // Обновляем активную навигацию
    updateActiveNav();
});

// Обработка touch событий для улучшения UX на мобильных
let startY;
document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
}, { passive: true });

// Предотвращаем zoom на инпутах
document.addEventListener('touchmove', (e) => {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });