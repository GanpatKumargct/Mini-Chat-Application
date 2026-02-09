const BASE_URL = "http://localhost:8080";


// ===== Signup =====
async function signup() {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(BASE_URL + "/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert("Signup successful");
        window.location.href = "login.html";
    } else {
        alert("Signup failed");
    }
}

// ===== Login =====
async function login() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        alert("Invalid login");
        return;
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    localStorage.setItem("email", email);

    window.location.href = "chat.html";
}









// ===== Logout =====
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}



// ===== Protect Chat Page =====
if (window.location.pathname.includes("chat.html")) {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
    } else {
        loadMessages();
        setInterval(loadMessages, 5000);

    }
}

async function loadMessages() {

    const token = localStorage.getItem("token");

    const response = await fetch(BASE_URL + "/messages", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (response.status === 401) {
        logout();
        return;
    }

    const messages = await response.json();

    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";

    messages.forEach(msg => {

    const div = document.createElement("div");

    div.classList.add("message");

    if(msg.sender.username === "YOUR_USERNAME"){
        div.classList.add("sent");
    } else {
        div.classList.add("received");
    }

    div.innerText = msg.sender.username + ": " + msg.content;

    messagesDiv.appendChild(div);
    });

}


// ===== Send Message =====
async function sendMessage() {

    const token = localStorage.getItem("token");
    const content = document.getElementById("messageInput").value;

    if (!content) return;

    const response = await fetch(BASE_URL + "/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ content })
    });

    if (response.status === 401) {
        logout();
        return;
    }

    document.getElementById("messageInput").value = "";
    loadMessages();
}

