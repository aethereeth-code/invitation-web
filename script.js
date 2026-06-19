// Nama tamu dari URL
const params = new URLSearchParams(window.location.search);

const guest = params.get("to");

if (guest) {
    document.getElementById("guestName").textContent = guest;
}

// Lock scroll saat cover tampil
document.body.classList.add("lock");

function openInvitation(){

    const music =
    document.getElementById("bgMusic");

    music.play();

    document.body.classList.remove("lock");

    document.getElementById("ayat").scrollIntoView({
        behavior:"smooth"
    });


    document.body.classList.remove("lock");

    document.getElementById("ayat").scrollIntoView({
        behavior:"smooth"
    });

}

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