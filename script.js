function initHtml() {
    document.body.insertAdjacentHTML('afterbegin', '<button id="menu-button" onclick="toggleMenu()">☰</button>');
    document.body.insertAdjacentHTML('afterbegin', '<div class="overlay" id="overlay" onclick="toggleMenu()"></div>');
    
    document.getElementById("toc").insertAdjacentHTML('afterbegin', 
        '<h2>Chapters</h2>'
        + '<hr/>'
        + '<a href="index.html" onclick="toggleMenu()"><h3>Product Primer</h3>'
        + '<h4>Introduction</h4></a>'
        + '<hr/>'
        + '<a href="why.html" onclick="toggleMenu()"><h3>Why - The Purpose of the Product</h3>'
        + '<h4>Finding the Key Value Proposition</h4></a>'
        + '<hr/>'
        + '<a href="how.html" onclick="toggleMenu()"><h3>How - Keep Focus in the Right Things</h3>'
        + '<h4>Turning Purpose into Practice with a Sound Strategy</h4></a>'
        + '<hr/>'
        + '<a href="what.html" onclick="toggleMenu()"><h3>What - Building Meaningful Solutions</h3>'
        + '<h4>Solving for Users Problems</h4></a>'
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