document.addEventListener("DOMContentLoaded", function () {

    // 1. Ambil Nama Tamu dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    const guestElement = document.getElementById('guestName');

    if (guestElement && guestParam) {
        // Mengubah tanda '+' menjadi spasi lalu meng-decode URL
        const namaFormatted = decodeURIComponent(guestParam.replace(/\+/g, ' '));
        guestElement.innerText = namaFormatted;
    }

    // 2. SETTING POSISI AWAL (GSAP)
    gsap.set("#bgPlain", { opacity: 0 });

    // TEKS TENGAH: STAY / TETAP DI TEMPAT (Muncul Langsung Tanpa Gerakan)
    gsap.set("#mainContainer", { opacity: 1, y: 0, scale: 1 });

    // SEMUA ORNAMEN ATAS: Awalnya di BAWAH (y: 60px) & Transparan
    gsap.set(["#topLeft", "#topRight", "#topCenter"], { 
        y: 60, 
        opacity: 0, 
        transformOrigin: "top center" 
    });
    // Offset khusus geser sedikit ke kiri untuk ornamen tengah atas agar presisi
    gsap.set("#topCenter", { x: -2.5 });

    // SEMUA ORNAMEN BAWAH: Awalnya di BAWAH (y: 60px) & Transparan
    gsap.set(["#bottomLeft", "#bottomRight", "#bottomCenter"], { 
        y: 60, 
        opacity: 0, 
        transformOrigin: "bottom center" 
    });

    // 3. MASTER GSAP TIMELINE (Mulus & Barengan Naik dari Bawah)
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl
    // Step 1: Background Krem Fade In
    .to("#bgPlain", { 
        opacity: 1, 
        duration: 0.5 
    })

    // Step 2: BINGKAI ATAS (Kiri, Kanan, Tengah) BARENGAN Naik & Fade In dari Bawah
    .to(["#topLeft", "#topRight", "#topCenter"], {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08, // Stagger tipis agar tetap mengalir anggun
        ease: "power2.out"
    }, "+=0.1")

    // Step 3: BINGKAI BAWAH (Kiri, Kanan, Tengah) BARENGAN Fade In dari Bawah
    .to(["#bottomLeft", "#bottomRight", "#bottomCenter"], {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power2.out"
    }, "-=0.6"); // Menyusul halus saat bingkai atas hampir sampai

    // 4. ANIMASI GOYANG KONTINU (Berayun Pendulum Lembut)
    // Ayunan Tengah Atas
    gsap.to("#topCenter", {
        rotation: 3.5,
        duration: 3.0,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5
    });

    // Ayunan Tengah Bawah
    gsap.to("#bottomCenter", {
        rotation: -3.5,
        duration: 3.0,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5
    });

    // 5. HANDLER TOMBOL BUKA UNDANGAN
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
                    
                    // TERUSKAN NAMA TAMU KE INDEX.HTML
                    if (guestParam) {
                        window.location.href = "index.html?to=" + encodeURIComponent(guestParam);
                    } else {
                        window.location.href = "index.html";
                    }
                }
            });
        });
    }
});