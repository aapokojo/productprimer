function initHtml() {
    document.body.insertAdjacentHTML('afterbegin', '<button id="menu-button" onclick="toggleMenu()">☰</button>');
    document.body.insertAdjacentHTML('afterbegin', '<div class="overlay" id="overlay" onclick="toggleMenu()"></div>');
    
    document.getElementById("toc").insertAdjacentHTML('afterbegin', 
        '<h3><a href="index.html#starterguide" onclick="toggleMenu()">Product Primer</a></h3>'
        + '<h4>Contents</h4>'
        + '<div><a href="index.html#introduction" onclick="toggleMenu()">Introduction</a></div>'
        + '<div><a href="index.html#whatisproductwork" onclick="toggleMenu()">What is "Product" work?</a></div>'
        + '<div><a href="index.html#abouttheauthor" onclick="toggleMenu()">About the Author</a></div>'
        + '<hr/>'
        + '<h3><a href="purpose.html#purpose" onclick="toggleMenu()">What is the purpose of the product?</a></h3>'
        + '<h4>Finding the key value proposition</h4>'
        + '<div><a href="purpose.html#users" onclick="toggleMenu()">From user needs to market understanding</a></div>'
        + '<div><a href="purpose.html#uniquvalueprop" onclick="toggleMenu()">Finding the Unique Value Proposition</a></div>'
        + '<div><a href="purpose.html#keytakeawayspurpose" onclick="toggleMenu()">Key Takeaways</a></div>'
        + '<hr/>'
        + '<h3><a href="strategy.html#strategy" onclick="toggleMenu()">How to build a great product?</a></h3>'
        + '<h4>Turning Purpose into Practice</h4>'
        + '<div><a href="strategy.html#ways" onclick="toggleMenu()">Key Questions for Building Your Product Strategy</a></div>'
        + '<div><a href="strategy.html#keytakeawaysstrategy" onclick="toggleMenu()">Key Takeaways</a></div>'
        + '<hr/>'
        + '<h3><a href="tactics.html#tactics" onclick="toggleMenu()">What to build</a></h3>'
        + '<h4>Solving users problems</h4>'
        + '<div><a href="tactics.html#building" onclick="toggleMenu()">Building Meaningful Solutions</a></div>'
        + '<div><a href="tactics.html#keytakeawaystactics" onclick="toggleMenu()">Key Takeaways</a></div>'
        + '<hr/>'
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