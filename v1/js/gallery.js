export function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img')?.src;
            if (imgSrc) {
                openLightbox(imgSrc);
            }
        });
        
        // Анимация при наведении
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                item.style.transform = 'translateY(-8px) scale(1.03)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                item.style.transform = 'translateY(0) scale(1)';
            }
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
    
    // Закрытие по ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}