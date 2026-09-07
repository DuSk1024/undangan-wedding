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
    // 3. ENTRANCE COVER
    // ============================================================
    // Sama seperti index lama:
    // foto muncul halus, lalu konten cover masuk.
    //
    // Ini BUKAN transisi Open Invitation.
    // Jadi desain/entrance cover tetap terasa sama.
    if (
        typeof gsap !==
        'undefined'
    ) {

        gsap.set(
            "#photoBg",
            {
                scale:
                    1.05,

                opacity:
                    0
            }
        );


        gsap.set(
            "#mainContainer",
            {
                opacity:
                    0,

                y:
                    15
            }
        );


        const introTimeline =
            gsap.timeline(
                {
                    defaults:
                    {
                        ease:
                            "power2.out"
                    }
                }
            );


        introTimeline

            .to(
                "#photoBg",
                {
                    opacity:
                        1,

                    scale:
                        1,

                    duration:
                        1.0,

                    ease:
                        "power2.out"
                }
            )

            .to(
                "#mainContainer",
                {
                    opacity:
                        1,

                    y:
                        0,

                    duration:
                        0.8,

                    ease:
                        "power2.out"
                },

                "-=0.5"
            );
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


                document.body.classList.add(
                    'invitation-opening'
                );


                // =================================================
                // FALLBACK JIKA GSAP GAGAL DIMUAT
                // =================================================
                if (
                    typeof gsap ===
                    'undefined'
                ) {

                    pageWrapper.style.transition =
                        'transform 0.95s cubic-bezier(0.65, 0, 0.35, 1)';

                    pageWrapper.style.transform =
                        'translate3d(0, -100%, 0)';


                    setTimeout(
                        function () {

                            finishOpening();

                        },
                        950
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

                gsap.to(
                    pageWrapper,
                    {
                        yPercent:
                            -100,

                        duration:
                            0.95,

                        ease:
                            "power3.inOut",

                        force3D:
                            true,

                        overwrite:
                            true,

                        onComplete:
                            finishOpening
                    }
                );
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

        document.body.classList.add(
            'invitation-open'
        );

        // MAIN entrance baru dimulai setelah cover selesai naik
        document.dispatchEvent(
            new CustomEvent(
                'invitation:main-enter'
            )
        );


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
