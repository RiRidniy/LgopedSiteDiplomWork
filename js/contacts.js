document.addEventListener('DOMContentLoaded', function() {
    // ===== ВЫПАДАЮЩЕЕ МЕНЮ НАВИГАЦИИ =====
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // ===== КНОПКА "НАВЕРХ" =====
    const toTopFixed = document.getElementById('toTopFixed');
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (toTopFixed) {
        toTopFixed.addEventListener('click', scrollToTop);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                toTopFixed.style.display = 'flex';
            } else {
                toTopFixed.style.display = 'none';
            }
        });
    }

    // ===== ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ =====
    const eyeBtn = document.querySelector('.eye-btn');
    if (eyeBtn) {
        eyeBtn.addEventListener('click', function() {
            alert('Версия для слабовидящих будет доступна в ближайшее время');
        });
    }

    // ===== КАЛЕНДАРЬ =====
    const calendarInput = document.getElementById('calendar');
    if (calendarInput) {
        // Генерируем занятые даты (пример)
        const today = new Date();
        const disabledDates = [];
        
        // Добавляем несколько занятых дат (следующие 7 дней)
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i * 2); // Каждый второй день занят
            disabledDates.push(date.toISOString().split('T')[0]);
        }

        flatpickr(calendarInput, {
            locale: 'ru',
            minDate: 'today',
            dateFormat: 'd.m.Y',
            disable: disabledDates,
            onChange: function(selectedDates, dateStr, instance) {
                if (selectedDates.length > 0) {
                    // Показываем сообщение о выбранной дате
                    alert(`Вы выбрали ${dateStr}. Эта дата свободна! Заполните форму для записи.`);
                }
            }
        });
    }

    // ===== ФОРМА БЫСТРОЙ ЗАПИСИ =====
    const quickForm = document.getElementById('quickAppointmentForm');
    if (quickForm) {
        quickForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const date = calendarInput ? calendarInput.value : 'не выбрана';
            
            alert(`Спасибо! Ваша заявка на дату ${date} отправлена. Я свяжусь с вами для подтверждения.`);
            this.reset();
        });
    }

    // ===== ЗВЕЗДЫ РЕЙТИНГА =====
    const stars = document.querySelectorAll('.stars-rating i');
    const ratingInput = document.getElementById('rating');
    
    if (stars.length > 0 && ratingInput) {
        stars.forEach(star => {
            // Hover эффект
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                stars.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.add('far');
                        s.classList.remove('fas');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                stars.forEach(s => {
                    s.classList.remove('active');
                    // Восстанавливаем выбранные звезды
                    if (s.classList.contains('selected')) {
                        s.classList.add('fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.add('far');
                        s.classList.remove('fas');
                    }
                });
            });
            
            // Клик для выбора
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                ratingInput.value = rating;
                
                stars.forEach(s => {
                    s.classList.remove('selected');
                    if (s.dataset.rating <= rating) {
                        s.classList.add('selected', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.remove('fas', 'selected');
                        s.classList.add('far');
                    }
                });
            });
        });
    }

    // ===== ФОРМА ОТЗЫВА =====
    const reviewForm = document.getElementById('reviewForm');
    const submitReview = document.getElementById('submitReview');
    
    if (reviewForm) {
        // Изначально кнопка неактивна
        submitReview.disabled = true;
        
        const consentCheck = document.getElementById('reviewConsent');
        if (consentCheck) {
            consentCheck.addEventListener('change', function() {
                submitReview.disabled = !this.checked;
            });
        }
        
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка рейтинга
            const rating = document.getElementById('rating').value;
            if (!rating) {
                alert('Пожалуйста, поставьте оценку');
                return;
            }
            
            // Проверка выбора услуги
            const service = document.getElementById('service').value;
            if (!service) {
                alert('Пожалуйста, выберите услугу');
                return;
            }
            
            alert('Спасибо за ваш отзыв!');
            this.reset();
            
            // Сброс звезд
            stars.forEach(s => {
                s.classList.remove('selected', 'fas');
                s.classList.add('far');
            });
            ratingInput.value = '';
            submitReview.disabled = true;
        });
    }

    // ===== МАСКА ДЛЯ ТЕЛЕФОНА =====
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length > 11) value = value.slice(0, 11);
                
                let formatted = '+7';
                if (value.length > 1) formatted += ' (' + value.slice(1, 4);
                if (value.length >= 4) formatted += ') ' + value.slice(4, 7);
                if (value.length >= 7) formatted += '-' + value.slice(7, 9);
                if (value.length >= 9) formatted += '-' + value.slice(9, 11);
                
                e.target.value = formatted;
            }
        });
    });
});


// ===== ДОПОЛНИТЕЛЬНАЯ АНИМАЦИЯ ДЛЯ ИКОНОК =====
// Анимация при наведении на карточку
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icons = this.querySelectorAll('.social-icon-small');
        icons.forEach((icon, index) => {
            icon.style.transitionDelay = `${index * 0.05}s`;
        });
    });
    
    card.addEventListener('mouseleave', function() {
        const icons = this.querySelectorAll('.social-icon-small');
        icons.forEach(icon => {
            icon.style.transitionDelay = '0s';
        });
    });
});

// Обработка кликов по маленьким иконкам с аналитикой
const allSocialIcons = document.querySelectorAll('.social-icon-small, .mini-icon');

allSocialIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
        const network = this.getAttribute('title') || 'социальная сеть';
        console.log(`Клик по иконке: ${network}`);
        // Здесь можно добавить отправку в аналитику
    });
});

// Всплывающая подсказка при наведении
const tooltip = document.createElement('div');
tooltip.className = 'custom-tooltip';
document.body.appendChild(tooltip);

allSocialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function(e) {
        const title = this.getAttribute('title');
        if (title) {
            tooltip.textContent = title;
            tooltip.style.opacity = '1';
            tooltip.style.left = e.pageX + 15 + 'px';
            tooltip.style.top = e.pageY - 30 + 'px';
        }
    });
    
    icon.addEventListener('mousemove', function(e) {
        tooltip.style.left = e.pageX + 15 + 'px';
        tooltip.style.top = e.pageY - 30 + 'px';
    });
    
    icon.addEventListener('mouseleave', function() {
        tooltip.style.opacity = '0';
    });
});

// Стили для всплывающей подсказки (добавить в CSS)
const style = document.createElement('style');
style.textContent = `
    .custom-tooltip {
        position: fixed;
        background: #5a6adf;
        color: white;
        padding: 5px 15px;
        border-radius: 25px;
        font-size: 14px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 9999;
        box-shadow: 0 5px 15px rgba(90, 106, 223, 0.3);
        white-space: nowrap;
    }
    
    .custom-tooltip::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #5a6adf;
    }
`;
document.head.appendChild(style);