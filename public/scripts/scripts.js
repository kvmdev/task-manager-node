document.querySelectorAll("#nav button").forEach(button => {
    button.addEventListener("click", ()=> {
        window.location.href = button.dataset.method;
    });
});

/* document.querySelector("#input-logout").addEventListener("click", async ()=> {
    const response = await fetch("/logout");
    const data = await response.json();

    if(response.ok) {
        window.location.href = "/login";
    } else {
        alert(data.message);
    }
}); */