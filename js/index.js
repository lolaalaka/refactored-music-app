const smallTrackArt = document.querySelector(".smalltrack-art");
const smallTrackArtist = document.querySelector(".smalltrack-artist");
const smallTrackName = document.querySelector(".smalltrack-name");

const modal = document.querySelector(".modal");

const trackArt = document.querySelector(".track-art");
const trackArtist = document.querySelector(".track-artist");
const trackName = document.querySelector(".track-name");

const prevBtn = document.querySelectorAll(".prev");
const nextBtn = document.querySelectorAll(".next");
const bigPlayBtn = document.querySelector(".bigplay");
const smallPlayBtn = document.querySelector(".smallplay");

const audio = document.createElement("audio");

const playlistBox = document.querySelectorAll(".playlist-box");

const modalClose = document.querySelector(".modal-close");
const iconAndImage = document.querySelectorAll(".icon-and-image");

let slider = document.querySelector(".progress");
let curr_time = document.querySelector(".current-time");
let endTime = document.querySelector(".end-time");

let isPlaying = false;
let trackIndex = 0;
let updateTimer;

const bodyContainer = document.querySelector(".container");

iconAndImage.forEach((item) => {
  item.onclick = () => {
    modal.style.display = "block";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

modalClose.onclick = () => {
  modal.style.display = "none";
};

(function () {
  let ham = {
    nav: document.querySelector(".nav"),
    hamburger: document.querySelector(".ham-con"),

    initialize() {
      this.hamburger.addEventListener("click", () => {
        this.toggle();
      });
    },

    toggle() {
      this.hamburger.classList.toggle("expand");
      this.nav.classList.toggle("expand");
    },
  };

  ham.initialize();
})();

let trackControl = [
  {
    nameOfTrack: "HIGH",
    artistName: "Adekunle Gold, Davido",
    imageUrl: "https://i.ytimg.com/vi/juBnNBm0cPw/maxresdefault.jpg",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/09/Adekunle_Gold_Ft_Davido_High_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "Ke Star Remix",
    artistName: "Focalistic",
    imageUrl:
      "https://i1.sndcdn.com/artworks-RCbU370yppeHiXjo-k9jIQQ-t500x500.jpg",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/03/Focalistic_Ft_Davido_Ke_Star_Remix_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "BLOODY SAMARITAN",
    artistName: "Arya Starr",
    imageUrl:
      "https://leurr.com/wp-content/uploads/2021/02/ayrastarr_1465341814270520187144054322421283590920030n.jpg",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/07/Ayra_Starr_Bloody_samaritan_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "BOUNCE",
    artistName: "Ruger",
    imageUrl: "https://i.ytimg.com/vi/F9c4n7Wqtbk/maxresdefault.jpg",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/05/Ruger_Bounce_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "KISS ME LIKE YOU MISS ME",
    artistName: "Ckay",
    imageUrl:
      "https://i1.wp.com/www.vanguardngr.com/wp-content/uploads/2019/08/ckay.gif?fit=1500%2C2177&ssl=1",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/02/Ckay_Kiss_Me_Like_You_Miss_Me_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "PERU",
    artistName: "Fireboy DML;",
    imageUrl:
      "https://guardian.ng/wp-content/uploads/2021/07/maxresdefault-9-e1626881315978.jpg",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/07/Fireboy_Peru_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "FEELING",
    artistName: "LADIPOE, Buju",
    imageUrl:
      "https://grungecake.com/wp-content/uploads/2021/05/ladipoe-feeling-buju-grungecake-thumbnail-scaled.jpg",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/05/LadiPoe_Ft_Buju_Feeling_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "PAY ME",
    artistName: "Oxlade",
    imageUrl:
      "https://9jaflaver.com/wp-content/uploads/2021/08/Oxlade-Pay-Me-300x300.png",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/08/Oxlade_Pay_Me_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "POLICE",
    artistName: "Joeboy",
    imageUrl: "https://i.ytimg.com/vi/H5thBLIAnw8/maxresdefault.jpg",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/02/Joeboy_Police_9jaflaver.com_.mp3",
  },

  {
    nameOfTrack: "ESSENCE REMIX",
    artistName: "Wizkid ft Tems & Justin Bieber",
    imageUrl:
      "https://9jaflaver.com/wp-content/uploads/2021/08/Wizkid-essense-remix-300x300.png",
    musicPath:
      "https://9jaflaver.com/wp-content/uploads/2021/08/WizKid_Essence_Remix_Ft_Justin_Bieber_And_Tems_9jaflaver.com_.mp3",
  },
];

const loadTrack = (x) => {
  //clearing and reseting seek timers. clearInterval is an inbuilt function

  resetTimer();
  clearInterval(updateTimer);

  //Loadding the music

  audio.src = trackControl[x].musicPath;
  audio.load();

  //this updates album art, artist name etc

  trackArt.style.backgroundImage = `url(${trackControl[x].imageUrl})`;
  trackName.textContent = trackControl[x].nameOfTrack;
  trackArtist.textContent = trackControl[x].artistName;

  //loads for smallTrack

  smallTrackArt.style.backgroundImage = `url(${trackControl[x].imageUrl})`;
  smallTrackName.textContent = trackControl[x].nameOfTrack;
  smallTrackArtist.textContent = trackControl[x].artistName;

  //set an interval for 1 milisecond this is for updating progress slider. seekUpdate is a function that will be written out below

  updateTimer = setInterval(seekUpdate, 1000);

  //moving to a new track after one finishes automatically

  audio.addEventListener("ended", nextTrack);
};

//updates player
playlistBox.forEach((box, index) => {
  box.onclick = () => {
    loadTrack(index);
  };
});

//buttons

function playMusic() {
  audio.play();
  isPlaying = true;
  bigPlayBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  smallPlayBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

function pauseMusic() {
  audio.pause();
  isPlaying = false;
  bigPlayBtn.innerHTML = `<i class="fas fa-play"></i>`;
  smallPlayBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

bigPlayBtn.onclick = () => {
  if (isPlaying === false) {
    playMusic();
  } else {
    pauseMusic();
  }
};
smallPlayBtn.onclick = () => {
  if (isPlaying === false) {
    playMusic();
  } else {
    pauseMusic();
  }
};

const nextTrack = () => {
  if (trackIndex < trackControl.length - 1) {
    trackIndex++;
  } else {
    trackIndex = 0;
  }
  // call the loadTrack funtion
  loadTrack(trackIndex);

  playMusic();
};

nextBtn.forEach((nextbtn) => {
  nextbtn.onclick = () => {
    nextTrack();
  };
});

//prev button
const prevTrack = () => {
  if (trackIndex > 0) {
    trackIndex--;
  } else {
    trackIndex = trackControl.length;
  }
  // call the loadTrack funtion
  loadTrack(trackIndex);

  playMusic();
};

prevBtn.forEach((prevbtn) => {
  prevbtn.onclick = () => {
    prevTrack();
  };
});

//timer

const resetTimer = () => {
  curr_time.textContent = "00:00";
  endTime.textContent = "00:00";
  slider.value = 0;
};

const seekTo = () => {
  let seekto = audio.duration * (slider.value / 100);
  audio.currentTime = seekto;
};

function seekUpdate() {
  let seekPosition = 0;

  //check if audio.duration is a legitimate number

  if (!isNaN(audio.duration)) {
    seekPosition = audio.currentTime * (100 / audio.duration);
    slider.value = seekPosition;

    //calculate time left and total duration

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    //set the display
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    endTime.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(trackIndex);

const centerplaybtn = document.querySelector(".playbtn");
const centerText = document.querySelector(".text");
const centerLine = document.querySelector(".centerline");
const circleContainer = document.querySelector(".circle-container");
const centerCircle = document.querySelector(".circle");
const wave = document.querySelector(".wavecontainer");

const centerOperation = () => {
  centerplaybtn.addEventListener("click", () => {
    centerText.style.display = "none";
    centerLine.style.display = "none";
    centerplaybtn.style.opacity = 0;
    circleContainer.style.visibility = "visible";
    wave.style.display = "none";
  });
};

centerOperation();

// alert('click on "PLAYER" to discover some of your favorite songs :)');
