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

    // ===== ИНТЕРАКТИВ ДЛЯ КАРТОЧЕК С БУКВАМИ =====
    const letterCards = document.querySelectorAll('.letter-card');
    
    letterCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const letter = this.dataset.letter;
            // Здесь можно добавить переход на страницу с заданиями для конкретной буквы
            alert(`Вы выбрали букву "${letter}". Страница с заданиями для этой буквы находится в разработке.`);
        });
    });

    // ===== ИНТЕРАКТИВ ДЛЯ МЕДИА КАРТОЧЕК =====
    const mediaButtons = document.querySelectorAll('.media-btn');
    
    mediaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.media-card');
            const title = card.querySelector('.media-title').textContent;
            alert(`Вы переходите к занятию: "${title}"`);
        });
    });

    // ===== ССЫЛКИ НА КАТАЛОГ =====
    const catalogLinks = document.querySelectorAll('.catalog-link');
    
    catalogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Страница со всеми заданиями находится в разработке');
        });
    });

    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Добавляем анимацию для карточек с буквами и медиа-карточек
    const animatedElements = document.querySelectorAll('.letter-card, .media-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== ПОДСВЕТКА АКТИВНОЙ БУКВЫ =====
    // Для демонстрации можно добавить случайную подсветку
    const randomIndex = Math.floor(Math.random() * letterCards.length);
    // Убрано, чтобы не мешать, но можно раскомментировать:
    // letterCards[randomIndex].style.background = '#5a6adf';
    // letterCards[randomIndex].style.color = 'white';
});