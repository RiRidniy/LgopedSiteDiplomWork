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

    // ===== ФОРМА ЗАПИСИ =====
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация телефона (простая)
            const phone = document.getElementById('phone').value;
            if (!phone.match(/^\+?[0-9\s\-\(\)]{10,20}$/)) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            // Здесь можно отправить данные на сервер
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }

    // ===== МОДАЛЬНОЕ ОКНО ДЛЯ ОТЗЫВОВ =====
    const modal = document.getElementById('reviewModal');
    const reviewLink = document.getElementById('reviewLink');
    const closeBtn = document.querySelector('.close-modal');
    
    if (reviewLink && modal) {
        reviewLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // запрет прокрутки
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // вернуть прокрутку
        });
    }
    
    // Закрытие по клику вне модалки
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // ===== РЕЙТИНГ ЗВЕЗДАМИ =====
    const stars = document.querySelectorAll('.stars i');
    const ratingInput = document.getElementById('rating');
    
    if (stars.length > 0 && ratingInput) {
        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                stars.forEach(s => {
                    if (s.dataset.rating <= rating) {
                        s.classList.add('hover');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                stars.forEach(s => s.classList.remove('hover'));
            });
            
            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                ratingInput.value = rating;
                
                stars.forEach(s => {
                    s.classList.remove('selected', 'far', 'fas');
                    if (s.dataset.rating <= rating) {
                        s.classList.add('selected', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.add('far');
                        s.classList.remove('fas', 'selected');
                    }
                });
            });
        });
    }

    // ===== ФОРМА ОТЗЫВА =====
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка рейтинга
            const rating = document.getElementById('rating').value;
            if (!rating) {
                alert('Пожалуйста, поставьте оценку');
                return;
            }
            
            // Проверка согласия
            const consent = document.getElementById('reviewConsent');
            if (!consent.checked) {
                alert('Необходимо согласие на обработку персональных данных');
                return;
            }
            
            alert('Спасибо за ваш отзыв!');
            modal.classList.remove('show');
            document.body.style.overflow = '';
            this.reset();
            
            // Сброс звезд
            stars.forEach(s => {
                s.classList.remove('selected', 'fas');
                s.classList.add('far');
            });
            ratingInput.value = '';
        });
    }

    // ===== МАСКА ДЛЯ ТЕЛЕФОНА =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
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
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (предыдущий код остается) ...

    // ===== НОВЫЙ КОД: Обработка согласия с правилами =====
    const dataConsent = document.getElementById('dataConsent');
    const submitBtn = document.getElementById('submitBtn');
    const policyLink = document.getElementById('policyLink');
    const policyModal = document.getElementById('policyModal');
    const policyClose = document.querySelector('.policy-close');
    const policyAcceptBtn = document.querySelector('.policy-accept-btn');

    // Делаем кнопку отправки активной только при согласии
    if (dataConsent && submitBtn) {
        // Изначально кнопка неактивна
        submitBtn.disabled = true;
        
        dataConsent.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
            
            if (this.checked) {
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            } else {
                submitBtn.style.opacity = '0.5';
                submitBtn.style.cursor = 'not-allowed';
            }
        });
    }

    // Открытие модального окна с правилами
    if (policyLink && policyModal) {
        policyLink.addEventListener('click', function(e) {
            e.preventDefault();
            policyModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // Закрытие модального окна
    if (policyClose && policyModal) {
        policyClose.addEventListener('click', function() {
            policyModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    // Кнопка "Я принимаю условия" в модальном окне
    if (policyAcceptBtn && policyModal && dataConsent) {
        policyAcceptBtn.addEventListener('click', function() {
            policyModal.classList.remove('show');
            document.body.style.overflow = '';
            
            // Автоматически отмечаем чекбокс
            if (!dataConsent.checked) {
                dataConsent.checked = true;
                // Триггерим событие change
                const event = new Event('change', { bubbles: true });
                dataConsent.dispatchEvent(event);
            }
        });
    }

    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target === policyModal) {
            policyModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Обновленная отправка формы с проверкой согласия
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка согласия
            if (!dataConsent.checked) {
                alert('Необходимо согласиться с правилами обработки персональных данных');
                return;
            }
            
            // Валидация телефона
            const phone = document.getElementById('phone').value;
            if (!phone.match(/^\+?[0-9\s\-\(\)]{10,20}$/)) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            // Здесь можно отправить данные на сервер
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            this.reset();
            
            // Сбрасываем чекбокс и блокируем кнопку
            if (dataConsent) {
                dataConsent.checked = false;
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
            }
        });
    }

    // ===== ДОПОЛНИТЕЛЬНО: Валидация формы перед отправкой =====
    // Добавляем визуальную индикацию обязательных полей
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
            
            // Убираем ошибку при начале ввода
            this.addEventListener('input', function() {
                this.classList.remove('error');
            }, { once: true });
        });
    });

    // Стили для полей с ошибкой (добавить в CSS)
    // input.error, select.error, textarea.error {
    //     border-color: #e53e3e !important;
    //     background-color: #fff5f5 !important;
    // }
});