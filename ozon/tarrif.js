document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.top-right button');
    const tariffBlocks = document.querySelectorAll('.tarriff-header');
    
    // Данные о тарифах для разных периодов
    const tariffData = {
        "Неделя": {
            "Basic": { price: "2900 р.", text: "В неделю за 1 сайт" },
            "Expert": { price: "3900 р.", text: "В неделю за 1 сайт" },
            "Enterprise": { price: "5900 р.", text: "В неделю за 1 сайт" }
        },
        "Месяц": {
            "Basic": { price: "9900 р.", text: "В месяц за 1 сайт" },
            "Expert": { price: "12900 р.", text: "В месяц за 1 сайт" },
            "Enterprise": { price: "21900 р.", text: "В месяц за 1 сайт" }
        },
        "3 месяца": {
            "Basic": { price: "26900 р.", text: "За 3 месяца за 1 сайт" },
            "Expert": { price: "34900 р.", text: "За 3 месяца за 1 сайт" },
            "Enterprise": { price: "59900 р.", text: "За 3 месяца за 1 сайт" }
        },
        "6 месяцев": {
            "Basic": { price: "49900 р.", text: "За 6 месяцев за 1 сайт" },
            "Expert": { price: "64900 р.", text: "За 6 месяцев за 1 сайт" },
            "Enterprise": { price: "109900 р.", text: "За 6 месяцев за 1 сайт" }
        },
        "Год": {
            "Basic": { price: "89900 р.", text: "В год за 1 сайт" },
            "Expert": { price: "119900 р.", text: "В год за 1 сайт" },
            "Enterprise": { price: "199900 р.", text: "В год за 1 сайт" }
        }
    };
    
    // Функция для обновления цен и текста
    function updatePrices(period) {
        tariffBlocks.forEach(block => {
            const tariffName = block.querySelector('h3').textContent;
            const priceElements = block.querySelectorAll('.price p');
            const periodText = block.querySelector('.th-right > p');
            
            // Проверяем, есть ли данные для этого тарифа
            if (tariffData[period] && tariffData[period][tariffName]) {
                const newPrice = tariffData[period][tariffName].price;
                const newText = tariffData[period][tariffName].text;
                
                // Обновляем цены (оба элемента p внутри .price)
                priceElements.forEach(p => {
                    p.textContent = newPrice;
                });
                
                // Обновляем текст периода
                periodText.textContent = newText;
            }
        });
    }
    
    // Обработчик клика по кнопке
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');
            
            // Обновляем цены и текст на основе выбранного периода
            updatePrices(button.textContent);
        });
    });

    buttons[1].classList.add('active');
    updatePrices('Месяц');
});