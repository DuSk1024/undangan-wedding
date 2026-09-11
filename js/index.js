// Kurangi kompetisi network saat halaman pertama kali dibuka.
// Musik tetap diputar dari user gesture saat Open Invitation ditekan.
const earlyWeddingAudio = document.getElementById('weddingMusic');
if (earlyWeddingAudio) {
    earlyWeddingAudio.preload = 'metadata';
}

document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // DETECT ANDROID
    // ============================================================

    const isAndroid =
        /Android/i.test(
            navigator.userAgent
        );

    if (isAndroid) {

        document.documentElement
            .classList
            .add('android-device');

    }

    // ============================================================
    // 1. AUTO FIT COVER CARD
    // ============================================================
    // Ini mempertahankan ukuran/desain cover index lama.
    // Selector khusus cover dipakai supaya tidak menyentuh card MAIN.
    function autoFitCard() {

        const card =
            document.querySelector(
                '.cover-card-canvas'
            );

        if (
            !card
        ) {
            return;
        }

        const originalWidth =
            480;

        const originalHeight =
            750;

        const paddingMargin =
            20;

        const availableWidth =
            window.innerWidth -
            paddingMargin;

        const availableHeight =
            window.innerHeight -
            paddingMargin;

        const scaleX =
            availableWidth /
            originalWidth;

        const scaleY =
            availableHeight /
            originalHeight;

        let scale =
            Math.min(
                scaleX,
                scaleY
            );

        if (
            scale >
            1
        ) {
            scale =
                1;
        }

        card.style.transform =
            `scale(${scale})`;
    }


    autoFitCard();


    window.addEventListener(
        'resize',
        autoFitCard
    );


    // ============================================================
    // 2. AMBIL NAMA TAMU DARI URL
    // ============================================================
    // Contoh:
    // index.html?to=Samuel
    //
    // Cover memakai ID coverGuestName agar tidak bentrok dengan
    // input guestName milik form Ucapan di MAIN.
    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const guestParam =
        urlParams.get(
            'to'
        );

    const guestElement =
        document.getElementById(
            'coverGuestName'
        );


    if (
        guestElement &&
        guestParam
    ) {

        const namaFormatted =
            decodeURIComponent(
                guestParam.replace(
                    /\+/g,
                    ' '
                )
            );

        guestElement.innerText =
            namaFormatted;
    }


    // ============================================================
    // 3. ENTRANCE COVER — OPTIMIZED ANDROID
    // ============================================================

    const coverWrapper =
        document.getElementById('pageWrapper');

    if (
        typeof gsap !== 'undefined' &&
        coverWrapper
    ) {

        // Kondisi awal cover
        gsap.set(coverWrapper, {
            opacity: 0
        });

        // Konten cover
        gsap.set("#mainContainer", {
            opacity: 0,
            y: isAndroid ? 10 : 18
        });


        const introTimeline =
            gsap.timeline();


        // ========================================================
        // ANDROID — VERSION RINGAN
        // ========================================================

        if (isAndroid) {

            // Cover fade langsung
            introTimeline.to(
                coverWrapper,
                {
                    opacity: 1,
                    duration: 0.55,
                    ease: "sine.out"
                },
                0
            );


            // Tulisan tetap ada animasinya
            introTimeline.to(
                "#mainContainer",
                {
                    opacity: 1,
                    y: 0,

                    duration: 0.6,

                    ease: "power2.out"
                },
                0.08
            );

        }


        // ========================================================
        // DESKTOP / DEVICE LEBIH KUAT
        // ========================================================

        else {

            gsap.set("#photoBg", {
                scale: 1.06
            });


            // Cover muncul
            introTimeline.to(
                coverWrapper,
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: "sine.out"
                },
                0
            );


            // Foto zoom lembut
            introTimeline.to(
                "#photoBg",
                {
                    scale: 1,

                    duration: 1.4,

                    ease: "power2.out"
                },
                0
            );


            // Tulisan masuk
            introTimeline.to(
                "#mainContainer",
                {
                    opacity: 1,
                    y: 0,

                    duration: 0.9,

                    ease: "power3.out"
                },
                0.15
            );
        }
    }

    // ============================================================
    // 4. OPEN INVITATION — SLIDE UP SEPERTI VIDEO
    // ============================================================
    //
    // STRUKTURNYA:
    //
    //   COVER  <- layer depan
    //   MAIN   <- sudah diam di belakang
    //
    // Ketika Open Invitation ditekan:
    //
    //   COVER bergerak dari yPercent 0 ke -100
    //   MAIN TIDAK bergerak
    //   MAIN TIDAK fade
    //
    // Jadi MAIN terlihat sedikit demi sedikit dari bagian bawah,
    // sama seperti satu halaman cover yang ditarik ke atas.
    // ============================================================

    const btnOpen =
        document.getElementById(
            'btnOpenInvitation'
        );

    const pageWrapper =
        document.getElementById(
            'pageWrapper'
        );

    const mainPageStage =
        document.getElementById(
            'mainPageStage'
        );

    const scrollContainer =
        document.getElementById(
            'scrollContainer'
        );
    
        // ============================================================
        // AUDIO KHUSUS MOBILE
        // ============================================================

        const weddingAudio =
            document.getElementById(
                'weddingMusic'
            );

        const musicToggleBtn =
            document.getElementById(
                'musicToggleBtn'
            );


        function startWeddingMusicFromUserGesture() {

            if (!weddingAudio) {
                return;
            }

            weddingAudio.muted = false;
            weddingAudio.volume = 0.3;

            const playPromise =
                weddingAudio.play();


            if (
                playPromise &&
                typeof playPromise.then === 'function'
            ) {

                playPromise
                    .then(function () {

                        if (musicToggleBtn) {
                            musicToggleBtn
                                .classList
                                .remove('paused');
                        }

                    })
                    .catch(function (error) {

                        console.log(
                            'Audio belum bisa diputar:',
                            error
                        );

                    });
            }
        }


    let isOpening =
        false;


    // MAIN harus sudah berada di belakang dari awal.
    if (
        mainPageStage
    ) {

        mainPageStage.style.opacity =
            '1';

        mainPageStage.style.visibility =
            'visible';
    }


    if (
        btnOpen &&
        pageWrapper &&
        mainPageStage
    ) {

        btnOpen.addEventListener(
            'click',
            function (
                event
            ) {

                event.preventDefault();

                // LANGSUNG PLAY MUSIK DARI KLIK USER
                startWeddingMusicFromUserGesture();


                // Cegah double click saat animasi sedang berjalan.
                if (
                    isOpening
                ) {
                    return;
                }


                isOpening =
                    true;


                // MAIN selalu dimulai dari section paling atas.
                if (
                    scrollContainer
                ) {

                    scrollContainer.scrollTop =
                        0;
                }


                // Beri tahu browser bahwa MAIN sekarang aktif.
                mainPageStage.setAttribute(
                    'aria-hidden',
                    'false'
                );


                // Siapkan MAIN hanya saat benar-benar dibutuhkan.
                // Layout/observer/animasi berat tidak lagi bekerja sejak page load.
                document.body.classList.add(
                    'invitation-preparing'
                );

                document.dispatchEvent(
                    new CustomEvent(
                        'invitation:main-prep'
                    )
                );

                document.body.classList.add(
                    'invitation-opening'
                );

                // Beri browser satu frame untuk menyiapkan layer MAIN.
                // Durasi/easing animasi cover tetap 0.95s + power3.inOut.
                requestAnimationFrame(function () {


                // =================================================
                // FALLBACK JIKA GSAP GAGAL DIMUAT
                // =================================================
                if (
                    typeof gsap ===
                    'undefined'
                ) {

                    pageWrapper.style.transition =
                        'opacity 0.82s ease-in-out';

                    mainPageStage.style.transition =
                        'opacity 0.82s ease-in-out';

                    pageWrapper.style.opacity = '0';
                    mainPageStage.style.opacity = '1';

                    setTimeout(
                        function () {
                            finishOpening();
                        },
                        820
                    );

                    return;
                }


                // =================================================
                // TRANSISI UTAMA
                // =================================================
                //
                // Dari video referensi, perpindahan utama berlangsung
                // kira-kira sekitar 1 detik.
                //
                // power3.inOut:
                // - mulai lembut
                // - cepat di tengah
                // - berhenti lembut di atas
                //
                // Tidak ada opacity/autoAlpha/fade.
                // =================================================

                // ================================================
                // PERSIAPKAN MAIN SEBELUM CROSSFADE
                // ================================================
                const firstMainSection =
                    mainPageStage.querySelector('.scroll-target-block');

                if (firstMainSection) {

                    firstMainSection
                        .querySelectorAll(
                            '.video-fade-text, .video-cover-photo, .video-cover-flower'
                        )
                        .forEach(function (element) {

                            // MAIN harus sudah dalam bentuk final
                            // sebelum opacity MAIN mulai terlihat.
                            element.style.transition = 'none';

                            element.classList.add('is-visible');
                        });
                }


                // =================================================
                // PREMIUM VEIL REVEAL
                // Cover terasa TERANGKAT, bukan slide halaman.
                // =================================================

                const coverItems =
                    ".cover-text-subtitle, " +
                    ".cover-couple-name, " +
                    ".guest-label, " +
                    ".guest-name, " +
                    ".guest-sub, " +
                    "#btnOpenInvitation";


                // MAIN sudah siap di belakang.
                // Sedikit redup supaya transisi punya depth.
                gsap.set(mainPageStage, {
                    opacity: 0.82
                });


                // COVER awalnya full.
                gsap.set(pageWrapper, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    yPercent: 0,
                    opacity: 1
                });


                const openTimeline = gsap.timeline({
                    onComplete: finishOpening
                });


                // =================================================
                // 1. TOMBOL TERASA DIPENCET
                // =================================================

                openTimeline.to(
                    "#btnOpenInvitation",
                    {
                        scale: 0.96,
                        duration: 0.10,
                        ease: "power2.out"
                    },
                    0
                );


                // =================================================
                // 2. ISI COVER "TERLEPAS" DULU
                // bukan seluruh layar langsung bergerak
                // =================================================

                openTimeline.to(
                    coverItems,
                    {
                        y: -18,
                        opacity: 0,

                        duration: 0.48,

                        stagger: {
                            each: 0.035,
                            from: "end"
                        },

                        ease: "power2.in"
                    },
                    0.08
                );


                // =================================================
                // 3. FOTO SEDIKIT CINEMATIC ZOOM
                // =================================================

                openTimeline.to(
                    "#photoBg",
                    {
                        scale: 1.075,

                        duration: 1.45,

                        ease: "sine.inOut"
                    },
                    0.05
                );


                // =================================================
                // 4. INI TRANSISI UTAMANYA
                //
                // Cover BUKAN pindah satu layar penuh.
                // Batas bawah cover naik sampai atas.
                //
                // Sedikit yPercent -6 cuma memberikan rasa
                // "lift", bukan slideshow.
                // =================================================

                openTimeline.to(
                    pageWrapper,
                    {
                        clipPath: "inset(0% 0% 100% 0%)",

                        yPercent: -6,

                        opacity: 0.25,

                        duration: 1.38,

                        ease: "power4.inOut",

                        force3D: true
                    },
                    0.12
                );


                // =================================================
                // 5. MAIN MENJADI JERNIH
                // MAIN TIDAK BERGERAK
                // =================================================

                openTimeline.to(
                    mainPageStage,
                    {
                        opacity: 1,

                        duration: 1.1,

                        ease: "sine.out"
                    },
                    0.22
                );

                });
            }
        );
    }


    // ============================================================
    // 5. SETELAH COVER SUDAH KELUAR LAYAR
    // ============================================================
    function finishOpening() {

        // Cover tidak perlu dirender/interaksi lagi.
        pageWrapper.style.visibility =
            'hidden';

        pageWrapper.style.pointerEvents =
            'none';


        // MAIN aktif penuh.
        mainPageStage.style.pointerEvents =
            'auto';


        document.body.classList.remove(
            'invitation-opening'
        );

        document.body.classList.remove(
            'invitation-preparing'
        );

        document.body.classList.add(
            'invitation-open'
        );

        // Layer cover tidak perlu lagi mempertahankan alokasi GPU.
        pageWrapper.style.willChange = 'auto';

        // URL tetap index yang sama.
        // Tidak pindah ke main.html dan tidak reload.
        if (
            history.replaceState
        ) {

            history.replaceState(
                null,
                '',
                window.location.pathname +
                window.location.search +
                '#invitation'
            );
        }
    }

});
