const news = ["三立新聞網", "CTWANT"];

function Do(){
    let $articles = $("#Col1-10-NewsCollectionStream-0-Stream .js-stream-content");
    
    if ($articles.length > 0) {
    
        $.each($articles, function(index, article){
            let title = $(article).find(".Cf > div." + $.escapeSelector("Ov(h)") + " > div."+$.escapeSelector("D(ib)"));
            if(title.length > 0){
                let name = title.first().text();
                if(news.some(n=>name.includes(n)))
                {
                    $(article).hide();
                    //$(article).css('background-color','red');
                }
            }
        })
    }
}

$(document).ready(function() {
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