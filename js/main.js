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