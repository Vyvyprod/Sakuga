# 🔌 Интеграции для сайта Sakuga

Это руководство по интеграции дополнительных сервисов для улучшения функциональности сайта.

## 📊 Google Analytics

### Установка

Добавьте код перед закрывающим тегом `</head>` в `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Замените `GA_MEASUREMENT_ID` на ваш ID из Google Analytics.

### Отслеживание событий

В `js/app.js` добавьте отслеживание важных действий:

```javascript
// Клик по кнопке "Забронировать стол"
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': 'Забронировать стол'
        });
    });
});

// Отправка формы
function submitForm(form) {
    // ... существующий код
    gtag('event', 'submit', {
        'event_category': 'Form',
        'event_label': 'Контактная форма'
    });
}
```

## 🗺️ Google Maps

### Добавление карты

В `index.html`, после контактной информации:

```html
<div class="map-container">
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.!2d129.733!3d62.028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjLCsDAxJzQwLjgiTiAxMjnCsDQzJzU4LjgiRQ!5e0!3m2!1sru!2sru!4v1234567890123!5m2!1sru!2sru"
        width="100%" 
        height="450" 
        style="border:0; border-radius: 10px;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
</div>
```

**CSS для карты:**
```css
.map-container {
    margin-top: 40px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
}
```

**Как получить код карты:**
1. Откройте [Google Maps](https://www.google.com/maps)
2. Найдите ваш ресторан
3. Нажмите "Поделиться" → "Встроить карту"
4. Скопируйте код

## 💬 Онлайн-чат

### Jivosite

Добавьте перед `</body>` в `index.html`:

```html
<!-- Jivosite -->
<script>
(function(){ 
    var widget_id = 'YOUR_WIDGET_ID';
    var d=document;
    var w=window;
    function l(){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//code.jivosite.com/script/widget/'+widget_id;
        var ss = document.getElementsByTagName('script')[0];
        ss.parentNode.insertBefore(s, ss);
    }
    if(d.readyState=='complete'){l();}
    else{if(w.attachEvent){w.attachEvent('onload',l);}
    else{w.addEventListener('load',l,false);}}
})();
</script>
```

### Carrot Quest

```html
<script type="text/javascript">
!function(){
    function t(t,e){
        return function(){
            window.carrotquestasync.push(t,arguments)
        }
    }
    if("undefined"==typeof carrotquest){
        var e=document.createElement("script");
        e.type="text/javascript",
        e.async=!0,
        e.src="//cdn.carrotquest.app/api.min.js",
        document.getElementsByTagName("head")[0].appendChild(e),
        window.carrotquest={},
        window.carrotquestasync=[],
        carrotquest.settings={};
        for(var n=["connect","track","identify","auth","oth","onReady","addCallback","removeCallback","trackMessageInteraction"],a=0;a<n.length;a++)
            carrotquest[n[a]]=t(n[a])
    }
}(),
carrotquest.connect("YOUR_APP_ID");
</script>
```

## 📞 Обратный звонок

### Calltouch

```html
<script>
(function(w,d,c,h,i,t,s){
    w['_ctm']=c;
    w[c]=w[c]||function(){
        (w[c].q=w[c].q||[]).push(arguments)
    };
    w[c].l=1*new Date();
    t=d.createElement(h);
    s=d.getElementsByTagName(h)[0];
    t.async=1;
    t.src=i;
    s.parentNode.insertBefore(t,s);
})(window,document,'ct','script','https://mod.calltouch.ru/init.js');

ct('create','YOUR_SITE_ID');
</script>
```

## 📧 Email рассылки

### Mailchimp интеграция

Добавьте форму подписки в футер (`index.html`):

```html
<div class="newsletter">
    <h3>Подпишитесь на новости</h3>
    <p>Узнавайте первыми о новых блюдах и акциях</p>
    <form action="https://yoursite.us1.list-manage.com/subscribe/post?u=YOUR_USER_ID&id=YOUR_LIST_ID" 
          method="post" 
          class="newsletter-form">
        <input type="email" 
               name="EMAIL" 
               placeholder="Ваш email" 
               required>
        <button type="submit" class="btn btn-primary">Подписаться</button>
    </form>
</div>
```

**CSS:**
```css
.newsletter {
    background: rgba(220, 20, 60, 0.1);
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 40px;
}

.newsletter h3 {
    font-family: var(--font-heading);
    color: var(--color-primary);
    margin-bottom: 10px;
}

.newsletter-form {
    display: flex;
    gap: 10px;
    max-width: 500px;
    margin: 20px auto 0;
}

.newsletter-form input {
    flex: 1;
    padding: 12px 20px;
    border: 2px solid var(--color-gray);
    border-radius: 50px;
    font-size: 1rem;
}

.newsletter-form button {
    white-space: nowrap;
}
```

## 💳 Онлайн-оплата

### Stripe

**HTML для кнопки оплаты:**
```html
<button id="checkout-button" class="btn btn-primary">Оплатить онлайн</button>
```

**JavaScript (добавьте в `js/app.js`):**
```javascript
// Подключите Stripe SDK в <head>
// <script src="https://js.stripe.com/v3/"></script>

const stripe = Stripe('YOUR_PUBLISHABLE_KEY');

document.getElementById('checkout-button').addEventListener('click', async () => {
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
    });
    
    const session = await response.json();
    
    const result = await stripe.redirectToCheckout({
        sessionId: session.id
    });
    
    if (result.error) {
        alert(result.error.message);
    }
});
```

### ЮKassa (для России)

```html
<script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>

<script>
const checkout = new window.YooMoneyCheckoutWidget({
    confirmation_token: 'YOUR_CONFIRMATION_TOKEN',
    return_url: 'https://yoursite.com/success',
    error_callback: function(error) {
        console.log(error);
    }
});

checkout.render('payment-form');
</script>

<div id="payment-form"></div>
```

## 📱 Социальные сети

### Instagram Feed

**Плагин Instafeed.js:**

```html
<!-- В <head> -->
<script src="https://cdn.jsdelivr.net/npm/instafeed.js@2.0.0/dist/instafeed.min.js"></script>

<!-- В футере добавьте секцию -->
<div class="instagram-feed">
    <h3>Мы в Instagram</h3>
    <div id="instafeed"></div>
</div>

<script>
var feed = new Instafeed({
    accessToken: 'YOUR_ACCESS_TOKEN',
    limit: 6,
    template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
});
feed.run();
</script>
```

**CSS:**
```css
.instagram-feed {
    padding: 60px 0;
    text-align: center;
}

#instafeed {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    margin-top: 30px;
}

#instafeed img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.3s;
}

#instafeed img:hover {
    transform: scale(1.05);
}
```

### VK Widget

```html
<div id="vk_groups"></div>
<script type="text/javascript" src="https://vk.com/js/api/openapi.js?169"></script>

<script type="text/javascript">
VK.Widgets.Group("vk_groups", {
    mode: 3,
    width: "auto",
    height: "400"
}, YOUR_GROUP_ID);
</script>
```

## 🍽️ Система бронирования

### Integromeal (для ресторанов)

```html
<div id="reservation-widget"></div>

<script>
(function(w,d,s,o,r,js,fjs){
    w[r]=w[r]||function(){
        (w[r].q=w[r].q||[]).push(arguments)
    };
    js=d.createElement(s);
    fjs=d.getElementsByTagName(s)[0];
    js.id=o;
    js.src='https://integromeal.com/widget.js';
    js.async=1;
    fjs.parentNode.insertBefore(js,fjs);
}(window,document,'script','integromeal-jssdk','IM'));

IM('init', {
    restaurantId: 'YOUR_RESTAURANT_ID',
    container: 'reservation-widget'
});
</script>
```

### Собственная система бронирования

**Расширенная форма в `index.html`:**
```html
<div class="reservation-widget">
    <h3>Забронировать стол</h3>
    <form id="reservationForm">
        <input type="text" name="name" placeholder="Ваше имя" required>
        <input type="tel" name="phone" placeholder="Телефон" required>
        <input type="date" name="date" required>
        <select name="time" required>
            <option value="">Выберите время</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
        </select>
        <select name="guests" required>
            <option value="">Количество гостей</option>
            <option value="1">1 гость</option>
            <option value="2">2 гостя</option>
            <option value="3">3 гостя</option>
            <option value="4">4 гостя</option>
            <option value="5+">5+ гостей</option>
        </select>
        <button type="submit" class="btn btn-primary">Забронировать</button>
    </form>
</div>
```

## 📊 Яндекс.Метрика

```html
<!-- Яндекс.Метрика -->
<script type="text/javascript">
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){
        (m[i].a=m[i].a||[]).push(arguments)
    };
    m[i].l=1*new Date();
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],
    k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(YOUR_COUNTER_ID, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true
});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/YOUR_COUNTER_ID" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```

## 🔔 Push-уведомления

### OneSignal

```html
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
window.OneSignal = window.OneSignal || [];
OneSignal.push(function() {
    OneSignal.init({
        appId: "YOUR_APP_ID",
        notifyButton: {
            enable: true,
        }
    });
});
</script>
```

## 🌟 Отзывы клиентов

### Google Reviews

```html
<div class="reviews-section">
    <h2>Отзывы наших гостей</h2>
    <div id="google-reviews"></div>
</div>

<!-- Используйте плагин или API Google Places -->
<script src="https://cdn.jsdelivr.net/npm/google-places-reviews@1.0.0/dist/google-places-reviews.min.js"></script>
<script>
new GoogleReviews({
    placeId: 'YOUR_PLACE_ID',
    render: ['reviews'],
    minRating: 4,
    maxRows: 3
});
</script>
```

## 🎁 Программа лояльности

### Создание собственной системы

**HTML:**
```html
<div class="loyalty-banner">
    <h3>🎁 Программа лояльности</h3>
    <p>Получите скидку 10% на второй заказ!</p>
    <button class="btn btn-primary" onclick="showLoyaltyForm()">Присоединиться</button>
</div>
```

**JavaScript:**
```javascript
function showLoyaltyForm() {
    // Показать модальное окно с формой регистрации
    // Или перенаправить на страницу регистрации
}
```

## ☎️ Интеграция с CRM

### AmoCRM

```html
<script>
(function(a,m,o,c,r,m){
    a[m]={id:"YOUR_ACCOUNT_ID",hash:"YOUR_HASH",locale:"ru"};
    a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};
    var d=c.getElementsByTagName("script")[0],s=c.createElement("script");
    s.async=true;s.id=m+"_script";
    s.src="https://forms.amocrm.ru/forms/assets/js/amoforms.js?1234567890";
    d.parentNode.insertBefore(s,d);
}(window,0,"amoForms",document,0,"amf"));
</script>
```

## 📦 Доставка

### Интеграция с сервисами доставки

**Яндекс.Еда / Delivery Club:**
- Добавьте кнопки быстрого заказа:

```html
<div class="delivery-buttons">
    <a href="https://eda.yandex.ru/restaurant/YOUR_ID" class="delivery-btn yandex">
        Заказать на Яндекс.Еде
    </a>
    <a href="https://deliveryclub.ru/YOUR_ID" class="delivery-btn dc">
        Заказать на Delivery Club
    </a>
</div>
```

---

## 💡 Рекомендации по интеграциям

1. **Не перегружайте сайт** - выбирайте только нужные интеграции
2. **Тестируйте скорость** - каждая интеграция замедляет загрузку
3. **Используйте async/defer** - для асинхронной загрузки скриптов
4. **Проверяйте мобильную версию** - некоторые виджеты плохо работают на смартфонах
5. **GDPR/Cookies** - не забудьте про согласие на обработку данных

---

Успехов с интеграциями! 🚀
