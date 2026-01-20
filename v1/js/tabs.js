// js/tabs.js
function initTabs() {
    console.log('Инициализация табов...');
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0 || tabPanes.length === 0) {
        console.error('Табы не найдены на странице');
        return;
    }
    
    // Активируем первый таб если нет активного
    if (!document.querySelector('.tab-button.active')) {
        const firstButton = tabButtons[0];
        const firstTab = firstButton.getAttribute('data-tab');
        const firstPane = document.getElementById(firstTab);
        
        if (firstButton && firstPane) {
            firstButton.classList.add('active');
            firstPane.classList.add('active');
            console.log('Активирован первый таб:', firstTab);
        }
    }
    
    // Функция переключения табов
    function switchTab(tabId) {
        console.log('Переключение на таб:', tabId);
        
        // Снимаем активный класс со всех кнопок
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Скрываем все табы
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Активируем выбранный таб
        const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        const activePane = document.getElementById(tabId);
        
        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activePane.classList.add('active');
            
            // Плавное появление
            activePane.style.opacity = '0';
            setTimeout(() => {
                activePane.style.transition = 'opacity 0.3s ease';
                activePane.style.opacity = '1';
                
                setTimeout(() => {
                    activePane.style.transition = '';
                }, 300);
            }, 10);
            
            // Предзагрузка изображений для таба
            preloadTabImages(tabId);
        }
    }
    
    // Обработчики кликов по кнопкам табов
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });
    
    // Предзагрузка изображений для неактивных табов
    function preloadTabImages(tabId) {
        const pane = document.getElementById(tabId);
        if (pane) {
            const images = pane.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (!img.dataset.loaded) {
                    const tempImg = new Image();
                    tempImg.src = img.src;
                    tempImg.onload = function() {
                        img.dataset.loaded = 'true';
                        console.log('Изображение загружено:', img.src);
                    };
                }
            });
        }
    }
    
    // Предзагружаем изображения для всех табов с задержкой
    setTimeout(() => {
        tabButtons.forEach(button => {
            const tabId = button.getAttribute('data-tab');
            if (tabId && !button.classList.contains('active')) {
                preloadTabImages(tabId);
            }
        });
    }, 1000);
    
    console.log('Табы инициализированы успешно');
}