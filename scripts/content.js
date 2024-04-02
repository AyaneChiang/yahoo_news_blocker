const news = [];

function Do() {
    let $articles = $("#Col1-10-NewsCollectionStream-0-Stream .js-stream-content");

    if ($articles.length > 0) {

        $.each($articles, function (index, article) {
            let title = $(article).find(".Cf > div." + $.escapeSelector("Ov(h)") + " > div." + $.escapeSelector("D(ib)"));
            if (title.length > 0) {
                let name = title.first().text();
                if (news.some(n => name.includes(n))) {
                    $(article).hide();
                    //$(article).css('background-color', 'red');
                }
            }
        })
    }
}

async function SetNews() {
    let isFirstTime = await readLocalStorage("hasDefaultSetting");
    console.log("isFirstTime: " + isFirstTime);
    if (!isFirstTime) {
        console.log("isFirstTime: " + isFirstTime);
        await chrome.storage.local.set({ "hasDefaultSetting": true });
        await chrome.storage.local.set({ "news": "TVBS; 中天; 三立; CTWANT" });
    }
    let words = await readLocalStorage("news");
    console.log("words: " + words);
    let array = words.replace("/\s", "").split(';').filter(n => n != '');
    array.forEach((a) => {
        news.push(a.trim());
    })
}

const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
            resolve(result[key]);
        });
    })
}

$(document).ready(async function () {
    await SetNews();
    Do();
    const targetNode = document.getElementById("Col1-10-NewsCollectionStream-0-Stream");
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    var obs = new MutationObserver(function (mutations, observer) {
        for (var i = 0; i < mutations[0].addedNodes.length; i++) {
            if (mutations[0].addedNodes[i].nodeType == 1) {
                Do();
            }
        }
    });
    obs.observe(targetNode, config);
});