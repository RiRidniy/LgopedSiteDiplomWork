document.addEventListener('DOMContentLoaded', function() {
    // Проверка авторизации
    const isLoggedIn = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminSession');
    
    if (!isLoggedIn) {
        // Если не авторизован, перенаправляем на страницу входа
        alert('Доступ запрещен. Пожалуйста, авторизуйтесь.');
        window.location.href = '../adminvhod.html';
        return;
    }
    
    // ... остальной код админ-панели ...
});

document.addEventListener('DOMContentLoaded', function() {
    // Данные по умолчанию
    const defaultData = {
        services: [
            { id: 1, title: "Постановка звуков", desc: "Исправление картавости, шепелявения и других нарушений произношения у детей от 4 лет", icon: "fas fa-child" },
            { id: 2, title: "Запуск речи", desc: "Помощь неговорящим детям от 2 лет. Развитие понимания речи и появление первых слов", icon: "fas fa-comment-dots" },
            { id: 3, title: "Подготовка к школе", desc: "Обучение чтению, письму, развитие фонематического слуха и связной речи", icon: "fas fa-book-open" },
            { id: 4, title: "Дикция для взрослых", desc: "Постановка четкой дикции, работа с голосом и дыханием для публичных выступлений", icon: "fas fa-user-tie" },
            { id: 5, title: "Восстановление речи", desc: "Занятия после инсульта, травм и операций. Возвращение навыков общения", icon: "fas fa-heartbeat" },
            { id: 6, title: "Онлайн-консультации", desc: "Занятия через видеосвязь из любой точки мира. Удобно и эффективно", icon: "fas fa-laptop" }
        ],
        letters: [
            { id: 1, letter: "А", title: "Буква А", lessons: ["Найди букву А", "Раскрась картинки на А", "Прописи буквы А"] },
            { id: 2, letter: "Б", title: "Буква Б", lessons: ["Найди букву Б", "Слова на букву Б", "Прописи буквы Б"] },
            { id: 3, letter: "В", title: "Буква В", lessons: ["Найди букву В", "Слова на букву В", "Прописи буквы В"] }
        ],
        videos: [
            { id: 1, title: "Артикуляционная гимнастика", desc: "Комплекс упражнений для развития речевого аппарата", duration: "15:20", exercises: ["Улыбка", "Хоботок", "Лопатка", "Часики"] },
            { id: 2, title: "Постановка звука 'Р'", desc: "Как научиться правильно произносить звук Р", duration: "12:45", exercises: ["Подготовительные упражнения", "Постановка вибрации", "Закрепление в слогах"] },
            { id: 3, title: "Постановка звука 'Л'", desc: "Учимся говорить звук Л правильно", duration: "10:30", exercises: ["Пароход гудит", "Индюк", "Качели"] }
        ],
        disorders: [
            { id: 1, title: "Дислалия", desc: "Нарушение звукопроизношения при нормальном слухе", features: ["Искажение звуков", "Замены звуков", "Смешение звуков"], example: "лыба вместо рыба" },
            { id: 2, title: "Дизартрия", desc: "Нарушение произносительной стороны речи", features: ["Смазанная речь", "Изменение темпа", "Нарушение дыхания"], example: "ммо-ко вместо молоко" }
        ],
        reviews: [
            { id: 1, name: "Катя П.О.", text: "Водили дочку исправлять «Ш» и «Ж». Ожидали чётких звуков, а получили в придачу уверенность в себе! Раньше на утренниках она молчала в уголке, а теперь просит главную роль — говорит, что её речь красивая. Оказывается, чистое произношение — это не только про буквы, это про самоощущение. Спасибо!" },
            { id: 2, name: "Алексей М.", text: "Обращался для постановки дикции перед публичными выступлениями. Уже через несколько занятий почувствовал уверенность, голос стал звучать глубже. Очень профессиональный подход и комфортная атмосфера." }
        ],
        achievements: [
            { id: 1, title: "Диплом о высшем образовании", icon: "fas fa-certificate" },
            { id: 2, title: "Сертификат 'Логопедический массаж'", icon: "fas fa-award" },
            { id: 3, title: "Курс 'Запуск речи у неговорящих детей'", icon: "fas fa-certificate" }
        ]
    };

    // Загрузка данных из localStorage
    function loadData() {
        const data = {};
        for (let key in defaultData) {
            const saved = localStorage.getItem(key);
            data[key] = saved ? JSON.parse(saved) : defaultData[key];
        }
        return data;
    }

    // Сохранение данных
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    let siteData = loadData();

    // Функция обновления статистики
    function updateStats() {
        document.getElementById('totalMaterials').textContent = 
            siteData.services.length + siteData.letters.length + siteData.videos.length + siteData.disorders.length;
        document.getElementById('totalReviews').textContent = siteData.reviews.length;
    }

    // Рендер списков
    function renderServices() {
        const container = document.getElementById('servicesList');
        if (!container) return;
        container.innerHTML = siteData.services.map(service => `
            <div class="item-card" data-id="${service.id}" data-type="service">
                <div class="item-info">
                    <h4><i class="${service.icon}"></i> ${service.title}</h4>
                    <p>${service.desc}</p>
                </div>
                <div class="item-actions">
                    <button class="edit-item" onclick="editItem('service', ${service.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-item" onclick="deleteItem('service', ${service.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    function renderLetters() {
        const container = document.getElementById('lettersList');
        if (!container) return;
        container.innerHTML = siteData.letters.map(letter => `
            <div class="item-card" data-id="${letter.id}" data-type="letter">
                <div class="item-info">
                    <h4>Буква ${letter.letter}: ${letter.title}</h4>
                    <p>${letter.lessons.join(' • ')}</p>
                </div>
                <div class="item-actions">
                    <button class="edit-item" onclick="editItem('letter', ${letter.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-item" onclick="deleteItem('letter', ${letter.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    function renderVideos() {
        const container = document.getElementById('videoList');
        if (!container) return;
        container.innerHTML = siteData.videos.map(video => `
            <div class="item-card" data-id="${video.id}" data-type="video">
                <div class="item-info">
                    <h4>${video.title} (${video.duration})</h4>
                    <p>${video.desc}</p>
                    <p>Упражнения: ${video.exercises.join(' • ')}</p>
                </div>
                <div class="item-actions">
                    <button class="edit-item" onclick="editItem('video', ${video.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-item" onclick="deleteItem('video', ${video.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    function renderDisorders() {
        const container = document.getElementById('disordersList');
        if (!container) return;
        container.innerHTML = siteData.disorders.map(disorder => `
            <div class="item-card" data-id="${disorder.id}" data-type="disorder">
                <div class="item-info">
                    <h4>${disorder.title}</h4>
                    <p>${disorder.desc}</p>
                    <p>Особенности: ${disorder.features.join(' • ')}</p>
                    <p>Пример: ${disorder.example}</p>
                </div>
                <div class="item-actions">
                    <button class="edit-item" onclick="editItem('disorder', ${disorder.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-item" onclick="deleteItem('disorder', ${disorder.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    function renderReviews() {
        const container = document.getElementById('reviewsList');
        if (!container) return;
        container.innerHTML = siteData.reviews.map(review => `
            <div class="item-card" data-id="${review.id}" data-type="review">
                <div class="item-info">
                    <h4>${review.name}</h4>
                    <p>${review.text.substring(0, 150)}${review.text.length > 150 ? '...' : ''}</p>
                </div>
                <div class="item-actions">
                    <button class="edit-item" onclick="editItem('review', ${review.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-item" onclick="deleteItem('review', ${review.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    function renderAchievements() {
        const container = document.getElementById('achievementsList');
        if (!container) return;
        container.innerHTML = siteData.achievements.map(ach => `
            <div class="item-card" data-id="${ach.id}" data-type="achievement">
                <div class="item-info">
                    <h4><i class="${ach.icon}"></i> ${ach.title}</h4>
                </div>
                <div class="item-actions">
                    <button class="edit-item" onclick="editItem('achievement', ${ach.id})"><i class="fas fa-edit"></i></button>
                    <button class="delete-item" onclick="deleteItem('achievement', ${ach.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    window.editItem = function(type, id) {
        const modal = document.getElementById('editModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalFields = document.getElementById('modalFields');
        
        let item = null;
        let dataArray = null;
        
        switch(type) {
            case 'service':
                dataArray = siteData.services;
                item = dataArray.find(s => s.id === id);
                modalTitle.textContent = 'Редактировать услугу';
                modalFields.innerHTML = `
                    <div class="form-group"><label>Название</label><input type="text" id="editTitle" value="${item.title}" class="form-control"></div>
                    <div class="form-group"><label>Описание</label><textarea id="editDesc" class="form-control">${item.desc}</textarea></div>
                    <div class="form-group"><label>Иконка (Font Awesome класс)</label><input type="text" id="editIcon" value="${item.icon}" class="form-control"></div>
                `;
                break;
            case 'letter':
                dataArray = siteData.letters;
                item = dataArray.find(l => l.id === id);
                modalTitle.textContent = 'Редактировать букву';
                modalFields.innerHTML = `
                    <div class="form-group"><label>Буква</label><input type="text" id="editLetter" value="${item.letter}" class="form-control"></div>
                    <div class="form-group"><label>Название</label><input type="text" id="editTitle" value="${item.title}" class="form-control"></div>
                    <div class="form-group"><label>Задания (через запятую)</label><input type="text" id="editLessons" value="${item.lessons.join(', ')}" class="form-control"></div>
                `;
                break;
            case 'video':
                dataArray = siteData.videos;
                item = dataArray.find(v => v.id === id);
                modalTitle.textContent = 'Редактировать видео';
                modalFields.innerHTML = `
                    <div class="form-group"><label>Название</label><input type="text" id="editTitle" value="${item.title}" class="form-control"></div>
                    <div class="form-group"><label>Описание</label><textarea id="editDesc" class="form-control">${item.desc}</textarea></div>
                    <div class="form-group"><label>Длительность</label><input type="text" id="editDuration" value="${item.duration}" class="form-control"></div>
                    <div class="form-group"><label>Упражнения (через запятую)</label><input type="text" id="editExercises" value="${item.exercises.join(', ')}" class="form-control"></div>
                `;
                break;
            case 'disorder':
                dataArray = siteData.disorders;
                item = dataArray.find(d => d.id === id);
                modalTitle.textContent = 'Редактировать нарушение';
                modalFields.innerHTML = `
                    <div class="form-group"><label>Название</label><input type="text" id="editTitle" value="${item.title}" class="form-control"></div>
                    <div class="form-group"><label>Описание</label><textarea id="editDesc" class="form-control">${item.desc}</textarea></div>
                    <div class="form-group"><label>Особенности (через запятую)</label><input type="text" id="editFeatures" value="${item.features.join(', ')}" class="form-control"></div>
                    <div class="form-group"><label>Пример</label><input type="text" id="editExample" value="${item.example}" class="form-control"></div>
                `;
                break;
            case 'review':
                dataArray = siteData.reviews;
                item = dataArray.find(r => r.id === id);
                modalTitle.textContent = 'Редактировать отзыв';
                modalFields.innerHTML = `
                    <div class="form-group"><label>Имя</label><input type="text" id="editName" value="${item.name}" class="form-control"></div>
                    <div class="form-group"><label>Текст отзыва</label><textarea id="editText" class="form-control" rows="4">${item.text}</textarea></div>
                `;
                break;
            case 'achievement':
                dataArray = siteData.achievements;
                item = dataArray.find(a => a.id === id);
                modalTitle.textContent = 'Редактировать достижение';
                modalFields.innerHTML = `
                    <div class="form-group"><label>Название</label><input type="text" id="editTitle" value="${item.title}" class="form-control"></div>
                    <div class="form-group"><label>Иконка (Font Awesome класс)</label><input type="text" id="editIcon" value="${item.icon}" class="form-control"></div>
                `;
                break;
        }
        
        const editForm = document.getElementById('editForm');
        editForm.onsubmit = function(e) {
            e.preventDefault();
            saveEditedItem(type, id, dataArray);
            modal.classList.remove('show');
            document.body.style.overflow = '';
        };
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    function saveEditedItem(type, id, dataArray) {
        const index = dataArray.findIndex(i => i.id === id);
        if (index === -1) return;
        
        switch(type) {
            case 'service':
                dataArray[index].title = document.getElementById('editTitle').value;
                dataArray[index].desc = document.getElementById('editDesc').value;
                dataArray[index].icon = document.getElementById('editIcon').value;
                break;
            case 'letter':
                dataArray[index].letter = document.getElementById('editLetter').value;
                dataArray[index].title = document.getElementById('editTitle').value;
                dataArray[index].lessons = document.getElementById('editLessons').value.split(',').map(l => l.trim());
                break;
            case 'video':
                dataArray[index].title = document.getElementById('editTitle').value;
                dataArray[index].desc = document.getElementById('editDesc').value;
                dataArray[index].duration = document.getElementById('editDuration').value;
                dataArray[index].exercises = document.getElementById('editExercises').value.split(',').map(e => e.trim());
                break;
            case 'disorder':
                dataArray[index].title = document.getElementById('editTitle').value;
                dataArray[index].desc = document.getElementById('editDesc').value;
                dataArray[index].features = document.getElementById('editFeatures').value.split(',').map(f => f.trim());
                dataArray[index].example = document.getElementById('editExample').value;
                break;
            case 'review':
                dataArray[index].name = document.getElementById('editName').value;
                dataArray[index].text = document.getElementById('editText').value;
                break;
            case 'achievement':
                dataArray[index].title = document.getElementById('editTitle').value;
                dataArray[index].icon = document.getElementById('editIcon').value;
                break;
        }
        
        saveData(type + 's', dataArray);
        refreshAllLists();
        updateStats();
    }

    window.deleteItem = function(type, id) {
        if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
            let dataArray;
            switch(type) {
                case 'service': dataArray = siteData.services; break;
                case 'letter': dataArray = siteData.letters; break;
                case 'video': dataArray = siteData.videos; break;
                case 'disorder': dataArray = siteData.disorders; break;
                case 'review': dataArray = siteData.reviews; break;
                case 'achievement': dataArray = siteData.achievements; break;
                default: return;
            }
            
            const index = dataArray.findIndex(i => i.id === id);
            if (index !== -1) dataArray.splice(index, 1);
            
            saveData(type + 's', dataArray);
            refreshAllLists();
            updateStats();
        }
    };

    function refreshAllLists() {
        renderServices();
        renderLetters();
        renderVideos();
        renderDisorders();
        renderReviews();
        renderAchievements();
    }

    // Переключение секций
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${sectionId}-section`).classList.add('active');
        });
    });

    // Обработчики кнопок быстрых действий
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            const navItem = document.querySelector(`.nav-item[data-section="${section}"]`);
            if (navItem) navItem.click();
        });
    });

    // Сохранение формы "О себе"
    document.getElementById('aboutForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Информация сохранена! (В реальном проекте данные будут отправлены на сервер)');
    });

    // Сохранение формы контактов
    document.getElementById('contactsForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Контакты сохранены!');
    });

    // Сохранение формы шапки
    document.getElementById('heroForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Данные шапки сохранены!');
    });

    // Модальное окно закрытие
    const modal = document.getElementById('editModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Выход из админки
    document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Вы уверены, что хотите выйти?')) {
            localStorage.removeItem('adminSession');
            window.location.href = '../adminvhod.html';
        }
    });

    // Отображение текущего времени
    function updateTime() {
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            const now = new Date();
            timeElement.innerHTML = `<i class="far fa-clock"></i> ${now.toLocaleString('ru-RU')}`;
        }
    }
    updateTime();
    setInterval(updateTime, 1000);

    // Инициализация
    refreshAllLists();
    updateStats();
});