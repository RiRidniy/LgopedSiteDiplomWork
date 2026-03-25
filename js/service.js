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

    // ===== ОБРАБОТКА СОГЛАСИЯ С ПРАВИЛАМИ И ФОРМЫ ЗАПИСИ =====
    const appointmentForm = document.getElementById('appointmentForm');
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
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
        
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

    // Закрытие модального окна (крестик)
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
                // Вызываем событие change, чтобы активировать кнопку
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

    // ===== ПОЛНОЦЕННАЯ ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ =====
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка согласия
            if (!dataConsent.checked) {
                alert('Необходимо согласиться с правилами обработки персональных данных');
                return;
            }
            
            // Проверка выбора услуги
            const serviceSelect = document.getElementById('serviceSelect');
            if (!serviceSelect.value) {
                alert('Пожалуйста, выберите услугу');
                serviceSelect.focus();
                return;
            }
            
            // Проверка имени
            const parentName = document.getElementById('parentName');
            if (!parentName.value.trim()) {
                alert('Пожалуйста, введите ваше имя');
                parentName.focus();
                return;
            }
            
            // Проверка телефона
            const phone = document.getElementById('phone').value;
            const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(phone)) {
                alert('Пожалуйста, введите корректный номер телефона в формате +7 (___) ___-__-__');
                phoneInput.focus();
                return;
            }
            
            // Если все проверки пройдены
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            
            // Сброс формы
            this.reset();
            
            // Сброс чекбокса и блокировка кнопки
            if (dataConsent) {
                dataConsent.checked = false;
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
                submitBtn.style.cursor = 'not-allowed';
            }
            
            // Сброс выпадающего списка
            if (serviceSelect) {
                serviceSelect.value = '';
            }
        });
    }

    // ===== ВИЗУАЛЬНАЯ ИНДИКАЦИЯ ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ =====
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
    
    // Добавляем стили для полей с ошибкой, если их еще нет
    if (!document.querySelector('#error-styles')) {
        const style = document.createElement('style');
        style.id = 'error-styles';
        style.textContent = `
            input.error, select.error, textarea.error {
                border-color: #e53e3e !important;
                background-color: #fff5f5 !important;
            }
        `;
        document.head.appendChild(style);
    }
});