// js/main.js - исправленная версия без ES6 модулей
(function() {
    'use strict';
    
    // Анимация загрузки
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM загружен, инициализация...');
        
        // Скрываем прелоадер
        setTimeout(() => {
            const loading = document.querySelector('.loading');
            if (loading) {
                loading.classList.add('hidden');
            }
            document.body.style.overflow = 'auto';
            console.log('Прелоадер скрыт');
        }, 1000);
        
        // Инициализация всех модулей
        try {
            if (typeof initNavigation === 'function') {
                initNavigation();
                console.log('Навигация инициализирована');
            }
            
            if (typeof initTabs === 'function') {
                initTabs();
                console.log('Табы инициализированы');
            }
            
            if (typeof initAnimations === 'function') {
                initAnimations();
                console.log('Анимации инициализированы');
            }
            
            if (typeof initGallery === 'function') {
                initGallery();
                console.log('Галерея инициализирована');
            }
            
            if (typeof initFAQ === 'function') {
                initFAQ();
                console.log('FAQ инициализирован');
            }
            
            if (typeof initContactForms === 'function') {
                initContactForms();
                console.log('Формы инициализированы');
            }
            
            if (typeof initSEO === 'function') {
                initSEO();
                console.log('SEO инициализировано');
            }
            
            // Оптимизация изображений
            optimizeImages();
            preloadCriticalImages();
            
        } catch (error) {
            console.error('Ошибка инициализации:', error);
        }
    });
    
    // Простые утилиты для работы без модулей
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
    
    function preloadCriticalImages() {
        const criticalImages = [
            './image/4.jpg',
            './image/a1.jpg',
            './image/a3.jpg',
            './image/1.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Для тач-устройств
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Фолбэк если скрипты не загрузились
    window.addEventListener('error', function(e) {
        console.error('Ошибка загрузки скрипта:', e);
    });
    
})();