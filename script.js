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
const cover = document.querySelector(".cover");

const tracks = [
    {
        name: "Habib - Kharchanghaye Mordab",
        src: "https://xx.sahand-music.ir/Archive/H/Habib/Habib%20-%20Kavire%20Bavar/02%20Kharchanghaye%20Mordab.mp3",
        cover: "https://sahand-music.ir/photos/2025/09/93029.webp"
    },
    {
        name: "Mahasti - Taghsireh Toust",
        src: "https://xx.sahand-music.ir/Archive/M/Mahasti/Mahasti%20-%20Asir/Mahasti-Taghsireh-Toust.MP3",
        cover: "https://sahand-music.ir/photos/2000/12/15494.webp"
    },
    {
        name: "Omid - Eshgho Tamanna",
        src: "https://xx.sahand-music.ir/Archive/O/Omid/Omid%20-%20Havaye%20Azadi/02%20Eshgho%20Tamanna%20[128].mp3",
        cover: "https://sahand-music.ir/photos/2000/6/30817.webp"
    },
    {
        name: "Siavash Ghomayshi - Deltangi",
        src: "https://xx.sahand-music.ir/Archive/S/Siavash%20Ghomayshi/Siavash%20Ghomayshi%20-%20Shokoufehaye%20Kaviri/03%20Deltangi.mp3",
        cover: "https://sahand-music.ir/photos/2000/9/24641.webp"
    },
    {
        name: "Shadmehr Aghili - Ghazi",
        src: "https://xx.sahand-music.ir/Archive/S/Shadmehr%20Aghili/1399/Shadmehr%20Aghili%20-%20Ghazi%20128.mp3",
        cover: "https://sahand-music.ir/photos/2000/14/13502.webp"
    },
    {
        name: "Moein - Kabeh",
        src: "https://xx.sahand-music.ir/Archive/M/Moein/Moein%20-%20Kabeh/01%20Kabeh.mp3",
        cover: "https://sahand-music.ir/photos/2000/24/45595.webp"
    }
];

let currentIndex = 0;

tracks.forEach((track, i) => {
    const trackBtn = document.createElement("button");
    trackBtn.textContent = track.name;
    trackBtn.onclick = () => {
        loadTrack(i);
        playTrack();
    }
    playlistElement.appendChild(trackBtn);
});
function loadTrack(index) {
    currentIndex = index;
    audioElement.src = tracks[index].src;
    trackName.textContent = tracks[index].name;
    cover.style.backgroundImage = `url('${tracks[index].cover}')`;
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
    console.log(currentIndex);
    console.log(currentIndex + 1);
    console.log(tracks.length);
    currentIndex = (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex);
    playTrack();
});
prevBtn.addEventListener("click", () => {
    console.log(currentIndex);
    console.log(currentIndex - 1 + tracks.length);
    console.log(tracks.length);
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
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
loadTrack(0);