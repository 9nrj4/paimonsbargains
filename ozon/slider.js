
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, существует ли элемент с классом 'swiper'
    if (document.querySelector('.swiper')) {
        // Создаем новый экземпляр Swiper
        const swiper = new Swiper('.swiper', {
            // Основные параметры
            slidesPerView: 6,         // Количество видимых слайдов
            spaceBetween: 280,         // Расстояние между слайдами (в px)
            loop: true,               // Бесконечная прокрутка
            
            // Кнопки навигации - связываем с кнопками из info-rightside
            navigation: {
                nextEl: '.swiper-button-next',    // Селектор кнопки "следующий слайд"
                prevEl: '.swiper-button-prev',    // Селектор кнопки "предыдущий слайд"
            },

            // Автоматическое центрирование активного слайда
            centeredSlides: true,
            
            // Активируем возможность использовать клавиатуру для навигации
            keyboard: {
                enabled: true,
            },
            
        });
        
        // Явно привязываем кнопки навигации
        document.querySelector('.info-rightside button:first-child').addEventListener('click', function() {
            swiper.slidePrev();
        });
        
        document.querySelector('.info-rightside button:last-child').addEventListener('click', function() {
            swiper.slideNext();
        });
    } else {
        console.error('Элемент с классом .swiper не найден на странице');
    }
});