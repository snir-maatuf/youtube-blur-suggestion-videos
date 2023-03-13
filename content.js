
// Initialize parts as variable
const mainSection = document.querySelectorAll("ytd-rich-item-renderer");
const videos = document.querySelectorAll("ytd-rich-grid-media");
const shorts = document.querySelectorAll("ytd-rich-grid-slim-media");
const ad = document.querySelectorAll("ytd-display-ad-renderer");


// Blur this Values
let hideAllVideos = function () {
    if (ad.length > 0){
        ad[0].style.pointerEvents = "none";
        ad[0].style.textDecoration = "none";
        ad[0].style.filter = "blur(10px)";
    }
    // Prevent "cacmologim" from clicking on videos
    for ( let i = 0; i < mainSection.length; i++) {
        mainSection[i].style.cursor = "not-allowed";
    }

    // Video part
    for ( let i = 0; i < videos.length; i++) {
        videos[i].style.pointerEvents = "none";
        videos[i].style.textDecoration = "none";
        videos[i].style.filter = "blur(10px)";
    }
    // Shorts part
    for ( let i = 0; i < shorts.length; i++) {
        shorts[i].style.pointerEvents = "none";
        shorts[i].style.textDecoration = "none";
        shorts[i].style.filter = "blur(10px)";
    }
}
// "Turn ON" the blur on content
let blurON = function () {
    hideAllVideos();
}
let blurOFF = function () {
    if (ad.length > 0){
        ad[0].style.pointerEvents = "auto";
        ad[0].style.textDecoration = "initial";
        ad[0].style.filter = "blur(0px)";
    }
    for ( let i = 0; i < mainSection.length; i++) {
        mainSection[i].style.cursor = "default";
    }
    for ( let i = 0; i < videos.length; i++) {
        videos[i].style.pointerEvents = "auto";
        videos[i].style.textDecoration = "initial";
        videos[i].style.filter = "blur(0px)";
    }
    for ( let i = 0; i < shorts.length; i++) {
        shorts[i].style.pointerEvents = "auto";
        shorts[i].style.textDecoration = "initial";
        shorts[i].style.filter = "blur(0px)";
    }
}


let init = function () {
    chrome.storage.sync.get("hide", function (data) {
        if (data.hide) {
            blurON();
        } else {
            blurOFF();
        }
    });
};

//Incoming message from popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === "hideVids") {
        blurON();
    } else if (request.command === "showVids") {
        blurOFF();
    } else {
        init();
    }
    sendResponse({ result: "success" });
});

window.addEventListener("load", (event) => {
    init();
});

window.addEventListener("scroll", () => {
    init();
});


