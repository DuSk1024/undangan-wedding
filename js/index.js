document.addEventListener("DOMContentLoaded", function () {

    // 1. Ambil Nama Tamu dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    const guestElement = document.getElementById('guestName');

    if (guestElement && guestParam) {
        const namaFormatted = decodeURIComponent(guestParam.replace(/\+/g, ' '));
        guestElement.innerText = namaFormatted;
    }

    // 2. SETTING POSISI AWAL (GSAP)
    gsap.set("#photoBg", { scale: 1.05, opacity: 0 });
    gsap.set("#mainContainer", { opacity: 0, y: 15 });

    // 3. MASTER GSAP TIMELINE (Fade In Halus & Instan)
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl
    // Step 1: Fade In Background Prewedding
    .to("#photoBg", { 
        opacity: 1, 
        scale: 1, 
        duration: 1.0, 
        ease: "power2.out" 
    })

    // Step 2: Fade In Teks & Tombol
    .to("#mainContainer", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");

    // 4. HANDLER TOMBOL BUKA UNDANGAN
    const btnOpen = document.getElementById('btnOpenInvitation');
    const pageWrapper = document.getElementById('pageWrapper');

    if (btnOpen && pageWrapper) {
        btnOpen.addEventListener('click', function (e) {
            e.preventDefault();

            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            }

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