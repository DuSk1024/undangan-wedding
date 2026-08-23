document.addEventListener("DOMContentLoaded", function () {

    // 1. AUTO FIT CARD SCALE (Skala otomatis agar muat di layar tanpa terpotong)
    function autoFitCard() {
        const card = document.querySelector('.card-canvas');
        if (!card) return;

        const originalWidth = 480;
        const originalHeight = 750;
        const paddingMargin = 20;

        const availableWidth = window.innerWidth - paddingMargin;
        const availableHeight = window.innerHeight - paddingMargin;

        const scaleX = availableWidth / originalWidth;
        const scaleY = availableHeight / originalHeight;
        
        let scale = Math.min(scaleX, scaleY);
        if (scale > 1) scale = 1;

        card.style.transform = `scale(${scale})`;
    }

    autoFitCard();
    window.addEventListener('resize', autoFitCard);

    // 2. Ambil Nama Tamu dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    const guestElement = document.getElementById('guestName');

    if (guestElement && guestParam) {
        const namaFormatted = decodeURIComponent(guestParam.replace(/\+/g, ' '));
        guestElement.innerText = namaFormatted;
    }

    // 3. SETTING POSISI AWAL (GSAP)
    gsap.set("#photoBg", { scale: 1.05, opacity: 0 });
    gsap.set("#mainContainer", { opacity: 0, y: 15 });

    // 4. MASTER GSAP TIMELINE
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl
    .to("#photoBg", { 
        opacity: 1, 
        scale: 1, 
        duration: 1.0, 
        ease: "power2.out" 
    })
    .to("#mainContainer", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");

    // 5. HANDLER TOMBOL BUKA UNDANGAN
    const btnOpen = document.getElementById('btnOpenInvitation');
    const pageWrapper = document.getElementById('pageWrapper');

    if (btnOpen && pageWrapper) {
        btnOpen.addEventListener('click', function (e) {
            e.preventDefault();

            gsap.to(pageWrapper, {
                y: "-100vh",
                opacity: 0,
                scale: 0.95,
                duration: 0.85,
                ease: "power3.inOut",
                onComplete: function () {
                    sessionStorage.setItem('playAudio', 'true');
                    
                    if (guestParam) {
                        window.location.href = "main.html?to=" + encodeURIComponent(guestParam);
                    } else {
                        window.location.href = "main.html";
                    }
                }
            });
        });
    }
});