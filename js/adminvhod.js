document.addEventListener('DOMContentLoaded', function() {
    // ===== ФОРМА ВХОДА =====
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const consentCheckbox = document.getElementById('dataConsent');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const togglePasswordBtn = document.querySelector('.toggle-password');

    // Демо-данные для входа
    const demoCredentials = {
        admin: {
            username: 'admin',
            password: 'admin123'
        }
    };

    // Функция активации кнопки входа
    function toggleLoginButton() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const consent = consentCheckbox.checked;
        
        if (username && password && consent) {
            loginBtn.disabled = false;
        } else {
            loginBtn.disabled = true;
        }
    }

    // Функция показа ошибки
    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        
        // Анимация тряски формы
        const loginFormElement = document.querySelector('.login-form');
        if (loginFormElement) {
            loginFormElement.style.animation = 'shake 0.3s ease-in-out';
            setTimeout(() => {
                loginFormElement.style.animation = '';
            }, 300);
        }
        
        // Автоматическое скрытие через 3 секунды
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }

    // Функция скрытия ошибки
    function hideError() {
        errorMessage.style.display = 'none';
    }

    // Функция проверки учетных данных
    function validateCredentials(username, password) {
        if (username === demoCredentials.admin.username && password === demoCredentials.admin.password) {
            return { success: true, role: 'admin' };
        }
        return { success: false };
    }

    // Функция сохранения сессии
    function saveSession(userData) {
        const sessionData = {
            username: userData.username,
            role: userData.role,
            loginTime: new Date().toISOString()
        };
        sessionStorage.setItem('adminSession', JSON.stringify(sessionData));
        // Также сохраняем в localStorage для постоянства
        localStorage.setItem('adminLoggedIn', 'true');
    }

    // Функция входа
    function login(event) {
        event.preventDefault();
        hideError();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Проверка на пустые поля
        if (!username) {
            showError('Пожалуйста, введите логин');
            usernameInput.focus();
            return;
        }
        
        if (!password) {
            showError('Пожалуйста, введите пароль');
            passwordInput.focus();
            return;
        }
        
        if (!consentCheckbox.checked) {
            showError('Необходимо согласие на обработку персональных данных');
            consentCheckbox.focus();
            return;
        }
        
        // Проверка учетных данных
        const validation = validateCredentials(username, password);
        
        if (validation.success) {
            // Сохраняем сессию
            const userData = {
                username: username,
                role: validation.role,
                loginTime: new Date().toISOString()
            };
            saveSession(userData);
            
            // Показываем загрузку
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Вход...';
            loginBtn.disabled = true;
            
            // Перенаправление на панель администратора
            setTimeout(() => {
                // Правильный путь к панели администратора
                window.location.href = 'admin/dashboard.html';
            }, 800);
        } else {
            showError('Неверный логин или пароль');
            passwordInput.value = '';
            passwordInput.focus();
            loginBtn.disabled = true;
        }
    }

    // Обработчики событий
    if (usernameInput && passwordInput && consentCheckbox) {
        usernameInput.addEventListener('input', toggleLoginButton);
        passwordInput.addEventListener('input', toggleLoginButton);
        consentCheckbox.addEventListener('change', toggleLoginButton);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    // Переключение видимости пароля
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // ===== МОДАЛЬНОЕ ОКНО С ПРАВИЛАМИ =====
    const policyLink = document.getElementById('policyLink');
    const policyModal = document.getElementById('policyModal');
    const policyClose = document.querySelector('.policy-close');
    const policyAcceptBtn = document.querySelector('.policy-accept-btn');

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
    if (policyAcceptBtn && policyModal && consentCheckbox) {
        policyAcceptBtn.addEventListener('click', function() {
            policyModal.classList.remove('show');
            document.body.style.overflow = '';
            
            // Автоматически отмечаем чекбокс
            if (!consentCheckbox.checked) {
                consentCheckbox.checked = true;
                const event = new Event('change', { bubbles: true });
                consentCheckbox.dispatchEvent(event);
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

    // Добавляем анимацию тряски
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Добавляем подсказку с демо-данными
    const formNote = document.querySelector('.form-note');
    if (formNote) {
        const demoInfo = document.createElement('div');
        demoInfo.style.cssText = 'margin-top: 15px; text-align: center; font-size: 0.85rem; color: #718096; border-top: 1px solid #e9edff; padding-top: 15px;';
        demoInfo.innerHTML = `
            <i class="fas fa-info-circle"></i> 
            Демо-данные: <strong style="color:#5a6adf">admin / admin123</strong>
        `;
        formNote.after(demoInfo);
    }

    // Проверка, если уже авторизован - редирект на панель
    const isLoggedIn = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminSession');
    if (isLoggedIn && window.location.pathname.includes('adminvhod.html')) {
        // Если уже авторизован, перенаправляем на панель
        window.location.href = 'admin/dashboard.html';
    }
});