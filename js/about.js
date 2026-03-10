document.addEventListener('DOMContentLoaded', function() {
    // Слайдер отзывов
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.arrow.left');
    const nextBtn = document.querySelector('.arrow.right');
    let currentIndex = 0;
    let autoSlideInterval;

    // Функция показа слайда
    function showSlide(index) {
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Переключение по кнопкам
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
            resetAutoSlide();
        });
    }

    // Переключение по точкам
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetAutoSlide();
        });
    });

    // Автоматическое перелистывание
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Запуск слайдера
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();

        // Остановка при наведении
        const slideContainer = document.querySelector('.slide-container');
        if (slideContainer) {
            slideContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            slideContainer.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }
    }

    // Кнопки "Наверх"
    const toTopBtn = document.getElementById('toTop');
    const toTopFixed = document.getElementById('toTopFixed');
    const toTopBtns = document.querySelectorAll('.to-top-btn');

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (toTopBtn) toTopBtn.addEventListener('click', scrollToTop);
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

    toTopBtns.forEach(btn => {
        btn.addEventListener('click', scrollToTop);
    });

    // Выпадающее меню
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

    // Версия для слабовидящих
    const eyeBtn = document.querySelector('.eye-btn');
    if (eyeBtn) {
        eyeBtn.addEventListener('click', function() {
            alert('Версия для слабовидящих будет доступна в ближайшее время');
        });
    }
});