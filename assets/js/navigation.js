function addRipple(event, button) {
    button.find(".ripple").remove();

    let circle = $('<span class="ripple"></span>');

    const diameter = Math.max(button.innerWidth(), button.innerHeight());
    const radius = diameter / 2;

    circle.css("width", diameter + "px");
    circle.css("height", diameter + "px");
    
    circle.css("left", `${event.clientX - (button.offset().left + radius)}px`);
    circle.css("top", `${event.clientY - (button.offset().top + radius)}px`);

    button.append(circle);
}

function navigate(href) {
    let button = $("a[href=\"" + href + "\"]");
    $("nav a").removeClass("active");
    button.addClass("active");

    history.pushState(null, null, href);
}

$(function() {
    $("nav a:not(#account-button)").on('click', function(e) {
        addRipple(e, $(this));
        $("nav.utility").removeClass("show");
        navigate($(this).attr("href"));
        return false;
    });

    $("#account-button").on('click', function(e) {
        addRipple(e, $(this));
        $("nav.utility").toggleClass("show");
        return false;
    });

    // handle refreshing on a non / URL.

    let path = window.location.pathname;

    $(`a[href="${path}"]`).addClass("active");
});