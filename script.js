function openGift() {
    let giftBox = document.querySelector(".gift-box");
    let content = document.getElementById("content");
    let emailContainer = document.getElementById("emailContainer");

    // Hide the gift box with scale effect
    giftBox.style.transform = "scale(0)";

    setTimeout(() => {
        giftBox.style.display = "none";
        content.style.display = "block";
        content.style.opacity = "1"; // Smooth fade-in effect
        displayLoveQuotes();
        createHeartEffect();
        emailContainer.style.display = "block";
    }, 500);
}

function displayLoveQuotes() {
    const quotes = [
        "You make my heart smile every day. 😊❤️",
        "My love for you grows stronger every second. 💕",
        "You are my sunshine on the darkest days. ☀️",
        "Every heartbeat whispers your name. ❤️",
        "Life is beautiful because I have you. 🌸"
    ];
    const loveMessage = document.getElementById("loveMessage");
    loveMessage.innerText = quotes[Math.floor(Math.random() * quotes.length)];
}

function createHeartEffect() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            let heart = document.createElement("div");
            heart.className = "heart";
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * window.innerWidth + "px";
            heart.style.bottom = "0px";
            heart.style.fontSize = Math.random() * 30 + 10 + "px";
            heart.style.position = "fixed";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }
}
