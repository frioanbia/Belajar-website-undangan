// nav bar
const stickyTop = document.querySelector(".sticky-top");
const myOffcanvas = document.querySelector(".offcanvas");
const rootElement = document.querySelector(":root");
const audioWrapper = document.querySelector("#audio-wrapper");
const audioIcon = document.querySelector("#audio-wrapper i");
let isPlaying = false;

myOffcanvas.addEventListener("show.bs.offcanvas", function () {
  stickyTop.style.overflow = "visible";
});

myOffcanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

// fitur waktu mundur
simplyCountdown(".simply-countdown", {
  year: 2026, // required
  month: 09, // required
  day: 15, // required
  hours: 8, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: "Hari", plural: "Hari" },
    hours: { singular: "Jam", plural: "Jam" },
    minutes: { singular: "Menit", plural: "Menit" },
    seconds: { singular: "Detik", plural: "Detik" },
  },
});

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  //localStorage.setItem("opened", "true");
  playAudio();
}

// if (!localStorage.getItem("opened")) {
//   disableScroll();
// }

disableScroll();

function playAudio() {
  const song = document.querySelector("#song");
  song.volume = 0.1;
  song.play();
  audioWrapper.style.display = "flex";
  isPlaying = true;
}

audioWrapper.onclick = function () {
  if (isPlaying) {
    document.querySelector("#song").pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    document.querySelector("#song").play();
    audioIcon.classList.remove("bi-pause-circle");
  }
  isPlaying = !isPlaying;
};

window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Berhasil tersimpan, Terima kasih!");
    });
  });
});

// fitur get nama
const urlParam = new URLSearchParams(window.location.search);
const pronoun = urlParam.get("p") || "Bapa/ibu/Saudara/i";
const nama = urlParam.get("n") || "";
const namaCon = document.querySelector(".hero h4 span");
namaCon.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ",");

document.querySelector("#nama").value = nama;
