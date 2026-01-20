export function initContactForms() {
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

export function initSEO() {
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