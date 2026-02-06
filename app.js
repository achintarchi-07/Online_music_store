alert("app.js loaded");

const container = document.getElementById("music-container");
const audioPlayer = document.getElementById("audioPlayer");
const searchInput = document.getElementById("searchInput");
const nowPlayingImg = document.getElementById("nowPlayingImg");
const nowPlayingTitle = document.getElementById("nowPlayingTitle");
const nowPlayingArtist = document.getElementById("nowPlayingArtist");

function displaySongs(songList) {
    container.innerHTML = "";

    songList.forEach(song => {
        const div = document.createElement("div");
        div.className = "music-card";

        div.innerHTML = `
            <img src="${song.image}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <p>₹${song.price}</p>
           <button onclick="playSong('${song.audio}')">▶ Play</button>
           <button onclick="addToCart(${song.id})">🛒 Add</button>
           <button onclick="addToWishlist(${song.id})">❤️</button>

        `;

        container.appendChild(div);
    });
}

function playSong(audioFile) {
    const song = songs.find(s => s.audio === audioFile);

    audioPlayer.pause();
    audioPlayer.src = audioFile;
    audioPlayer.load();
    audioPlayer.play();

    // Update Now Playing UI
    if (song) {
        nowPlayingImg.src = song.image;
        nowPlayingTitle.innerText = song.title;
        nowPlayingArtist.innerText = song.artist;
    }
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const song = songs.find(s => s.id === id);
    cart.push(song);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const song = songs.find(s => s.id === id);

    if (!wishlist.some(item => item.id === id)) {
        wishlist.push(song);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to Wishlist ❤️");
    } else {
        alert("Already in Wishlist");
    }
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        const filtered = songs.filter(song =>
            song.title.toLowerCase().includes(value) ||
            song.artist.toLowerCase().includes(value)
        );
        displaySongs(filtered);
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}


displaySongs(songs);


