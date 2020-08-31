const app = () => {
  //General Class Selection
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //All sounds
  const sounds = document.querySelectorAll(".sound-select button");

  //Time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  //get the outline length of the circle
  const outlineLength = outline.getTotalLength();

  //Duraton
  let duration = 300;

  //Selecting sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      duration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(
        duration % 60
      )}`;
    });
  });

  //picking diff sound
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //song play pause function and button animation
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //circle animation essentials like overlay(strokeDashoffset allows us to show the blue section of circle)
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //time and circle function and animation
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = duration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    //progressbar circle animation
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //time display animation
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
