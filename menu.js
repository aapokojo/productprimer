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