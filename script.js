const audioElement = document.getElementById("audio");
const trackName = document.getElementById("trackName");
const nextBtn = document.getElementById("next");
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const currentTimeElement = document.getElementById("currentTime");
const seek = document.getElementById("seek");
const durationElement = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistElement = document.getElementById("playlist");
const toggleAddBtn = document.getElementById("toggleAddBox");
const addBox = document.getElementById("addBox");
const newTrackName = document.getElementById("newTrackName");
const newTrackUrl = document.getElementById("newTrackUrl");
const addTrackBtn = document.getElementById("addTrackBtn");

let tracksArray = JSON.parse(localStorage.getItem("tracks")) || [];

let currentIndex = 0;

function renderTracks() {
    playlistElement.innerHTML = "";
    tracksArray.forEach((track, i) => {
        const trackBtn = document.createElement("button");
        trackBtn.textContent = track.name;
        trackBtn.onclick = () => {
            loadTrack(i);
            playTrack();
        }
        playlistElement.appendChild(trackBtn);
    });
}
function loadTrack(index) {
    currentIndex = index;
    audioElement.src = tracksArray[index].src;
    trackName.textContent = tracksArray[index].name;
    seek.value = 0;
}
function playTrack() {
    audioElement.play();
    playPauseBtn.textContent = "⏸️";
}
function pauseTrack() {
    audioElement.pause();
    playPauseBtn.textContent = "▶️";
}
function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}
playPauseBtn.addEventListener("click", () => {
    if(audioElement.paused) playTrack();
    else pauseTrack();
});
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % tracksArray.length;
    loadTrack(currentIndex);
    playTrack();
});
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + tracksArray.length) % tracksArray.length;
    loadTrack(currentIndex);
    playTrack();
});
audioElement.addEventListener("loadedmetadata", () => {
    seek.max = Math.floor(audioElement.duration);
    durationElement.textContent = formatTime(audioElement.duration);
});
audioElement.addEventListener("timeupdate", () => {
    seek.value = Math.floor(audioElement.currentTime);
    currentTimeElement.textContent = formatTime(audioElement.currentTime);
    if(audioElement.currentTime == audioElement.duration) {
        nextBtn.click();
    }
});
seek.addEventListener("input", () => {
    audioElement.currentTime = seek.value;
});
volumeSlider.addEventListener("input", () => {
    audioElement.volume = volumeSlider.value;
});
toggleAddBtn.addEventListener("click", () => {
    addBox.classList.toggle("show");
});
addTrackBtn.addEventListener("click", () => {
    if(newTrackName === "" && newTrackUrl === "") return;
    const newTrack = {
        name: newTrackName.value,
        src: newTrackUrl.value
    };
    tracksArray.push(newTrack);
    localStorage.setItem("tracks", JSON.stringify(tracksArray));
    newTrackName.value = "";
    newTrackUrl.value = "";
    renderTracks();
});
renderTracks();