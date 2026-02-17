// ============================================
// ОСНОВНЫЕ ПЕРЕМЕННЫЕ
// ============================================

let menuData = [];
let drinksData = [];
let galleryImages = [];
let currentImageIndex = 0;

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initWelcomeSound();
    initHeroVideo();
    loadMenuData();
    loadDrinksData();
    initGallery();
    initContactForm();
    initScrollAnimations();
    initSmoothScroll();
});

// ============================================
// НАВИГАЦИЯ
// ============================================

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Гамбургер меню
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Прозрачность навигации при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Активная ссылка при скролле
        updateActiveLink();
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// ПЛАВНАЯ ПРОКРУТКА
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ЗАГРУЗКА И ОТОБРАЖЕНИЕ МЕНЮ
// ============================================

async function loadMenuData() {
    try {
        const response = await fetch('data/menu.json');
        const data = await response.json();
        menuData = data.items;
        displayMenuItems('all');
        initMenuFilters();
    } catch (error) {
        console.error('Ошибка загрузки меню:', error);
        displayMenuError();
    }
}

function displayMenuItems(category) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const filteredItems = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);

    filteredItems.forEach((item, index) => {
        const menuItem = createMenuItem(item, index);
        menuGrid.appendChild(menuItem);
    });
}

function createMenuItem(item, index) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-image" 
             onerror="this.src='images/placeholder.jpg'">
        <div class="item-content">
            <div class="item-header">
                <h3 class="item-name">${item.name}</h3>
                <span class="item-price">${item.price} ₽</span>
            </div>
            <p class="item-description">${item.description}</p>
            <div class="item-meta">
                <span class="item-weight">⚖️ ${item.weight}г</span>
            </div>
        </div>
    `;
    
    return div;
}

function initMenuFilters() {
    const categoryButtons = document.querySelectorAll('.menu-section .category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            displayMenuItems(category);
        });
    });
}

function displayMenuError() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
            <p style="font-size: 1.2rem; color: var(--color-gray-dark);">
                Меню временно недоступно. Пожалуйста, обновите страницу.
            </p>
        </div>
    `;
}

// ============================================
// ЗАГРУЗКА И ОТОБРАЖЕНИЕ НАПИТКОВ
// ============================================

async function loadDrinksData() {
    try {
        const response = await fetch('data/drinks.json');
        const data = await response.json();
        drinksData = data.items;
        displayDrinkItems('all');
        initDrinksFilters();
    } catch (error) {
        console.error('Ошибка загрузки напитков:', error);
        displayDrinksError();
    }
}

function displayDrinkItems(category) {
    const drinksGrid = document.getElementById('drinksGrid');
    drinksGrid.innerHTML = '';

    const filteredItems = category === 'all' 
        ? drinksData 
        : drinksData.filter(item => item.category === category);

    filteredItems.forEach((item, index) => {
        const drinkItem = createDrinkItem(item, index);
        drinksGrid.appendChild(drinkItem);
    });
}

function createDrinkItem(item, index) {
    const div = document.createElement('div');
    div.className = 'drink-item';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-image"
             onerror="this.src='images/placeholder.jpg'">
        <div class="item-content">
            <div class="item-header">
                <h3 class="item-name">${item.name}</h3>
                <span class="item-price">${item.price} ₽</span>
            </div>
            <p class="item-description">${item.description}</p>
            <div class="item-meta">
                <span class="item-volume">🥤 ${item.volume}мл</span>
            </div>
        </div>
    `;
    
    return div;
}

function initDrinksFilters() {
    const categoryButtons = document.querySelectorAll('.drinks-section .category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            displayDrinkItems(category);
        });
    });
}

function displayDrinksError() {
    const drinksGrid = document.getElementById('drinksGrid');
    drinksGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
            <p style="font-size: 1.2rem; color: var(--color-gray-dark);">
                Список напитков временно недоступен. Пожалуйста, обновите страницу.
            </p>
        </div>
    `;
}

// ============================================
// ГАЛЕРЕЯ
// ============================================

function initGallery() {
    // Реальные фотографии с сайта ресторана (загрузите их из brandchef.ru/proekty/sakuga/)
    galleryImages = [
        { src: 'images/downloaded/sakuga-interior-1.jpg', alt: 'Интерьер ресторана Sakuga' },
        { src: 'images/downloaded/sakuga-interior-2.jpg', alt: 'Атмосфера зала' },
        { src: 'images/downloaded/sakuga-interior-3.jpg', alt: 'Барная зона' },
        { src: 'images/downloaded/sakuga-interior-4.jpg', alt: 'Уютная обстановка' },
        { src: 'images/downloaded/sakuga-interior-5.jpg', alt: 'VIP зона' },
        { src: 'images/downloaded/sakuga-interior-6.jpg', alt: 'Общий вид ресторана' },
        { src: 'images/downloaded/sakuga-dish-1.jpg', alt: 'Фирменные суши' },
        { src: 'images/downloaded/sakuga-dish-2.jpg', alt: 'Авторские роллы' },
        { src: 'images/downloaded/sakuga-dish-3.jpg', alt: 'Горячие блюда' },
        { src: 'images/downloaded/sakuga-dish-4.jpg', alt: 'Десерты' },
        { src: 'images/downloaded/sakuga-drink-1.jpg', alt: 'Напитки и коктейли' },
        { src: 'images/downloaded/sakuga-drink-2.jpg', alt: 'Авторские коктейли' }
    ];

    displayGallery();
    initGalleryModal();
}

function displayGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    galleryImages.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" onerror="this.src='images/placeholder.jpg'">
            <div class="gallery-overlay">
                <span class="gallery-overlay-text">👁️</span>
            </div>
        `;
        
        div.addEventListener('click', () => openGalleryModal(index));
        galleryGrid.appendChild(div);
    });
}

function initGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    closeBtn.addEventListener('click', closeGalleryModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') closeGalleryModal();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

function openGalleryModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = galleryImages[index].src;
    modalImage.alt = galleryImages[index].alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const modalImage = document.getElementById('modalImage');
    modalImage.src = galleryImages[currentImageIndex].src;
    modalImage.alt = galleryImages[currentImageIndex].alt;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const modalImage = document.getElementById('modalImage');
    modalImage.src = galleryImages[currentImageIndex].src;
    modalImage.alt = galleryImages[currentImageIndex].alt;
}

// ============================================
// ФОРМА ОБРАТНОЙ СВЯЗИ
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm(form)) {
            await submitForm(form);
        }
    });

    // Валидация в реальном времени
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const errorSpan = field.parentElement.querySelector('.form-error');
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        errorMessage = 'Это поле обязательно для заполнения';
    } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            errorMessage = 'Введите корректный email';
        }
    } else if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
            errorMessage = 'Введите корректный номер телефона';
        }
    }
    
    if (errorMessage) {
        field.classList.add('error');
        errorSpan.textContent = errorMessage;
        return false;
    } else {
        field.classList.remove('error');
        errorSpan.textContent = '';
        return true;
    }
}

async function submitForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    try {
        // Проверяем, настроен ли EmailJS
        if (!EMAIL_CONFIG.publicKey || EMAIL_CONFIG.publicKey === 'YOUR_PUBLIC_KEY_HERE') {
            console.warn('⚠️ EmailJS не настроен! Откройте js/email-config.js и добавьте ваши ключи.');
            console.log('📧 Данные формы (не отправлены):', data);
            
            // Показываем сообщение об успехе (но не отправляем)
            showSuccessMessage('Форма пока в тестовом режиме. Данные выведены в консоль браузера (F12).');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }
        
        // Инициализируем EmailJS
        emailjs.init(EMAIL_CONFIG.publicKey);
        
        // Добавляем дату отправки
        const templateParams = {
            ...data,
            submission_date: new Date().toLocaleString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        if (EMAIL_CONFIG.debugMode) {
            console.log('📧 Отправка email через EmailJS...');
            console.log('Данные:', templateParams);
        }
        
        // Отправляем email через EmailJS
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            templateParams
        );
        
        if (EMAIL_CONFIG.debugMode) {
            console.log('✅ Email успешно отправлен!', response);
        }
        
        // Показываем сообщение об успехе
        showSuccessMessage(EMAIL_CONFIG.successMessage);
        form.reset();
        
    } catch (error) {
        console.error('❌ Ошибка отправки email:', error);
        showErrorMessage(EMAIL_CONFIG.errorMessage);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

function showSuccessMessage(customMessage) {
    const successDiv = document.getElementById('formSuccess');
    
    if (customMessage) {
        const originalText = successDiv.textContent;
        successDiv.textContent = customMessage;
        successDiv.classList.add('show');
        
        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => {
                successDiv.textContent = originalText;
            }, 300);
        }, 5000);
    } else {
        successDiv.classList.add('show');
        
        setTimeout(() => {
            successDiv.classList.remove('show');
        }, 5000);
    }
}

function showErrorMessage(errorMessage) {
    const successDiv = document.getElementById('formSuccess');
    const originalBg = successDiv.style.background;
    
    successDiv.textContent = errorMessage;
    successDiv.style.background = 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)';
    successDiv.classList.add('show');
    
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            successDiv.textContent = EMAIL_CONFIG.successMessage;
            successDiv.style.background = originalBg;
        }, 300);
    }, 7000);
}

// ============================================
// АНИМАЦИИ ПРИ СКРОЛЛЕ
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Анимация элементов при появлении
    const animatedElements = document.querySelectorAll('.feature, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// УТИЛИТЫ
// ============================================

// Установка минимальной даты для бронирования (сегодня)
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ============================================
// ЗВУК ПРИВЕТСТВИЯ (KOTO)
// ============================================

function initWelcomeSound() {
    const welcomeSound = document.getElementById('welcomeSound');
    
    if (welcomeSound) {
        welcomeSound.volume = 0.3; // Тихий звук приветствия
        
        // Множественные попытки воспроизведения
        const attemptPlay = () => {
            welcomeSound.play()
                .then(() => {
                    console.log('Звук koto воспроизводится');
                })
                .catch(error => {
                    console.log('Автовоспроизведение заблокировано, попытка при взаимодействии...');
                    // Воспроизведение при любом взаимодействии пользователя
                    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
                    const playOnce = () => {
                        welcomeSound.play()
                            .then(() => {
                                console.log('Звук koto воспроизведён после взаимодействия');
                                // Удаляем все обработчики после первого воспроизведения
                                events.forEach(event => {
                                    document.removeEventListener(event, playOnce);
                                });
                            })
                            .catch(() => {});
                    };
                    
                    events.forEach(event => {
                        document.addEventListener(event, playOnce, { once: true, passive: true });
                    });
                });
        };
        
        // Несколько попыток с разными задержками
        attemptPlay(); // Сразу
        setTimeout(attemptPlay, 100);
        setTimeout(attemptPlay, 500);
        setTimeout(attemptPlay, 1000);
    }
}

// ============================================
// ВИДЕО ФОН
// ============================================

function initHeroVideo() {
    const heroVideo = document.getElementById('heroVideo');
    
    if (heroVideo) {
        // Проверяем, загружается ли видео
        heroVideo.addEventListener('loadeddata', function() {
            heroVideo.classList.add('loaded');
            console.log('Видео фон успешно загружен');
        });
        
        // Обработка ошибок загрузки видео (файл не найден)
        heroVideo.addEventListener('error', function() {
            console.log('Видео файл не найден, используется фоновое изображение');
            heroVideo.style.display = 'none';
        });
        
        // Проверка через 2 секунды - если видео не загрузилось, скрыть его
        setTimeout(() => {
            if (heroVideo.readyState === 0) {
                heroVideo.style.display = 'none';
                console.log('Видео не загрузилось, используется фоновое изображение');
            }
        }, 2000);
    }
}
