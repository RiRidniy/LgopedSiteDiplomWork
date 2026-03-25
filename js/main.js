
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

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

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetAutoSlide();
        });
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // 5 секунд
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }

    // Кнопка "Наверх"
    const toTopBtn = document.getElementById('toTopFixed');
    const footerToTop = document.querySelector('.to-top-btn');

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (toTopBtn) {
        toTopBtn.addEventListener('click', scrollToTop);
        // Показываем/скрываем кнопку при прокрутке
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                toTopBtn.style.display = 'flex';
            } else {
                toTopBtn.style.display = 'none';
            }
        });
    }

    if (footerToTop) {
        footerToTop.addEventListener('click', scrollToTop);
    }

    // Выпадающее меню (если нужно по клику, а не по hover)
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
    }

    // Версия для слабовидящих (заглушка)
    const eyeBtn = document.querySelector('.eye-btn');
    if (eyeBtn) {
        eyeBtn.addEventListener('click', function() {
            alert('Здесь будет включение версии для слабовидящих');
            // Можно добавить логику переключения CSS
        });
    }
});