// стрелка пермотки
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        toTop.style.display = "block";
    } else {
        toTop.style.display = "none";
    }
});

toTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// выподающее меню
const dropdown = document.querySelector('.dropdown');
const dropBtn = document.querySelector('.dropbtn');

dropBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
});

document.addEventListener('click', () => {
    dropdown.classList.remove('active');
});

// слайдер
const slides = [
    "Отличный специалист, ребёнок заговорил!",
    "Очень внимательный и профессиональный подход.",
    "Результат уже после первых занятий."
];

let index = 0;
const slide = document.querySelector(".slide p");

document.querySelector(".left").onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    slide.textContent = slides[index];
};

document.querySelector(".right").onclick = () => {
    index = (index + 1) % slides.length;
    slide.textContent = slides[index];
};

// модальное окно
const cards = document.querySelectorAll(".game-card[data-modal]");
const modals = document.querySelectorAll(".modal");
const closes = document.querySelectorAll(".close");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const modalId = card.dataset.modal;
        document.getElementById(modalId).style.display = "flex";
    });
});

closes.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal").style.display = "none";
    });
});

window.addEventListener("click", e => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});