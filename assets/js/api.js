const API_URI = "https://api.minecraftserver.pro/";
const COOKIE_DOMAIN = ""; //setlater


// https://stackoverflow.com/questions/1599287/create-read-and-erase-cookies-with-jquery
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";               

    document.cookie = name + "=" + value + expires + "; path=/; domain=" + COOKIE_DOMAIN;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function comma(x) {
    if (!x) return "";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const api = {
    get: function(uri, callback) {
        $.ajax({
            type: "GET",
            url: API_URI + uri,
            headers: {
                "Authorization": readCookie("session")
            },
            success: callback,
            statusCode: {
                401: function(){
                    createCookie("return_uri", window.location.href, .1);
                    window.location = "https://minecraftserver.pro/login"; //TODO:Replace this
                }
            },
        });
    }
}