window.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);

    const guestName = urlParams.get("to");

    const guestElement = document.getElementById("guestName");

    if (guestElement) {

        guestElement.textContent =
            guestName
            ? decodeURIComponent(guestName.replace(/\+/g, " "))
            : "Tamu Undangan";

    }

});

document.body.classList.add("lock");
// =========================
// NAMA TAMU DARI URL
// =========================

window.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);

    const guestName = urlParams.get("to");

    const guestElement = document.getElementById("guestName");

    if (guestElement) {

        guestElement.textContent =
            guestName
            ? decodeURIComponent(guestName.replace(/\+/g, " "))
            : "Tamu Undangan";

    }

});

// Animasi reveal saat section masuk viewport
const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });

}, {
    threshold: 0.2
});

// Observe semua elemen reveal
    document.querySelectorAll(".reveal").forEach((el) => {
        observer.observe(el);
    });

const weddingDate = new Date("Juni 20, 2026 23:46:00").getTime();

    setInterval(() => {

        const now = new Date().getTime();

        const distance = weddingDate - now;
        if(distance < 0){
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
}

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

    }, 1000);

// Gallery Modal

const modal = document.getElementById("galleryModal");

const modalImg = document.getElementById("modalImage");

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        modal.style.display = "flex";

        modalImg.src = img.src;

    });

});

document.querySelector(".close-modal").addEventListener("click", () => {

    modal.style.display = "none";

});

modal.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});

// RSVP 
document.getElementById("rsvpForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        nama: document.getElementById("nama").value,
        jumlah: document.getElementById("jumlah").value,
        hadir: document.getElementById("hadir").value,
        ucapan: document.getElementById("ucapan").value
    };

    console.log("DATA:", data);

    try {

     const response = await fetch(
    "https://script.google.com/macros/s/AKfycbxN5mC9X7fq9b58lrbuEBJxvtB05mO8a4ImqugCviZBbRehHxu0qELiCTAmzNm7MoWU/exec",
    {
        method: "POST",
        body: JSON.stringify(data)
    }
);

        console.log("RESPONSE:", response);

        const text = await response.text();

        console.log("TEXT:", text);

        alert("Berhasil terkirim");

    } catch(error){

        console.error("ERROR:", error);

        alert(error.message);

    }

});
function copyRekening(id){

    const rekening =
    document.getElementById(id).textContent;

    navigator.clipboard.writeText(rekening);

    alert("Nomor berhasil disalin ✅");

}

// ucapan tamu
async function loadWishes(){

    try{

        const response = await fetch(
         "https://script.google.com/macros/s/AKfycbxkbFXmiTVqm7oDGHj-J4qRRM4C2vw9sjacRAQGmuD-DHN_KDcLFecKXFG312mLmMu_/exec"
        );

        const data = await response.json();

        console.log("DATA UCAPAN:", data);

        const wishList =
        document.getElementById("wishList");

        wishList.innerHTML = "";

        data.reverse().forEach(item => {

            const card = document.createElement("div");

            card.className = "wish-card";

 const tanggal = new Date(item.waktu);

const waktuFormat =
tanggal.toLocaleString("id-ID",{
    day:"2-digit",
    month:"long",
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit"
});

card.innerHTML = `
    <h4>${item.nama}</h4>
    <span>${waktuFormat}</span>
    <p>${item.ucapan}</p>
`;
            wishList.appendChild(card);

        });

    }catch(error){

        console.error("WISH ERROR:", error);

    }

}

loadWishes();

/* refresh*/
window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

document.addEventListener("mousemove",(e)=>{

    const x = (window.innerWidth/2 - e.clientX)/25;
    const y = (window.innerHeight/2 - e.clientY)/25;

    document.querySelector(".content").style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;

});

const cover = document.querySelector(".cover");
const content = document.querySelector(".content");
const name = document.querySelector(".name");
const guest = document.querySelector(".guest");

let startX = 0;

cover.addEventListener("touchstart",(e)=>{
    startX = e.touches[0].clientX;
});

cover.addEventListener("touchmove",(e)=>{

    const currentX = e.touches[0].clientX;

    const move = (currentX - startX) / 20;

    content.style.transform =
    `rotateY(${move}deg)`;

    name.style.transform =
    `translateX(${move * 2}px) translateZ(40px)`;

    guest.style.transform =
    `translateX(${move * 3}px) translateZ(80px)`;

});

cover.addEventListener("touchend",()=>{

    content.style.transform = "";

    name.style.transform = "";

    guest.style.transform = "";

});

/*AYAT MASUK*/
const verseText =
`"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
untukmu pasangan-pasangan dari jenismu sendiri agar kamu
cenderung dan merasa tenteram kepadanya."`;

const verse = document.getElementById("verseText");

const observerVerse = new IntersectionObserver((entries)=>{

    if(entries[0].isIntersecting){

        let i = 0;

        function typeWriter(){

            if(i < verseText.length){

                verse.textContent += verseText.charAt(i);

                i++;

                setTimeout(typeWriter, 30);

            }

        }

        typeWriter();

        observerVerse.disconnect();

    }

},{
    threshold:0.5
});

observerVerse.observe(verse);

/*bunga ayat*/
const ayatSection =
document.getElementById("ayat");

const floralTop =
document.querySelector(".floral-top");

const floralBottom =
document.querySelector(".floral-bottom");

const floralObserver =
new IntersectionObserver((entries)=>{

    if(entries[0].isIntersecting){

        floralTop.classList.add("show");

        floralBottom.classList.add("show");

        floralObserver.disconnect();

    }

},{
    threshold:0.3
});

floralObserver.observe(ayatSection);

/*scrol enak*/
function openInvitation(){

    const music = document.getElementById("bgMusic");

    if(music){
        music.play().catch(() => {});
    }

    document.body.classList.remove("lock");

    const ayat = document.getElementById("ayat");

    window.scrollTo({
        top: ayat.offsetTop - 0,
        behavior: "smooth"
    });

}

/*bingkai mempelai*/
const coupleSection =
document.getElementById("couple");

const coupleTop =
document.querySelector(".couple-floral-top");

const coupleBottom =
document.querySelector(".couple-floral-bottom");

const coupleObserver =
new IntersectionObserver((entries)=>{

    if(entries[0].isIntersecting){

        coupleTop.classList.add("show");

        coupleBottom.classList.add("show");

        coupleObserver.disconnect();

    }

},{
    threshold:0.3
});

coupleObserver.observe(coupleSection);