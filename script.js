// Функция добавления отзыва
function addReview() {
    const productName = document.getElementById('product-name').value;
    const reviewText = document.getElementById('review-text').value;

    if (productName && reviewText) {
        // Получаем или создаем массив отзывов для данного продукта
        const reviews = JSON.parse(localStorage.getItem(productName)) || [];
        
        // Добавляем новый отзыв
        reviews.push(reviewText);

        // Сохраняем обновленный массив в LocalStorage
        localStorage.setItem(productName, JSON.stringify(reviews));

        // Очищаем поля ввода
        document.getElementById('product-name').value = '';
        document.getElementById('review-text').value = '';

        // Обновляем список продуктов и отзывов
        displayProductList();
    } else {
        alert('Введите название продукта и отзыв.');
    }
}

// Функция отображения списка продуктов
function displayProductList() {
    const productList = document.getElementById('product-list');
    const reviewsContainer = document.getElementById('reviews-container');

    // Очищаем предыдущий список продуктов
    productList.innerHTML = '';
    reviewsContainer.innerHTML = '';

    // Получаем все ключи (названия продуктов) из LocalStorage
    const products = Object.keys(localStorage);

    // Отображаем список продуктов
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = product;
        listItem.onclick = () => displayReviews(product);
        productList.appendChild(listItem);
    });
}

// Функция отображения отзывов по выбранному продукту
function displayReviews(product) {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviews = JSON.parse(localStorage.getItem(product));

    // Очищаем предыдущие отзывы
    reviewsContainer.innerHTML = '';

    // Отображаем отзывы
    if (reviews && reviews.length > 0) {
        reviews.forEach((review, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.innerHTML = `<p>${review}</p><button onclick="deleteReview('${product}', ${index})">Удалить</button>`;
            reviewsContainer.appendChild(reviewItem);
        });
    } else {
        const noReviewsMessage = document.createElement('p');
        noReviewsMessage.textContent = 'Отзывов пока нет.';
        reviewsContainer.appendChild(noReviewsMessage);
    }
}

// Функция удаления отзыва
function deleteReview(product, index) {
    const reviews = JSON.parse(localStorage.getItem(product));

    // Удаляем выбранный отзыв
    reviews.splice(index, 1);

    // Обновляем LocalStorage
    localStorage.setItem(product, JSON.stringify(reviews));

    // Повторно отображаем отзывы
    displayReviews(product);
}

// Инициализация: отображение списка продуктов при загрузке страницы
displayProductList();
