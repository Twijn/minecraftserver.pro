function parseServer(server) {
    let online = server.status?.latency ? true : false;
return `<div class="server">
    <figure class="card-header" style="background-image: url('${server.logoUrl}');">
        <div class="blur"></div>
        <div class="badges">
            <div class="badge badge-invert ping"><i class="fa-solid fa-timer"></i> ${online ? server.averageLatency.toFixed(1) + "ms" : "Offline"}</div>
            <div class="badge status ${online ? "on" : "off"}line"><i class="fa-solid fa-user"></i> ${online ? comma(server.status.players.current) : "0"}</div>
        </div>
        <img src="${server.logoUrl}" alt="Favicon for ${server.name}">
    </figure>
    <section class="description">
        <h3>${server.name}</h3>
        <div class="tags"><span class="tag tag-highlight">1.8 - 1.18</span><span class="tag">Minigames</span></div>
        <p>${server.description}</p>
        <div class="ip-block"><span class="ip copy-container">${server.ip.host}${server.ip.port != 25565 ? ':' + server.ip.port : ""}</span><a href="#" class="copy" aria-label="Copy to Clipboard"><i class="fa-regular fa-copy"></i></a></div>
    </section>
</div>`;
}

function getTopServers() {
    return new Promise((resolve, reject) => {
        api.get("servers/top", data => {
            if (data.success) {
                let result = "";
                data.data.forEach(server => {
                    result += parseServer(server);
                });
                resolve(result);
            } else reject(data.error);
        });
    });
}
getTopServers().then(servers => {
    $("#server-directory-results").html(servers);
}, console.error);

function getServers() {

}

function copy(selector){
    var temp = $("<div>");
    $("body").append(temp);
    temp.attr("contenteditable", true)
        .html($(selector).html()).select()
        .on("focus", function() { document.execCommand('selectAll',false,null); })
        .focus();
    document.execCommand("copy");
    temp.remove();
}

$(function() {
    $(".copy").click(function() {
        let ele = $(this);
        ele.addClass("copied");
        setTimeout(function() {ele.removeClass("copied")}, 1000);
        copy(ele.parent().find(".copy-container"));
        return false;
    });
});