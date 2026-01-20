import { smoothScrollTo, updateActiveNav } from './utils.js';

export function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const mainNav = document.querySelector('.main-nav');

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

    // Обработка ресайза
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Закрываем мобильное меню при увеличении экрана
            if (window.innerWidth > 768 && navList?.classList.contains('active')) {
                toggleMobileMenu();
            }
        }, 250);
    });
}