
// Toggle expanded image view
function toggleImage(imageId, event) {
    event.stopPropagation();
    const expandedImages = document.querySelectorAll('.expanded-image-container');
    expandedImages.forEach(img => img.classList.remove('active'));

    const targetImage = document.getElementById(imageId);
    targetImage.classList.toggle('active');
    stopSound();
}



function handleAreaClick(lyricId, event) {
    event.preventDefault();
    event.stopPropagation();
    const expandedContainer = document.getElementById('expandedarsenal');
    if (expandedContainer.style.display !== 'block') {
        return; // Exit if the expanded container is not visible
    }
    showLyrics(lyricId);
}

// Stop sound
function stopSound() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

// Show lyrics for a selected song
function showLyrics(lyricId) {
    // Hide all the lyrics divs
    const allLyricsDivs = document.querySelectorAll('.lyrics');
    allLyricsDivs.forEach(div => {
        div.style.display = 'none';
    });

    // Show the selected lyrics div
    const selectedLyricsDiv = document.getElementById(lyricId + '-lyrics');
    if (selectedLyricsDiv) {
        selectedLyricsDiv.style.display = 'block';

        // Ensure the lyrics panel is visible
        const lyricsPanel = document.getElementById('lyrics-panel');
        if (lyricsPanel) {
            lyricsPanel.style.display = 'block';
        }
    }
}

let currentlyPlayingAudio = null;

function playSound(audioId, button) {
    const audio = document.getElementById(audioId);

    // Stop currently playing audio if a new one is selected
    if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
        const previousButton = document.querySelector(".lyrics-button[playing]");
        if (previousButton) {
            previousButton.innerText = "Play";
            previousButton.removeAttribute("playing");
        }
    }

    if (audio.paused) {
        audio.play();
        button.innerText = "Pause";
        currentlyPlayingAudio = audio;
    } else {
        audio.pause();
        button.innerText = "Play";
        button.removeAttribute("playing");
    }
}

// Function to close the lyrics panel and reset its state
function closeLyricsPanel() {
    const lyricsPanel = document.getElementById('lyrics-panel');
    if (lyricsPanel) {
        lyricsPanel.style.display = 'none';
    }

    // Hide all individual lyrics
    const allLyricsDivs = document.querySelectorAll('.lyrics');
    allLyricsDivs.forEach(div => {
        div.style.display = 'none';
    });

    stopSound();
}

// Function to toggle mute for all audio elements
function toggleMute() {
    const audioElements = document.querySelectorAll('audio');
    let isMuted = false;

    if (audioElements.length > 0) {
        isMuted = audioElements[0].muted;
    }

    audioElements.forEach(audio => {
        audio.muted = !isMuted;
    });

    const muteButton = document.getElementById('mute-button');
    if (muteButton) {
        muteButton.textContent = isMuted ? 'Mute' : 'Unmute';
    }
}
// Function to adjust coordinates based on the current image size
function adjustCoords(coords, imageWidth) {
    // Split the original coordinates into individual values
    let [x1, y1, x2, y2] = coords.split(',').map(Number);

    // Calculate the scale factor based on the image width
    const scaleFactor = imageWidth / 1024; // Assuming the original image width is 1024px

    // Adjust the coordinates based on the scale factor
    x1 *= scaleFactor;
    y1 *= scaleFactor;
    x2 *= scaleFactor;
    y2 *= scaleFactor;

    // Return the adjusted coordinates
    return `${x1},${y1},${x2},${y2}`;
}

// Function to update the image map coordinates dynamically
function updateImageMapCoords() {
    const image = document.getElementById('paper-arsenal-image');
    const areas = document.querySelectorAll('map[name="image-map1"] area');

    // Wait for the image to load and get its width
    image.onload = function () {
        const imageWidth = image.width;

        // Loop through all the areas and adjust their coordinates
        areas.forEach(area => {
            const originalCoords = area.getAttribute('coords');
            const adjustedCoords = adjustCoords(originalCoords, imageWidth);
            area.setAttribute('coords', adjustedCoords); // Update the coords attribute
        });
    };
}

// Ensure that coordinates are updated when the page loads and when the window is resized
window.onload = updateImageMapCoords;
window.onresize = updateImageMapCoords;

// Image map coordinate handling
function updateImageMapCoordinates() {
    const image = document.getElementById('paper-arsenal-image');
    if (!image) return;
    
    const originalWidth = 359;
    const currentWidth = image.width;
    const scale = currentWidth / originalWidth;
    
    if (currentWidth !== originalWidth) {
        Object.entries(originalCoordinates).forEach(([player, coords]) => {
            const area = document.querySelector(`area[alt="${player}"]`);
            if (area) {
                const coordArray = coords.split(',').map(Number);
                const verticalOffset = currentWidth < originalWidth ? -10 : 0;
                
                const scaledCoords = [
                    Math.round(coordArray[0] * scale),
                    Math.round(coordArray[1] * scale) + verticalOffset,
                    Math.round(coordArray[2] * scale),
                    Math.round(coordArray[3] * scale) + verticalOffset
                ].join(',');
                
                area.coords = scaledCoords;
            }
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set up lyrics panel
    const lyricsPanel = document.getElementById('lyrics-panel');
    if (lyricsPanel) {
        lyricsPanel.style.display = 'none';
        lyricsPanel.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // Set up close buttons
    const closeButtons = document.querySelectorAll('#close-lyrics-panel');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeLyricsPanel);
    });

    // Set up image map handling
    const image = document.getElementById('paper-arsenal-image');
    if (image) {
        image.addEventListener('load', updateImageMapCoordinates);
        window.addEventListener('resize', updateImageMapCoordinates);
        setTimeout(updateImageMapCoordinates, 500);
    }
});

// Global click handlers
window.addEventListener('click', function(event) {
    // Handle expanded image clicks
    const expandedImage = document.querySelector('.expanded-image-container.active');
    if (expandedImage && !expandedImage.contains(event.target)) {
        expandedImage.classList.remove('active');
        stopSound();
    }

    // Handle lyrics panel clicks
    const lyricsPanel = document.getElementById('lyrics-panel');
    if (lyricsPanel && !lyricsPanel.contains(event.target)) {
        lyricsPanel.style.display = 'none';
        stopSound();
    }
});