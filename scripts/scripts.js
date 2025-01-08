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
function showLyrics(lyricId) {
    // Hide all the lyrics divs
    const allLyricsDivs = document.querySelectorAll('.lyrics');
    allLyricsDivs.forEach(div => {
        div.style.display = 'none'; // Hide all the lyric divs
    });

    // Show the selected lyrics div
    const selectedLyricsDiv = document.getElementById(lyricId + '-lyrics');
    if (selectedLyricsDiv) {
        selectedLyricsDiv.style.display = 'block'; // Show the selected lyrics div

        // Ensure the lyrics panel is visible
        const lyricsPanel = document.getElementById('lyrics-panel');
        if (lyricsPanel) {
            lyricsPanel.style.display = 'block';  // Show the lyrics panel only when needed
        }
    }
}

// Function to close the lyrics panel and reset its state
function closeLyricsPanel() {
    const lyricsPanel = document.getElementById('lyrics-panel');
    if (lyricsPanel) {
        lyricsPanel.style.display = 'none'; // Hide the lyrics panel when closed
    }

    // Hide all individual lyrics
    const allLyricsDivs = document.querySelectorAll('.lyrics');
    allLyricsDivs.forEach(div => {
        div.style.display = 'none';
    });

    stopSound(); // Stop any audio that might be playing
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
    if (muteButton) {
        muteButton.textContent = isMuted ? 'Mute' : 'Unmute';
    }
}

// Stop propagation when clicking on elements inside the lyrics panel
document.getElementById('lyrics-panel').addEventListener('click', function(event) {
    event.stopPropagation();  // Prevent clicks inside the panel from closing it
});

// Ensure the lyrics panel is hidden when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const lyricsPanel = document.getElementById('lyrics-panel');
    if (lyricsPanel) {
        lyricsPanel.style.display = 'none';  // Hide the lyrics panel initially
    }
});

// Close the lyrics panel if clicked outside of it
window.addEventListener('click', function(event) {
    const lyricsPanel = document.getElementById('lyrics-panel');
    if (lyricsPanel && !lyricsPanel.contains(event.target)) {
        lyricsPanel.style.display = 'none';  // Close the panel if clicked outside
        stopSound();  // Stop any sound if lyrics panel is closed
    }
});


function updateImageMapCoordinates() {
    const image = document.querySelector('#paper-arsenal-image');
    if (!image) return;
    
    // Original working desktop coordinates
    const originalCoords = {
        'williamson': '4,217,266,238',
        'catley': '4,256,266,277',
        'caldentey': '4,295,266,315',
        'mead': '4,333,266,354',
        'little': '4,362,266,381',
        'mccabe': '4,401,266,420',
        'rosa': '4,440,266,459',
        'hurtig': '4,479,266,498',
        'foord': '4,518,266,537'
    };

    const desktopWidth = 359;
    const currentWidth = image.width;
    
    // Only scale if we're on a different width than desktop
    if (currentWidth !== desktopWidth) {
        const scale = currentWidth / desktopWidth;
        
        Object.entries(originalCoords).forEach(([player, coords]) => {
            const area = document.querySelector(`area[alt="${player}"]`);
            if (area) {
                // Split coordinates into array
                const coordArray = coords.split(',').map(Number);
                
                // Add a small vertical offset for mobile
                const mobileOffset = currentWidth < desktopWidth ? -10 : 0;
                
                // Scale and adjust coordinates
                const scaledCoords = [
                    Math.round(coordArray[0] * scale),              // x1
                    Math.round(coordArray[1] * scale) + mobileOffset, // y1
                    Math.round(coordArray[2] * scale),              // x2
                    Math.round(coordArray[3] * scale) + mobileOffset  // y2
                ].join(',');
                
                area.coords = scaledCoords;
            }
        });
    }
}

// Call function when image loads and on window resize
document.addEventListener('DOMContentLoaded', function() {
    const image = document.querySelector('#paper-arsenal-image');
    if (image) {
        image.addEventListener('load', updateImageMapCoordinates);
        window.addEventListener('resize', updateImageMapCoordinates);
        setTimeout(updateImageMapCoordinates, 500);
    }
});