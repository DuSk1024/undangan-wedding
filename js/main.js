document.addEventListener("DOMContentLoaded", function () {

    // 1. AOS Animation Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: false,
            mirror: true,
            duration: 700,
            easing: 'ease-out-back',
            offset: 100
        });
    }

    // 2. Music Player Auto Play
    const audio = document.getElementById("weddingAudio");
    const musicBtn = document.getElementById("musicToggle");
    const musicIcon = document.getElementById("musicIcon");

    if (audio && musicBtn) {
        if (sessionStorage.getItem('playAudio') === 'true') {
            audio.play().catch(() => console.log("Autoplay blocked by browser"));
            sessionStorage.removeItem('playAudio');
        }

        musicBtn.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
                musicIcon.classList.remove("paused");
            } else {
                audio.pause();
                musicIcon.classList.add("paused");
            }
        });
    }

    // 3. Countdown Timer
    const targetDate = new Date("October 17, 2026 08:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const dEl = document.getElementById("days");
            const hEl = document.getElementById("hours");
            const mEl = document.getElementById("minutes");
            const sEl = document.getElementById("seconds");

            if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
            if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
            if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. Form RSVP Handler
    const rsvpForm = document.getElementById("rsvpForm");
    const wishesList = document.getElementById("wishesList");

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const status = document.getElementById("status").value;
            const message = document.getElementById("message").value;

            const wishCard = document.createElement("div");
            wishCard.className = "card p-3 border-0 shadow-sm mb-2";
            wishCard.setAttribute("data-aos", "pop-out");
            wishCard.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <strong class="text-dark">${escapeHtml(name)}</strong>
                    <span class="badge ${status === 'Hadir' ? 'bg-success' : 'bg-secondary'}">${status}</span>
                </div>
                <p class="text-muted small mb-0">${escapeHtml(message)}</p>
            `;

            wishesList.prepend(wishCard);
            rsvpForm.reset();

            if (typeof confetti !== 'undefined' && status === 'Hadir') {
                confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
            }
        });
    }

    // 5. Floating Hearts Effect
    function createPopOutHeart() {
        const heart = document.createElement('div');
        heart.className = 'popout-heart';
        const icons = ['bi-heart-fill', 'bi-stars', 'bi-suit-heart-fill'];
        heart.innerHTML = `<i class="bi ${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
        heart.style.left = (Math.random() * 90) + 'vw';
        heart.style.transform = `scale(${Math.random() * (1.6 - 0.8) + 0.8})`;

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
    setInterval(createPopOutHeart, 1500);

    // 6. Live RSVP Toast Notification
    const dummyGuests = [
        { name: "Budi & Partner", status: "Hadir", time: "Baru saja" },
        { name: "Siti Rahma", status: "Hadir", time: "1 menit lalu" },
        { name: "Andi Wijaya", status: "Hadir", time: "3 menit lalu" }
    ];
    let guestIndex = 0;

    function showPopUpNotification() {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container-custom';
            document.body.appendChild(container);
        }

        const guest = dummyGuests[guestIndex];
        guestIndex = (guestIndex + 1) % dummyGuests.length;

        const toast = document.createElement('div');
        toast.className = 'toast-popout shadow-lg';
        toast.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <i class="bi bi-check-circle-fill text-success fs-4"></i>
                <div>
                    <strong class="d-block text-dark small">${escapeHtml(guest.name)}</strong>
                    <span class="badge bg-success-subtle text-success border border-success-subtle me-1">Konfirmasi ${guest.status}</span>
                    <small class="text-muted d-block mt-1" style="font-size: 0.7rem;">${guest.time}</small>
                </div>
            </div>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
    setInterval(showPopUpNotification, 6000);

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.innerText = text;
        return div.innerHTML;
    }
});