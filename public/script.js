$(document).ready(function() {
    var folderPath = '/img/';
    let swiper = new Swiper(".mySwiper", {
        pagination: {
            el: ".swiper-pagination",
            spaceBetween: 50,
        },
    });

    $("#section1").addClass("active");
    $("nav a").click(function(e) {
        e.preventDefault();
        var target = $(this).attr("href");
        $("section").removeClass("active");
        $(target).addClass("active");
    });

    var serverURL = '/img';
    function loadImages() {
        $.ajax({
            url: serverURL,
            success: function(data) {
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
    loadImages();
});