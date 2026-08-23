document.addEventListener("DOMContentLoaded", function () {

    // 1. AUTO FIT CARD SCALE (Menjaga desain 100% utuh & pas di layar apapun)
    function autoFitCard() {
        const card = document.querySelector('.card-canvas');
        if (!card) return;

        const originalWidth = 480;
        const originalHeight = 750;
        const paddingMargin = 20; // Jarak aman dari pinggir layar

        const availableWidth = window.innerWidth - paddingMargin;
        const availableHeight = window.innerHeight - paddingMargin;

        // Hitung rasio skala yang dibutuhkan
        const scaleX = availableWidth / originalWidth;
        const scaleY = availableHeight / originalHeight;
        
        // Ambil skala terkecil agar seluruh kartu muat tanpa ada yang terpotong
        let scale = Math.min(scaleX, scaleY);

        // Jika layar lebih besar dari desain (laptop besar), max skala = 1 (100% ukuran asli)
        if (scale > 1) scale = 1;

        card.style.transform = `scale(${scale})`;
    }

    // Jalankan saat pertama kali dimuat & saat ukuran window di-resize
    autoFitCard();
    window.addEventListener('resize', autoFitCard);

    // 2. COUNTDOWN TIMER ACARA (Sabtu, 17 Oktober 2026)
    const targetDate = new Date("October 17, 2026 08:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            const dEl = document.getElementById("days");
            const hEl = document.getElementById("hours");
            const mEl = document.getElementById("minutes");

            if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
            if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
            if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

});