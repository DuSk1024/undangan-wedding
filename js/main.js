document.addEventListener("DOMContentLoaded", function () {

    // COUNTDOWN TIMER ACARA (Sabtu, 17 Oktober 2026)
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

            // ANGKAN HARI DITAMPILKAN MURNI TANPA NOL DIDEPAN (2 DIGIT JIKA >9, 1 DIGIT JIKA <10)
            if (dEl) dEl.innerText = days < 10 ? "0" + days : days; 
            if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
            if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

});