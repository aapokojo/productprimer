function initHtml() {
    document.body.insertAdjacentHTML('afterbegin', '<button id="menu-button" onclick="toggleMenu()">☰</button>');
    document.body.insertAdjacentHTML('afterbegin', '<div class="overlay" id="overlay" onclick="toggleMenu()"></div>');
    
    document.getElementById("toc").insertAdjacentHTML('afterbegin', 
        '<h2>Chapters</h2>'
        + '<hr/>'
        + '<a href="index.html#starterguide" onclick="toggleMenu()"><h3>Product Primer</h3>'
        + '<h4>Introduction</h4></a>'
        + '<hr/>'
        + '<a href="purpose.html#purpose" onclick="toggleMenu()"><h3>What is the purpose of the product?</h3>'
        + '<h4>Finding the key value proposition</h4></a>'
        + '<hr/>'
        + '<a href="strategy.html#strategy" onclick="toggleMenu()"><h3>Keep your focus in the right things</h3>'
        + '<h4>Turning Purpose into Practice</h4></a>'
        + '<hr/>'
        + '<a href="tactics.html#tactics" onclick="toggleMenu()"><h3>What to build</h3>'
        + '<h4>Solving users problems</h4></a>'
        + '<hr/>'
        + '<a href="summary.html" onclick="toggleMenu()"><h3>Summary</h3>'
        + '<h4>Rinse and Repeat</h4></a>'
        + '<hr/>'        
        + '<br/>'  
    );

    document.body.insertAdjacentHTML('beforeend', '<div class="footer">Product Primer | <a href="mailto:aapo@productprimer.com">aapo@productprimer.com</a></div>');
}

function toggleMenu() {
    var toc = document.getElementById("toc");
    var overlay = document.getElementById("overlay");
    var body = document.body;
    if (toc.style.left === "0px") {
        toc.style.left = "-250px";
        overlay.style.display = "none";
        body.style.overflow = "";
    } else {
        toc.style.left = "0px";
        overlay.style.display = "block";
        body.style.overflow = "hidden";
    }
}