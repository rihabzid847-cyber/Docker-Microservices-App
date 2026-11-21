
const API_URL = "http://localhost:3000";

async function loadMessages() {

    const response = await fetch(`${API_URL}/messages`);

    const messages = await response.json();

    const list = document.getElementById("messages");

    list.innerHTML = "";

    messages.forEach(message => {

        const li = document.createElement("li");

        li.textContent = message;

        list.appendChild(li);

    });
}

async function addMessage() {

    const input = document.getElementById("message");

    const message = input.value.trim();

    if (!message) {
        alert("Veuillez écrire un message !");
        return;
    }

    const response = await fetch(`${API_URL}/messages`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ message: message })

    });

    if (response.ok) {

        input.value = "";

        loadMessages();

    } else {

        alert("Erreur lors de l'ajout du message");

    }
}

loadMessages();
