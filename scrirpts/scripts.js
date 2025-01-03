// Toggle expanded image view
function toggleImage(imageId, event) {
    event.stopPropagation();
    const expandedImages = document.querySelectorAll('.expanded-image-container');
    expandedImages.forEach(img => img.classList.remove('active'));

    const targetImage = document.getElementById(imageId);
    targetImage.classList.toggle('active');
    stopSound();
}

// Play sound when the area is clicked
function playSound(soundId, event) {
    event.preventDefault();
    event.stopPropagation();
    stopSound();

    const audio = document.getElementById(soundId);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

// Stop sound
function stopSound() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

// Close expanded image when clicking outside
window.addEventListener('click', function(event) {
    const expandedImage = document.querySelector('.expanded-image-container.active');
    if (expandedImage && !expandedImage.contains(event.target)) {
        expandedImage.classList.remove('active');
        stopSound();
    }
});

// Show lyrics for a selected song
function showLyrics(song) {
    const allLyrics = document.querySelectorAll('.lyrics');
    allLyrics.forEach(lyric => lyric.style.display = 'none');

    const selectedLyrics = document.getElementById(song + '-lyrics');
    if (selectedLyrics) {
        selectedLyrics.style.display = 'block';
    }

    if (song === 'song1') {
        fetch('./lyrics/song1-lyrics.txt')
            .then(response => response.text())
            .then(data => {
                selectedLyrics.querySelector('p').innerText = data;
            })
            .catch(error => console.error('Error fetching lyrics:', error));
    }

    const lyricsPanel = document.getElementById('lyrics-panel');
    lyricsPanel.style.display = 'block';
}

// Close the lyrics panel
function closeLyricsPanel() {
    const lyricsPanel = document.getElementById('lyrics-panel');
    lyricsPanel.style.display = 'none';
}
// Function to toggle mute for all audio elements
function toggleMute() {
    const audioElements = document.querySelectorAll('audio');
    let isMuted = false;

    // Check if any audio is currently muted
    if (audioElements.length > 0) {
        isMuted = audioElements[0].muted;
    }

    // Toggle mute state for all audio elements
    audioElements.forEach(audio => {
        audio.muted = !isMuted;
    });

    // Update button text
    const muteButton = document.getElementById('mute-button');
    muteButton.textContent = isMuted ? 'Mute' : 'Unmute';
}
function updateAreaCoordinates() {
    const image = document.getElementById('paper-arsenal-image');
    const map = document.querySelector('map[name="image-map1"]');
    const areas = map.querySelectorAll('area');
    
    // Get image dimensions
    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;

    // Define the original coordinates of the areas (as per your original map)
    const originalCoords = [
        { shape: "rect", coords: [4, 61, 266, 82] }, // Manu
        { shape: "rect", coords: [4, 100, 266, 121] }, // Fox
        { shape: "rect", coords: [4, 139, 266, 160] }, // Lotte
        { shape: "rect", coords: [4, 178, 266, 199] }, // Codina
        { shape: "rect", coords: [4, 217, 266, 238] }, // Williamson
        { shape: "rect", coords: [4, 256, 266, 277] }, // Catley
        { shape: "rect", coords: [4, 295, 266, 315] }, // Caldentey
        { shape: "rect", coords: [4, 333, 266, 354] }, // Little
        { shape: "rect", coords: [4, 362, 266, 381] }  // Foord
    ];

  
}

// Call the function when the image is loaded or resized
window.addEventListener('resize', updateAreaCoordinates);
window.addEventListener('load', updateAreaCoordinates);
