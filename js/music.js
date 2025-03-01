const audio = document.getElementById('background-music');
const toggleButton = document.getElementById('audio-toggle');
const icon = toggleButton.querySelector('i');

toggleButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause'); // Change to pause icon
    } else {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play'); // Change to play icon
    }
});
