// Initialize parts as variable
const mainSection = document.querySelectorAll("ytd-rich-item-renderer");
const videos = document.querySelectorAll("ytd-rich-grid-media");
const shorts = document.querySelectorAll("ytd-rich-grid-slim-media");
const ad = document.querySelectorAll("ytd-display-ad-renderer");

// Function to apply blur on videos
let applyBlur = (videoElements) => {
    videoElements.forEach((element) => {
        element.style.pointerEvents = "none";
        element.style.textDecoration = "none";
        element.style.filter = "blur(10px)";
    });
};

// Function to remove blur from videos
let removeBlur = (videoElements) => {
    videoElements.forEach((element) => {
        element.style.pointerEvents = "auto";
        element.style.textDecoration = "initial";
        element.style.filter = "blur(0px)";
    });
};

// Blur all videos
let hideAllVideos = () => {
    if (ad.length > 0){
        ad[0].style.pointerEvents = "none";
        ad[0].style.textDecoration = "none";
        ad[0].style.filter = "blur(10px)";
    }
    // Prevent "cacmologim" from clicking on videos
    mainSection.forEach((element) => {
        element.style.cursor = "not-allowed";
    });

    applyBlur(mainSection);
    applyBlur(videos);
    applyBlur(shorts);
};

// "Turn ON" the blur on content
const blurON = () => {
    hideAllVideos();
};

// "Turn OFF" the blur on content
const blurOFF = () => {
    if (ad.length > 0){
        ad[0].style.pointerEvents = "auto";
        ad[0].style.textDecoration = "initial";
        ad[0].style.filter = "blur(0px)";
    }
    removeBlur(mainSection);
    removeBlur(videos);
    removeBlur(shorts);
    
    if (unblurNewVideos) {
        const newVideos = document.querySelectorAll("ytd-rich-grid-media, ytd-rich-grid-slim-media");
        removeBlur(newVideos);
    }
};



// Initialize MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
            // New nodes added, check if they are videos and apply blur
            const newVideos = [];
            mutation.addedNodes.forEach((node) => {
                if (node.matches && (node.matches("ytd-rich-grid-media") || node.matches("ytd-rich-grid-slim-media"))) {
                    newVideos.push(node);
                }
            });
            if (newVideos.length > 0) {
                applyBlur(newVideos);
            }
        }
    });
});

// Observe changes in the entire document subtree
observer.observe(document, { childList: true, subtree: true });

const init = () => {
    chrome.storage.sync.get("hide", (data) => {
        if (data.hide) {
            blurON();
        } else {
            blurOFF();
        }
    });
};

// Incoming message from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "hideVids") {
        blurON();
    } else if (request.command === "showVids") {
        blurOFF();
    } else {
        init();
    }
    sendResponse({ result: "success" });
});

window.addEventListener("load", () => {
    init();
});

