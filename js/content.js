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

    // ===== ПОИСК ПО ЗАГОЛОВКАМ =====
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    
    // Находим все информационные ряды
    const infoRows = document.querySelectorAll('.info-row');
    
    // Создаем счетчик результатов
    const resultsCounter = document.createElement('div');
    resultsCounter.className = 'search-results-counter';
    resultsCounter.innerHTML = 'Найдено материалов: <span id="resultsCount">0</span>';
    
    // Вставляем счетчик после поиска
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.appendChild(resultsCounter);
    }

    // Функция получения текста заголовка из информационного ряда
    function getRowTitle(row) {
        // Ищем заголовок h3 внутри info-content
        const titleElement = row.querySelector('.info-content h3');
        if (titleElement) {
            return titleElement.textContent.toLowerCase();
        }
        
        // Для видео рядов может быть другая структура
        const videoTitle = row.querySelector('.info-content h3');
        if (videoTitle) {
            return videoTitle.textContent.toLowerCase();
        }
        
        return '';
    }

    // Функция подсветки заголовка
    function highlightTitle(row, searchTerm) {
        const titleElement = row.querySelector('.info-content h3');
        if (!titleElement) return;
        
        const originalText = titleElement.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        // Заменяем текст на подсвеченный
        titleElement.innerHTML = originalText.replace(regex, '<span class="search-highlight">$1</span>');
    }

    // Функция сброса подсветки заголовка
    function resetTitleHighlight(row) {
        const titleElement = row.querySelector('.info-content h3');
        if (!titleElement) return;
        
        // Убираем все span с подсветкой
        const highlights = titleElement.querySelectorAll('.search-highlight');
        highlights.forEach(span => {
            span.replaceWith(document.createTextNode(span.textContent));
        });
    }

    // Функция подсчета видимых элементов
    function updateResultsCount() {
        let visibleCount = 0;
        infoRows.forEach(row => {
            if (row.style.display !== 'none') {
                visibleCount++;
            }
        });
        
        const countSpan = document.getElementById('resultsCount');
        if (countSpan) {
            countSpan.textContent = visibleCount;
        }
        
        // Показываем/скрываем счетчик
        if (resultsCounter) {
            if (visibleCount === 0 && searchInput.value.trim() !== '') {
                resultsCounter.style.display = 'block';
            } else if (searchInput.value.trim() !== '') {
                resultsCounter.style.display = 'block';
            } else {
                resultsCounter.style.display = 'none';
            }
        }
        
        return visibleCount;
    }

    // Функция поиска
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            // Если поиск пустой, показываем все элементы и сбрасываем подсветку
            infoRows.forEach(row => {
                row.style.display = 'flex';
                row.classList.remove('search-match');
                resetTitleHighlight(row);
            });
            
            // Скрываем счетчик и кнопку очистки
            if (resultsCounter) {
                resultsCounter.style.display = 'none';
            }
            
            if (searchClear) {
                searchClear.style.display = 'none';
            }
            
            return;
        }

        // Показываем кнопку очистки
        if (searchClear) {
            searchClear.style.display = 'block';
        }

        let anyVisible = false;
        
        // Проходим по каждому информационному ряду
        infoRows.forEach(row => {
            // Получаем только текст заголовка
            const titleText = getRowTitle(row);
            
            // Сбрасываем подсветку перед новым поиском
            resetTitleHighlight(row);
            
            // Ищем совпадение только в заголовке
            const matches = titleText.includes(searchTerm);
            
            if (matches) {
                row.style.display = 'flex';
                row.classList.add('search-match');
                
                // Подсвечиваем только заголовок
                highlightTitle(row, searchTerm);
                
                anyVisible = true;
            } else {
                row.style.display = 'none';
                row.classList.remove('search-match');
            }
        });
        
        // Обновляем счетчик
        const visibleCount = updateResultsCount();
        
        // Показываем сообщение, если ничего не найдено
        const noResultsMessage = document.getElementById('noResultsMessage');
        
        if (visibleCount === 0 && searchTerm !== '') {
            // Создаем сообщение, если его нет
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'noResultsMessage';
                message.className = 'no-results-message';
                message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте найти по названию: дислалия, буква А, артикуляционная гимнастика...</p>
                `;
                
                // Вставляем после контейнера поиска
                const searchSection = document.querySelector('.search-section');
                if (searchSection) {
                    searchSection.after(message);
                }
            } else {
                noResultsMessage.style.display = 'block';
            }
        } else {
            if (noResultsMessage) {
                noResultsMessage.style.display = 'none';
            }
        }
    }

    // Обработчик ввода в поиск
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }

    // Очистка поиска
    if (searchClear) {
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            performSearch();
        });
    }

    // ===== ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ =====
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

    // Добавляем анимацию для информационных рядов
    infoRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(30px)';
        row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(row);
    });

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    // Проверяем, есть ли параметры поиска в URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    if (searchParam) {
        searchInput.value = searchParam;
        performSearch();
    }

    // Добавляем примеры поисковых запросов в плейсхолдер
    if (searchInput) {
        const placeholders = [
            'Поиск по названиям: дислалия, буква А, артикуляция...',
            'Введите название нарушения...',
            'Например: дислалия, афазия, заикание',
            'Поиск по буквам: А, Б, В...',
            'Ищите видео: гимнастика, дыхание, пальчиковые'
        ];
        
        let index = 0;
        setInterval(() => {
            searchInput.placeholder = placeholders[index];
            index = (index + 1) % placeholders.length;
        }, 3000);
    }
});