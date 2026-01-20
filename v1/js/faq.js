// js/faq.js
function initFAQ() {
    console.log('Инициализация FAQ...');
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.error('FAQ вопросы не найдены');
        return;
    }
    
    faqQuestions.forEach(question => {
        // Закрываем все при загрузке
        const answer = question.nextElementSibling;
        if (answer) {
            answer.style.maxHeight = '0';
            answer.classList.remove('show');
        }
        
        question.addEventListener('click', function() {
            console.log('Клик по FAQ вопросу');
            
            const answer = this.nextElementSibling;
            if (!answer) return;
            
            const isActive = this.classList.contains('active');
            
            // Закрываем все другие вопросы
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    const otherAnswer = q.nextElementSibling;
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                        otherAnswer.classList.remove('show');
                    }
                }
            });
            
            // Переключаем текущий
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('show');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                this.classList.remove('active');
                answer.classList.remove('show');
                answer.style.maxHeight = '0';
            }
        });
    });
    
    // Активируем анимацию появления для всех FAQ элементов
    const faqItems = document.querySelectorAll('.faq-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    faqItems.forEach(item => {
        observer.observe(item);
    });
    
    console.log('FAQ инициализирован успешно');
}