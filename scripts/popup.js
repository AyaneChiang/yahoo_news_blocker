
$(document).ready(function () {
    LoadSetting();

    $("#save").on('click', function () {
        let data = $("#news").val();
        chrome.storage.local.set({ "news": data });
    });
});

function LoadSetting() {
    chrome.storage.local.get(["news"], function (items) {
        $("#news").val(items.news);
    });
}