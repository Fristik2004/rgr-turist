$(document).ready(function() {
    var folderPath = '/img/';
    let swiper = new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
            spaceBetween: 50,
        },
    });
    $("#section1").addClass("active");

    // Обработка кликов по ссылкам навигации
    $("nav a").click(function(e) {
        e.preventDefault(); // Отменить стандартное действие ссылки

        var target = $(this).attr("href"); // Получить значение атрибута href

        // Скрыть все разделы и показать только целевой раздел
        $("section").removeClass("active");
        $(target).addClass("active");
    });
    var serverURL = '/img';

    // Функція для завантаження зображень з сервера
    function loadImages() {
        $.ajax({
            url: serverURL,
            success: function(data) {
                // Додавання зображень до галереї
                var gallery = $('#image-gallery');
                $.each(data, function(index, image) {
                    var imageURL = '/public/' + image;
                    var imageHTML = '<div class="col-md-4"><img src="' + imageURL + '" class="img-fluid"></div>';
                    gallery.append(imageHTML);
                });
            },
            error: function() {
                console.error('Помилка завантаження зображень');
            }
        });
    }

    // Завантаження зображень при завантаженні сторінки
    loadImages();
});