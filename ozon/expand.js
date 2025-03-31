// Функционал для раскрытия скрытых параграфов при клике на кнопку

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все карточки
    const cards = document.querySelectorAll('.card');
    
    // Для каждой карточки
    cards.forEach(card => {
        // Находим параграф
        const paragraph = card.querySelector('p');
        // Находим кнопку
        const button = card.querySelector('.card-button');
        
        // По умолчанию скрываем параграф
        paragraph.classList.add('card-paragraph-hidden');
        
        // Добавляем обработчик клика для кнопки
        button.addEventListener('click', function() {
            // Переключаем класс для анимации
            paragraph.classList.toggle('card-paragraph-expanded');
            
            // Меняем текст кнопки в зависимости от состояния
            if (paragraph.classList.contains('card-paragraph-expanded')) {
                button.textContent = 'Скрыть';
            } else {
                button.textContent = 'Подробнее';
            }
        });
    });
});