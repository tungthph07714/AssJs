
$(document).ready(function() {
    // Lấy tất cả item-child
    var items = [];
    $('.item-list .item-child').each(function() {
        items.push('<div class="animate__zoomOutDown ' + $(this).attr('class') + '" data-group="' + $(this).data('group') + '">' + $(this).html() + '</div>');
    });

    // Sự kiện khi bấm vào bộ lọc
    $('.filter-link a').click(function (e) {
        e.preventDefault();
        var group = $(this).data('filter');
        $('.item-list .item-child').addClass('animate__faster animate__zoomOutDown');
        $('.item-list .item-child').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.item-list').html(''); // Làm trống nội dung
            
            // Lấy kết quả
            var result = '';
            for (var i = 0; i < items.length; i++) {
                if (items[i].includes('data-group="' + group + '"')) {
                    result += items[i];
                }
            };
            
            $('.item-list').html(result);
            $('.item-list .item-child').removeClass('animate__zoomOutDown').addClass('animate__fadeInUp');
        });
    });
});